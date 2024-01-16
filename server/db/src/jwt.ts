import { JwtPayload, verify } from "jsonwebtoken";
import { Config } from "./config.js";

let pubkey: string;

export function init(config: Config) {
    pubkey = config.jwt.publickey;
}

export function verifyJWT(rawToken: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
        verify(rawToken, pubkey, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }
            if (!decoded || typeof decoded === "string") {
                reject(`Unexpected decoded JSON: ${JSON.stringify(decoded)}`);
            }
            return resolve(decoded as JwtPayload);
        });
    });
}

