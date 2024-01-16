import { after, describe, it } from "mocha";
import { connect, disconnect, writeUser, findUserByEmail, ErrNotFound } from "../src/db.js"
import { isValidEmail } from "../src/validation.js"
import { expect, use as chaiUse } from "chai";
import chaiAsPromised from "chai-as-promised";
import { User } from "../src/db_types.js";

chaiUse(chaiAsPromised);

describe("Test Auth DB Layer", () => {
    before(() => {
        connect("mongodb://localhost:27017/sharethecost");
    });

    it("Test write", async () => {
        const newUser: User = {
            "email": "test@example.com",
            "groups": {},
            "image": 1,
            "name": "Test user",
            "pass": "1234"
        };
        writeUser(newUser)
    });
    
    it ("Find user by email successful", async () => {
        const reqUser: User = {
            email: "test@example.com",
            groups: {},
            image: 1,
            name: "Test user",
            pass: "1234"
        }
        const respUser = await findUserByEmail("test@example.com");
        reqUser.uid = respUser.uid;
        expect(respUser).deep.equal(reqUser);
    })

    it ("Find user by email fail", async () => {
        expect(findUserByEmail("administrator@me.com")).to.eventually.be.rejectedWith(ErrNotFound);
    })

    it ("Test valid email", () => {
        expect(isValidEmail("test@me.com")).to.be.equal(true);
        expect(isValidEmail("test@me")).to.be.equal(true);
    });

    it ("Test non valid email", () => {
        expect(isValidEmail("")).to.be.equal(false);
        expect(isValidEmail("testme.com")).to.be.equal(false);
    });

    after(disconnect);
});
