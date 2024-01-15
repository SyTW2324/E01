import { after, describe, it } from "mocha";
import { connect, deleteGroup, disconnect, getGroupByGID, getGroups, updateGroup, updateGroupFields, createGroup, ErrNotFound, createTransaction, deleteTransaction, updateTransactionFields, updateTransaction, getTransactionByTID, getGroupTransactions} from "../src/db.js"
import { Group, Transaction } from "../src/db_types.js";
import { expect, use as chaiUse } from "chai";
import chaiAsPromised from "chai-as-promised";
import { ObjectId } from 'mongodb';

chaiUse(chaiAsPromised);

describe("Test DB layer", () => {
    before(() => {
        connect("mongodb://localhost:27017/sharethecost");
    });

    it("Create groups", async () => {
        for (let i = 0; i < groups.length; i++) {
            const { gid } = await createGroup(groups[i]);
            groups[i].gid = gid;
            transactions.map(t => {
                if (t.gid === String(i)) {
                    t.gid = gid!;
                }
                return t;
            });
        }
    });

    it("Update non existing group", async () => {
        const group = {
            gid: "2131231",
            name: "asdasdas",
            members: {}
        }
        expect(updateGroup(group)).to.eventually.be.rejectedWith(ErrNotFound);
    });

    it("Update existing group", async () => {
        const reqData = {
            gid: groups[0].gid,
            name: "Shared wallet",
            members: {
                "4fe561ba-0102-4330-95a6-1911439ad417": "Olivia Martinez",
                "d83122d5-cd34-4303-ac11-87aded4e8c3d": "Emily Johnson"
            }
        }
        const respData = await updateGroup(reqData);

        expect(respData.gid).equal(groups[0].gid);
        expect(respData.name).equal(reqData.name);
        expect(respData.members).deep.equal(reqData.members);
    });

    it("Update field in non existing group", async () => {
        expect(updateGroupFields("000000000000000000000000", {name: "Group"})).to.eventually.be.rejectedWith(ErrNotFound);
    });

    it("Update field in existing group", async () => {
        await updateGroupFields(groups[0].gid!, {name: "PayVenture Pals"});
        const respData = await updateGroupFields(groups[0].gid!, {members: {
            "623696f1-b358-4c69-b1ab-5e2bed389ed6": "Sophia Nguyen",
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": "Ethan Reynolds",
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": "Michael Patel",
        }});
        expect(respData).deep.equal(groups[0]);
    });

    it("Get all groups of non existing user", async () => {
        expect(await getGroups("000000000000000000000000")).deep.equal([]);
    });

    it("Get all groups of existing user", async () => {
        const groupsUser = await getGroups("4fe561ba-0102-4330-95a6-1911439ad417");
        expect(groupsUser.map(group => group.name).sort()).deep.equal([
            "Expense Explorers", "WanderWallet Warriors"
        ]);
    });

    it("Get non existing group by GID", async () => {
        expect(getGroupByGID("000000000000000000000000")).to.eventually.be.rejectedWith(ErrNotFound);
    });

    it("Get existing group by GID", async () => {
        expect(await getGroupByGID(groups[1].gid!)).deep.equal(groups[1]);
    });

    it("Delete non existent group", async () => {
        expect(deleteGroup("000000000000000000000000")).to.eventually.be.rejectedWith(ErrNotFound);
    });

    it("Create transactions", async () => {
        for (let i = 0; i < transactions.length; i++) {
            const { tid } = await createTransaction(transactions[i]);
            transactions[i].tid = tid;
        }
    });

    it("Update non existing transaction", async () => {
        const transaction = {
            categories: [ "Clothing"],
            concept: "New wardrobe",
            date: Math.round(new Date("2022-01-20T13:42:26").getTime() / 1000),
            gid: groups[0].gid!,
            debtShares: { "Alice": 40, "Bob": 30 },
            payments: { "Alice": -150, "Bob": -100 },
            tid: "000000000000000000000000"
        }
        expect(updateTransaction(transaction)).to.eventually.be.rejectedWith(ErrNotFound);
    });

    it("Update existing transaction", async () => {
        const reqData = {
            categories: ["Shopping", "Groceries"],
            concept: "Charcuterie",
            date: Math.round(new Date("2021-07-20T11:53:26").getTime() / 1000),
            gid: groups[0].gid!,
            debtShares: {
                "623696f1-b358-4c69-b1ab-5e2bed389ed6": 1,
                "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 3,
                "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": 2,
            },
            payments: {
                "623696f1-b358-4c69-b1ab-5e2bed389ed6": 400,
                "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 130,
                "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": 520,
            },
            tid: transactions[0].tid
        }
        const respData = await updateTransaction(reqData);

        expect(respData.tid).equal(transactions[0].tid);
        expect(respData.concept).equal(reqData.concept);
        expect(respData.date).equal(reqData.date);
        expect(respData.categories).deep.equal(reqData.categories);
        expect(respData.debtShares).deep.equal(reqData.debtShares);
    });

    it("Update field in non existing transaction", async () => {
        expect(updateTransactionFields("000000000000000000000000", {concept: "Transaction"})).to.eventually.be.rejectedWith(ErrNotFound);
    });

    it("Update field in existing transaction", async () => {
        await updateTransactionFields(transactions[0].tid!, {
            categories: ["Shopping", "Clothing"],
            concept: "New wardrobe",
            date: Math.round(new Date("2020-01-06T13:42:26").getTime() / 1000),
            debtShares: {
                "623696f1-b358-4c69-b1ab-5e2bed389ed6": 1,
                "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 1,
                "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": 2,
            },
        });
        const respData = await updateTransactionFields(transactions[0].tid!, {
            payments: {
                "623696f1-b358-4c69-b1ab-5e2bed389ed6": 400,
                "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 100,
                "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": 500,
            },
        });
        expect(respData).deep.equal(transactions[0]);
    });

    it("Get all transactions of non existing group", async () => {
        expect(getGroupTransactions("000000000000000000000000")).to.eventually.be.rejectedWith(ErrNotFound);
    });

    it("Get all transactions of existing group", async () => {
        const transactionsGroup = await getGroupTransactions(groups[0].gid!);
        expect(transactionsGroup.map(transaction => transaction.concept).sort()).deep.equal([
            "Monthly electricity bill", "Movie night" , "New wardrobe"
        ]);
    });

    it("Get non existing transaction by TID", async () => {
        expect(getTransactionByTID("000000000000000000000000")).to.eventually.be.rejectedWith(ErrNotFound);
    });

    it("Get existing transaction by TID", async () => {
        expect(await getTransactionByTID(transactions[1].tid!)).deep.equal(transactions[1]);
    });

    it("Delete non existent transaction", async () => {
        expect(deleteGroup("000000000000000000000000")).to.eventually.be.rejectedWith(ErrNotFound);
    });

    it("Delete existing transaction", async () => {
        await deleteTransaction(transactions[0].tid!)
        expect(getTransactionByTID(transactions[0].tid!)).to.eventually.be.rejectedWith(ErrNotFound);
    });

    it("Delete existing group", async () => {
        await deleteGroup(groups[0].gid!);
        expect(getGroupByGID(groups[0].gid!)).to.eventually.be.rejectedWith(ErrNotFound);
        expect(getTransactionByTID(transactions[0].tid!)).to.eventually.be.rejectedWith(ErrNotFound);
    });

    after(disconnect);
});

