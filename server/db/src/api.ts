import express from "express";
import cors from "cors";
import { Group, Transaction } from "./db_types.js";
import { getGroups, getGroupByGID, findTransactionsOfGroup, createGroup, writeTransactionsForGroup, updateGroup, updateTransaction, updatePartialGroup, updatePartialTransaction, deleteGroup, deleteTransactionForGroup } from "./db.js";
import { ObjectId } from "mongodb";

export function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Get all groups
  app.get('/group', async (_, resp) => {
    const groups = await getGroups();
    if (!groups) {
      resp.status(404).json({ok: false, error: "There are no groups"})
      return;
    }
    resp.status(200).json({ok: true, groups})
  });

  // Get group by <GID> (Group ID)
  app.get('/group/:_id', async (req, resp) => {
    const GID = req.params._id
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
    const transactions = await findTransactionsOfGroup(GID)
    
    if (!transactions) {
      resp.status(404).json({ok: false, error: `There are no transactions related to this gid: ${GID}`})
      return;
    }

    resp.status(200).json({ok: true, transactions});
  });

  // Create new group
  app.post('/group', async (req, resp) => {
    
    // const name = req.body.name
    // const members = req.body.members as {[key: string]: string}

    // if (name !== "string" || name === "") {
    //   resp.status(400).json({ ok: false, error: "Invalid or missing name" });
    //   return;
    // }
    // const keys = Object.keys(members);
    // if (keys.length < 1) {
    //   resp.status(400).json({ ok: false, error: "Needs at least one member" });
    //   return;
    // }
    
    // const group = await writeGroup({name, members})

    const group = await createGroup(req.body as Group)
    if (!group) {
      resp.status(400).json({ok: false, error: `There was a problem creating the new group`})
      return;
    }
    resp.status(201).json({ok: true, group});
  });

  // Create new transaction for group <GID>
  app.post('/group/:gid/transaction', (req, resp) => {
    // const categories = req.body.categories as string[]
    // const concept = req.body.concept
    // const date = req.body.date
    // const gid = req.params.gid as unknown as ObjectId
    // const debtShares = req.body.debtShares as {[key: string]: number} 
    // const payments = req.body.payments as {[key: string]: number}

    // if (concept !== "string" || concept === "") {
    //   resp.status(400).json({ ok: false, error: "Invalid or missing concept" });
    //   return;
    // }
    // const keysDebt = Object.keys(debtShares);
    // if (keysDebt.length < 1) {
    //   resp.status(400).json({ ok: false, error: "Needs at least one member" });
    //   return;
    // }
    // const keysPayments = Object.keys(payments);
    // if (keysPayments.length < 1) {
    //   resp.status(400).json({ ok: false, error: "Needs at least one payment" });
    //   return;
    // }
    // const transaction = writeTransactionsForGroup({categories, concept, date, gid, debtShares, payments})

    const transaction = writeTransactionsForGroup(req.body as Transaction)
    if (!transaction) {
      resp.status(400).json({ok: false, error: `There was a problem creating the new transaction for the group with GID: ${req.params.gid}`})
      return;
    }
    resp.status(201).json({ok: true, transaction});
  });

  // Update all info in group <GID>
  app.put('/group/:_id', (req, resp) => {
    const group = updateGroup(req.body as Group, req.params._id)
    if (!group) {
      resp.status(400).json({ok: false, error: `There was a problem updating the group`})
      return;
    }
    resp.status(201).json({ok: true, group});
  });

  // Update all info in transaction <TID> for group <GID>
  app.put('/group/:gid/transaction/:_id', (req, resp) => {
    const transaction = updateTransaction(req.body as Transaction, req.params._id)
    if (!transaction) {
      resp.status(400).json({ok: false, error: `There was a problem updating the transaction for the group with GID: ${req.params.gid}`})
      return;
    }
    resp.status(201).json({ok: true, transaction});
  });

  // Update partial info in group <GID>
  app.patch('/group/:_id', (req, resp) => {
    const group = updatePartialGroup(req.body as {[key: string]: string}, req.params._id)
    if (!group) {
      resp.status(400).json({ok: false, error: `There was a problem updating thenew group`})
      return;
    }
    resp.status(201).json({ok: true, group});
  });

  // Update partial info in transaction <TID> for group <GID>
  app.patch('/group/:gid/transaction/:tid', (req, resp) => {
    const transaction = updatePartialTransaction(req.body as {[key: string]: string}, req.params.tid)
    if (!transaction) {
      resp.status(400).json({ok: false, error: `There was a problem updating the transaction for the group with GID: ${req.params.gid}`})
      return;
    }
    resp.status(201).json({ok: true, transaction});
  });

  // Delete group <GID> and all its transactions
  app.delete('/group/:gid', (req, resp) => {
    const groupGone = deleteGroup(req.params.gid);
    if (!groupGone) {
      resp.status(400).json({ok: false, error: "Error while deleting the group"})  
    }
    
    resp.status(410).json({ok: true, groupGone})
  });

  // Delete transaction <TID> for group <GID>
  app.delete('/group/:gid/transaction/:tid', (req, resp) => {
    const transactionGone = deleteTransactionForGroup(req.params.tid)
    if (!transactionGone) {
      resp.status(400).json({ok: false, error: "Error while deleting the transaction"})
    }
    
    resp.status(410).json({ok: true, transactionGone})
  });

  app.listen("7481");
}
