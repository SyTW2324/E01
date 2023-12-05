import express from "express";
import cors from "cors";

export function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Get all groups
  app.get('/group', (req, resp) => {
  });

  // Get group by <GID> (Group ID)
  app.get('/group/:gid', (req, resp) => {
  });

  // Get all transactions corresponding to group <GID>
  app.get('/group/:gid/transaction', (req, resp) => {
  });

  // Create new group
  app.post('/group', (req, resp) => {
  });

  // Create new transaction for group <GID>
  app.post('/group/:gid/transaction', (req, resp) => {
  });

  // Update all info in group <GID>
  app.put('/group/:gid', (req, resp) => {
  });

  // Update all info in transaction <TID> for group <GID>
  app.put('/group/:gid/transaction/:tid', (req, resp) => {
  });

  // Update partial info in group <GID>
  app.patch('/group/:gid', (req, resp) => {
  });

  // Update partial info in transaction <TID> for group <GID>
  app.patch('/group/:gid/transaction/:tid', (req, resp) => {
  });

  // Delete group <GID> and all its transactions
  app.delete('/group/:gid', (req, resp) => {
  });

  // Delete transaction <TID> for group <GID>
  app.delete('/group/:gid/transaction/:tid', (req, resp) => {
  });

  app.listen("7481");
}
