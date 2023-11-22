/* eslint-disable @typescript-eslint/no-explicit-any */

import express from "express";

const app = express();

app.use(express.json());

// Login
app.post('/login', (req, resp) => {
  const email = req.body.email;
  const pass = req.body.pass;
  resp.status(200).json({ message: 'Successful Log in' });
});

// Register
// Register al que se le pasa todo lo de register
app.post('/register', (req, resp) => {
  const username = req.body.username;
  const email = req.body.email;
  const pass = req.body.pass;
  const pass_confirm = req.body.pass_confirm;
  resp.status(200).json({ message: 'Successful Register' });
});
