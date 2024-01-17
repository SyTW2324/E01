import express from "express";
import cors from "cors";
import { findUserByEmail, writeUser } from "./db.js";
import { check, hash } from "./bcrypt.js";
import { generateJWT } from "./jwt.js";
import { isValidEmail } from "./validation.js";
import { error } from "./logger.js";

export function start(pathPrefix: string) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.post(`${pathPrefix}/login`, async (req, resp) => {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      resp.status(404).json({ ok: false, error: "Invalid email or password"});
      return;
    }

    if (!(await check(req.body.pass, user.pass))) {
      resp.status(404).json({ ok: false, error: "Invalid email or password"});
      return;
    }

    const {token, publicKey} = await generateJWT(user.uid!.toString(), user);
    resp.status(200).json({ ok: true, token, publicKey });
  });

  app.post(`${pathPrefix}/register`, async (req, resp) => {
    const email = req.body.email;
    const image = req.body.image;
    let name = req.body.name;
    const pass = req.body.pass as string;

    // Check email and start user find
    if (!isValidEmail(email)) {
      resp.status(400).json({ ok: false, error: "Invalid or missing email" });
      return;
    }
    const findUserPromise = findUserByEmail(email);

    // Check password
    if (typeof pass !== "string" || pass.length < 12) {
      resp.status(400).json({ ok: false, error: "Invalid or missing password: must be 12 characters long" });
      return;
    }
    const hashPassPromise = hash(pass);

    // Check image
    if (typeof image !== "number" || image < 1 || image > 16) {
      resp.status(400).json({ ok: false, error: "Invalid or missing image: must be integer in range 1..16" });
      return;
    }

    // Check name
    if (typeof name !== "string") {
      resp.status(400).json({ ok: false, error: "Invalid or missing name" });
      return;
    }
    name = name.trim();
    if (name.length < 1) {
      resp.status(400).json({ ok: false, error: "Invalid name: must contain at least 1 readable character" });
      return;
    }

    // Check that user with the email provided does not exist
    try {
      if (await findUserPromise) {
        resp.status(400).json({ ok: false, error: "User with email already exist"});
        return;
      }
    } catch (err) {
      error(`Error finding user with same email as "${email}": ${err}`);
      resp.status(500).json({ ok: false, error: "Internal Server Error"});
      return;
    }

    // Write user to DB
    try {
      await writeUser({
        email,
        groups: {},
        image,
        name,
        pass: await hashPassPromise
      });
    } catch (err) {
      error(`Error writing user to the DB: ${err}`);
      resp.status(500).json({ ok: false, error: "Internal Server Error"});
      return;
    }

    resp.status(201).json({ ok: true });
  });

  app.listen("7480");
}
