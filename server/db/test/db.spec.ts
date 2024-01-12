import { describe, it } from "mocha";
import { connect, writeGroup } from "../src/db"

describe("Test DB layer", () => {
    before(() => {
        connect("mongodb://localhost:27017/sharethecost");
    });

    it("Test write", () => {
        writeGroup({
            "name": "test",
            "members": {},
        });
    });
});
