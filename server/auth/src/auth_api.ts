/* eslint-disable @typescript-eslint/no-explicit-any */

import express from "express";
import Write from "./database.ts";
const uri = "mongodb+srv://test:sharethecost@cluster1.wjioerc.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

// Login
app.post('/login', (req, resp) => {

  resp.status(200).json({ message: 'Successful Log in' });
});

// Register
app.post('/register', (req, resp) => {
  Write(uri, req);
  resp.status(200).json({ message: 'Successful Register' });
});
