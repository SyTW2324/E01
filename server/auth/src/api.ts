import express from "express";
import { findUserByEmail, writeUser } from "./db";
import { check, hash } from "./bcrypt";

export function start() {
  const app = express();
  app.use(express.json());

  app.post('/login', async (req, resp) => {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      resp.status(404).json({ ok: false, error: "Invalid email or password"});
      return;
    }

    if (!(await check(req.body.pass, user.pass))) {
      resp.status(404).json({ ok: false, error: "Invalid email or password"});
      return;
    }

    resp.status(200).json({ ok: true, message: 'Successful Login' });
  });

  app.post('/register', async (req, resp) => {
    const body = req.body;

    if (await findUserByEmail(req.body.email)) {
      resp.status(400).json({ ok: false, error: "User with email already exist"});
      return;
    }

    // TODO check body, check user has been written successfully
    await writeUser({
      email: body.email,
      groups: {},
      image: body.image,
      name: body.name,
      pass: await hash(body.pass)
    });

    resp.status(201).json({ ok: true, message: 'Successful Register' });
  });

  app.listen("7480");
}
