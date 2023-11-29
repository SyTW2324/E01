import { sign } from "jsonwebtoken";
import { User } from "./db_types";
import { getKeys } from "./crypto_utils";

const expiresAfter = 1 * 60 * 60;

async function generateJWT(user: User): Promise<{token: string, publicKey: string}> {
    const { publicKey, privateKey } = await getKeys();
    const token = sign({
        email: user.email,
        image: user.image,
        name: user.name,
        uid: user._id?.toString(),
    }, privateKey, {
        algorithm: "ES256",
        expiresIn: expiresAfter,
        issuer: "sharethecost",
        notBefore: 0,
        subject: user._id?.toString()
    });
    return {token, publicKey};
}
