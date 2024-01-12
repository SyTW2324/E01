import { after, describe, it } from "mocha";
import { connect, deleteGroup, disconnect, findGroupByGID, getGroups, updateGroup, updateGroupFields, createGroup } from "../src/db.js"
import { Group } from "../src/db_types.js";
import { expect } from "chai";

describe("Test DB layer", () => {
    before(() => {
        connect("mongodb://localhost:27017/sharethecost");
    });

    it("Test create groups", async () => {
        for (let i = 0; i < groups.length; i++) {
            const { gid } = await createGroup(groups[i]);
            groups[i].gid = gid;
        }
    });

    it("Test update non existing group", async () => {
        expect(() => updateGroup(groups[0])).to.throw();
    });

    it("Test update existing group", async () => {
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

    it("Test update field in non existing group", async () => {
        expect(() => updateGroupFields("dadsadasd", {name: "Group"})).to.throw();
    });

    it("Test update field in existing group", async () => {
        await updateGroupFields(groups[0].gid!, {name: "PayVenture Pals"});
        const respData = await updateGroupFields(groups[0].gid!, {members: {
            "623696f1-b358-4c69-b1ab-5e2bed389ed6": "Sophia Nguyen",
            "8033277d-0e05-4efe-9eb0-d6a0a6b4d2a9": "Ethan Reynolds",
            "99bb628f-bbc4-4da8-94c8-d8f0ccc432b9": "Michael Patel",
        }});
        expect(respData).deep.equal(groups[0]);
    });

    it("Get all groups of non existing user", async () => {
        expect(await getGroups("9h23yr8723tg")).deep.equal([]);
    });

    it("Get all groups of existing user", async () => {
        const groupsUser = await getGroups("4fe561ba-0102-4330-95a6-1911439ad417");
        expect(groupsUser.map(group => group.name).sort()).deep.equal([
            "Expense Explorers", "WanderWallet Warriors"
        ]);
    });

    it("Get non existing group by GID", async () => {
        expect(() => findGroupByGID("83y2ghdf8j0123")).to.throw();
    });

    it("Get existing group by GID", async () => {
        expect(await findGroupByGID(groups[1].gid!)).deep.equal(groups[1]);
    });

    it("Delete non existent group", async () => {
        expect(() => deleteGroup("908hr2h8g902")).to.throw();
    });

    it("Delete existing group", async () => {
        await deleteGroup(groups[0].gid!);
        expect(() => findGroupByGID(groups[0].gid!)).to.throw();
    });

    after(() => disconnect());
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
