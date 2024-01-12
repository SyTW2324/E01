import { after, describe, it } from "mocha";
import { connect, disconnect, writeUser } from "../src/db"

describe("Test DB layer", () => {
    before(() => {
        connect("mongodb://localhost:27017/sharethecost");
    });

    it("Test write", () => {
        writeUser({
            "email": "test@example.com",
            "groups": {},
            "image": 1,
            "name": "Test user",
            "pass": "1234"
        });
    });

    after(() => {
        return disconnect();
    });
});
