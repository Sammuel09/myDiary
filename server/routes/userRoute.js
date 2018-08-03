import express from 'express';
import bodyParser from 'body-parser';
import user from '../controllers/userController.js';
import entry from '../controllers/entryController.js';
import db from '../models/database.js'
const router = express.Router();


router.post("/auth/signup", user.create);
router.post("/auth/login", user.login);
export default router;