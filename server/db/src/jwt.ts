import { readFile } from "node:fs/promises"
import jwt from "jsonwebtoken";
import { Config } from "./config.js";

let pubkey: string;

export async function init(config: Config) {
    pubkey = await readFile(config.jwt.publickey, {encoding: "utf-8"});
}

export function verifyJWT(rawToken: string): Promise<jwt.JwtPayload> {
    return new Promise((resolve, reject) => {
        jwt.verify(rawToken, pubkey, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }
            if (!decoded || typeof decoded === "string") {
                reject(`Unexpected decoded JSON: ${JSON.stringify(decoded)}`);
            }
            return resolve(decoded as jwt.JwtPayload);
        });
    });
}

