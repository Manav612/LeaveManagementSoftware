// routes/messageRoutes.js
import express from "express";
import {
  getMessagesForLeave,
  createMessage,
} from "../controllers/messageController.js";
import { isHOD, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:leaveId", protect, getMessagesForLeave);
router.post("/", protect, createMessage);

export default router;
