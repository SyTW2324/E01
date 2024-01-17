import jwt from "jsonwebtoken";
import { User } from "./db_types.js";
import { getKeys } from "./crypto_utils.js";
import { Config } from "./config.js";

let expiresAfter = 1 * 60 * 60;

export function init(c: Config) {
    expiresAfter = c.jwt.expiresAfter
}

export async function generateJWT(uid: string, user: User): Promise<{token: string, publicKey: string}> {
    const { publicKey, privateKey } = await getKeys();
    const token = jwt.sign({
        email: user.email,
        image: user.image,
        name: user.name,
        uid,
    }, privateKey, {
        algorithm: "RS256",
        expiresIn: expiresAfter,
        issuer: "sharethecost",
        notBefore: 0,
        subject: uid
    });
    return {token, publicKey};
}