const groups: Group[] = [
    {
        name: "PayVenture Pals",
        members: {
            "623696f1-b358-4c69-b1ab-5e2bed389ed6": "Sophia Nguyen",
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": "Ethan Reynolds",
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": "Michael Patel",
        }
    },
    {
        name: "Expense Explorers",
        members: {
            "4fe561ba-0102-4330-95a6-1911439ad417": "Olivia Martinez",
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": "Ethan Reynolds",
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": "Michael Patel",
            "d83122d5-cd34-4303-ac11-87aded4e8c3d": "Emily Johnson",
        }
    },
    {
        name: "Splitwise Squad",
        members: {
            "623696f1-b358-4c69-b1ab-5e2bed389ed6": "Sophia Nguyen",
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": "Ethan Reynolds",
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": "Michael Patel",
            "d83122d5-cd34-4303-ac11-87aded4e8c3d": "Emily Johnson",
        }
    },
    {
        name: "RentRovers",
        members: {
            "623696f1-b358-4c69-b1ab-5e2bed389ed6": "Sophia Nguyen",
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": "Michael Patel",
            "d83122d5-cd34-4303-ac11-87aded4e8c3d": "Emily Johnson",
        }
    },
    {
        name: "WanderWallet Warriors",
        members: {
            "4fe561ba-0102-4330-95a6-1911439ad417": "Olivia Martinez",
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": "Ethan Reynolds",
            "d83122d5-cd34-4303-ac11-87aded4e8c3d": "Emily Johnson",
        }
    },
];

const transactions: Transaction[] = [
    {
        categories: ["Shopping", "Clothing"],
        concept: "New wardrobe",
        date: Math.round(new Date("2020-01-06T13:42:26").getTime() / 1000),
        gid: "0",
        debtShares: {
            "623696f1-b358-4c69-b1ab-5e2bed389ed6": 1,
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 1,
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": 2,
        },
        payments: {
            "623696f1-b358-4c69-b1ab-5e2bed389ed6": 400,
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 100,
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": 500,
        },
    },
    {
        categories: ["Dining", "Restaurant"],
        concept: "Dinner with friends",
        date: Math.round(new Date("2020-05-10T01:09:23").getTime() / 1000),
        gid: "1",
        debtShares: {
            "4fe561ba-0102-4330-95a6-1911439ad417": 1,
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 1,
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": 1,
            "d83122d5-cd34-4303-ac11-87aded4e8c3d": 1,
        },
        payments: {
            "d83122d5-cd34-4303-ac11-87aded4e8c3d": 1000,
        },
    },
    {
        categories: ["Utilities", "Electricity"],
        concept: "Monthly electricity bill",
        date: Math.round(new Date("2020-10-27T12:02:07").getTime() / 1000),
        gid: "0",
        debtShares: {
            "623696f1-b358-4c69-b1ab-5e2bed389ed6": 1,
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 1,
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": 1,
        },
        payments: {
            "623696f1-b358-4c69-b1ab-5e2bed389ed6": 2598,
        },
    },
    {
        categories: ["Entertainment", "Movies"],
        concept: "Movie night",
        date: Math.round(new Date("2021-04-14T22:48:40").getTime() / 1000),
        gid: "0",
        debtShares: {
            "623696f1-b358-4c69-b1ab-5e2bed389ed6": 1,
        },
        payments: {
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 1000,
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": 500,
        },
    },
    {
        categories: ["Groceries"],
        concept: "Weekly grocery shopping",
        date: Math.round(new Date("2023-05-06T03:57:01").getTime() / 1000),
        gid: "1",
        debtShares: { 
            "4fe561ba-0102-4330-95a6-1911439ad417": 3,
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 5,
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": 1,
            "d83122d5-cd34-4303-ac11-87aded4e8c3d": 5,
        },
        payments: { 
            "4fe561ba-0102-4330-95a6-1911439ad417": 500,
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": 500,
        },
    },
];

