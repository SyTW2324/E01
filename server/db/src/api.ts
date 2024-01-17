import express from "express";
import cors from "cors";
import { Group, Transaction } from "./db_types.js";
import { getGroups, getGroupByGID, getGroupTransactions, createGroup, createTransaction, updateGroup, updateTransaction, updateGroupFields, updateTransactionFields, deleteGroup, deleteTransaction } from "./db.js";
import { verifyJWT } from "./jwt.js";

export function start(pathPrefix: string) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Get all groups
  app.get(`${pathPrefix}/group`, async (req, resp) => {
    
    const authorizationHeaders = req.headers.authorization;

    if (!authorizationHeaders) {
      resp.status(401).json({ ok: false, error: "Unauthorized"})
      return;
    }
    
    const [, token] = authorizationHeaders.split(" ");

    if (!token) {
      resp.status(401).json({ ok: false, error: "Unauthorized: No token provided"})
      return;
    }

    let uid: string;
    try {
      uid = (await verifyJWT(token)).uid;
    } catch (_) {
      resp.status(401).json({ ok: false, error: "Invalid token" })
      return;
    }

    const groups = await getGroups(uid);
    if (!groups) {
      resp.status(404).json({ok: false, error: "There are no groups"})
      return;
    }
    resp.status(200).json({ok: true, groups})
  });

  // Get group by <GID> (Group ID)
  app.get(`${pathPrefix}/group/:gid`, async (req, resp) => {
    const GID = req.params.gid
    const group = await getGroupByGID(GID)
    if (!group) {
      resp.status(404).json({ok: false, error: `There is no group with gid: ${GID}`})
      return;
    }

    resp.status(200).json({ok: true, group});
  });

  // Get all transactions corresponding to group <GID>
  app.get(`${pathPrefix}/group/:gid/transaction`, async (req, resp) => {
    const transactions = await getGroupTransactions(req.params.gid)
    if (!transactions) {
      resp.status(404).json({ok: false, error: `There are no transactions related to this gid: ${req.params.gid}`})
      return;
    }
    resp.status(200).json({ok: true, transactions});
  });

  // Create new group
  app.post(`${pathPrefix}/group`, async (req, resp) => {
    const group = await createGroup(req.body as Group)
    if (!group) {
      resp.status(400).json({ok: false, error: `There was a problem creating the new group`})
      return;
    }
    resp.status(201).json({ok: true, group});
  });

  // Create new transaction for group <GID>
  app.post(`${pathPrefix}/group/:gid/transaction`, async (req, resp) => {
    const transaction = await createTransaction(req.body as Transaction)
    if (!transaction) {
      resp.status(400).json({ok: false, error: `There was a problem creating the new transaction for the group with GID: ${req.params.gid}`})
      return;
    }
    resp.status(201).json({ok: true, transaction});
  });

  // Update all info in group <GID>
  app.put(`${pathPrefix}/group/:gid`, async (req, resp) => {
    const group = await updateGroup(req.body as Group)
    if (!group) {
      resp.status(400).json({ok: false, error: `There was a problem updating the group`})
      return;
    }
    resp.status(201).json({ok: true, group});
  });

  // Update all info in transaction <TID> for group <GID>
  app.put(`${pathPrefix}/group/:gid/transaction/:tid`, async (req, resp) => {
    const transaction = await updateTransaction(req.body as Transaction)
    if (!transaction) {
      resp.status(400).json({ok: false, error: `There was a problem updating the transaction for the group with GID: ${req.params.gid}`})
      return;
    }
    resp.status(200).json({ok: true, transaction});
  });

  // Update partial info in group <GID>
  app.patch(`${pathPrefix}/group/:gid`, async (req, resp) => {
    const group = await updateGroupFields(req.params.gid, req.body as {[key: string]: string},)
    if (!group) {
      resp.status(400).json({ok: false, error: `There was a problem updating thenew group`})
      return;
    }
    resp.status(200).json({ok: true, group});
  });

  // Update partial info in transaction <TID> for group <GID>
  app.patch(`${pathPrefix}/group/:gid/transaction/:tid`, async (req, resp) => {
    const transaction = await updateTransactionFields(req.params.tid, req.body as {[key: string]: string})
    if (!transaction) {
      resp.status(400).json({ok: false, error: `There was a problem updating the transaction for the group with GID: ${req.params.gid}`})
      return;
    }
    resp.status(200).json({ok: true, transaction});
  });

  // Delete group <GID> and all its transactions
  app.delete(`${pathPrefix}/group/:gid`, async (req, resp) => {
    const groupGone = await deleteGroup(req.params.gid);
    /*if (!groupGone) {
      resp.status(400).json({ok: false, error: "Error while deleting the group"})  
    }*/
    
    resp.status(200).json({ok: true, groupGone})
  });

  // Delete transaction <TID> for group <GID>
  app.delete(`${pathPrefix}/group/:gid/transaction/:tid`, async (req, resp) => {
    const transactionGone = await deleteTransaction(req.params.tid)
    /*if (!transactionGone) {
      resp.status(400).json({ok: false, error: "Error while deleting the transaction"})
    }*/
    
    resp.status(200).json({ok: true, transactionGone})
  });

  app.listen("7481");
}
