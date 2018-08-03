import express from 'express';
import bodyParser from 'body-parser';
import user from '../controllers/userController.js';
import entry from '../controllers/entryController.js';
import db from '../models/database.js'
const router = express.Router();




router.get("/entries", entry.viewAll);

router.get("/entries/:entryId", entry.view);

router.post("/entries", entry.create)

router.put("/entries/:entryId", entry.update)

router.delete("/entries/:entryId", entry.remove)

export default router;