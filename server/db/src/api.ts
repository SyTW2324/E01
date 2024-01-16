import express from "express";
import cors from "cors";
import { Group, Transaction } from "./db_types.js";
import { getGroups, getGroupByGID, getGroupTransactions, createGroup, createTransaction, updateGroup, updateTransaction, updateGroupFields, updateTransactionFields, deleteGroup, deleteTransaction } from "./db.js";
import { ObjectId } from "mongodb";

export function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Get all groups
  app.get('/group', async (_, resp) => {
    const groups = await getGroups(); //TODO
    if (!groups) {
      resp.status(404).json({ok: false, error: "There are no groups"})
      return;
    }
    resp.status(200).json({ok: true, groups})
  });

  // Get group by <GID> (Group ID)
  app.get('/group/:gid', async (req, resp) => {
    const GID = req.params.gid
    const group = await getGroupByGID(GID)
    if (!group) {
      resp.status(404).json({ok: false, error: `There is no group with gid: ${GID}`})
      return;
    }

    resp.status(200).json({ok: true, group});
  });

  // Get all transactions corresponding to group <GID>
  app.get('/group/:gid/transaction', async (req, resp) => {
    const GID = req.params.gid;
    console.log(GID)
    const transactions = await getGroupTransactions(GID)
    
    if (!transactions) {
      resp.status(404).json({ok: false, error: `There are no transactions related to this gid: ${GID}`})
      return;
    }

    resp.status(200).json({ok: true, transactions});
  });

  // Create new group
  app.post('/group', async (req, resp) => {

    const group = await createGroup(req.body as Group)
    if (!group) {
      resp.status(400).json({ok: false, error: `There was a problem creating the new group`})
      return;
    }
    resp.status(201).json({ok: true, group});
  });

  // Create new transaction for group <GID>
  app.post('/group/:gid/transaction', (req, resp) => {

    const transaction = createTransaction(req.body as Transaction)
    if (!transaction) {
      resp.status(400).json({ok: false, error: `There was a problem creating the new transaction for the group with GID: ${req.params.gid}`})
      return;
    }
    resp.status(201).json({ok: true, transaction});
  });

  // Update all info in group <GID>
  app.put('/group/:gid', (req, resp) => {
    const group = updateGroup(req.body as Group)
    if (!group) {
      resp.status(400).json({ok: false, error: `There was a problem updating the group`})
      return;
    }
    resp.status(201).json({ok: true, group});
  });

  // Update all info in transaction <TID> for group <GID>
  app.put('/group/:gid/transaction/:tid', (req, resp) => {
    const transaction = updateTransaction(req.body as Transaction)
    if (!transaction) {
      resp.status(400).json({ok: false, error: `There was a problem updating the transaction for the group with GID: ${req.params.gid}`})
      return;
    }
    resp.status(200).json({ok: true, transaction});
  });

  // Update partial info in group <GID>
  app.patch('/group/:gid', (req, resp) => {
    const group = updateGroupFields(req.params.gid, req.body as {[key: string]: string},)
    if (!group) {
      resp.status(400).json({ok: false, error: `There was a problem updating thenew group`})
      return;
    }
    resp.status(200).json({ok: true, group});
  });

  // Update partial info in transaction <TID> for group <GID>
  app.patch('/group/:gid/transaction/:tid', (req, resp) => {
    const transaction = updateTransactionFields(req.params.tid, req.body as {[key: string]: string})
    if (!transaction) {
      resp.status(400).json({ok: false, error: `There was a problem updating the transaction for the group with GID: ${req.params.gid}`})
      return;
    }
    resp.status(200).json({ok: true, transaction});
  });

  // Delete group <GID> and all its transactions
  app.delete('/group/:gid', (req, resp) => {
    const groupGone = deleteGroup(req.params.gid);
    if (!groupGone) {
      resp.status(400).json({ok: false, error: "Error while deleting the group"})  
    }
    
    resp.status(200).json({ok: true, groupGone})
  });

  // Delete transaction <TID> for group <GID>
  app.delete('/group/:gid/transaction/:tid', (req, resp) => {
    const transactionGone = deleteTransaction(req.params.tid)
    if (!transactionGone) {
      resp.status(400).json({ok: false, error: "Error while deleting the transaction"})
    }
    
    resp.status(200).json({ok: true, transactionGone})
  });

  app.listen("7481");
}
