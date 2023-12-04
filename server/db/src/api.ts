import express from "express";
import cors from "cors";

export function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get('/group', (req, resp) => {
  });

  app.get('/group/:gid', (req, resp) => {
  });

  app.get('/group/:gid/transaction', (req, resp) => {
  });

  app.post('/group', (req, resp) => {
  });

  app.post('/group/:gid/transaction', (req, resp) => {
  });

  app.put('/group/:gid', (req, resp) => {
  });

  app.put('/group/:gid/transaction/:tid', (req, resp) => {
  });

  app.patch('/group/:gid', (req, resp) => {
  });

  app.patch('/group/:gid/transaction/:tid', (req, resp) => {
  });

  app.delete('/group/:gid', (req, resp) => {
  });

  app.delete('/group/:gid/transaction/:tid', (req, resp) => {
  });

  app.listen("7481");
}
