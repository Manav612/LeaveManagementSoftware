import express from "express";
import {
  applyLeave,
  getLeavesForUser,
  getLeavesForHOD,
  updateLeaveStatus,
  getLeaveReports,
  getLeaveStatistics,
  getLeaveById,
  getPendingLeaves,
} from "../controllers/leaveController.js";
import { protect, isHOD } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Employee applies for leave
router.post("/apply", protect, applyLeave);

// Employee views their leave status
router.get("/my-leaves", protect, getLeavesForUser);

// HOD views all leave requests in their department
router.get("/department-leaves", protect, isHOD, getLeavesForHOD);

// HOD approves or rejects leave requests
router.put("/update/:leaveId", protect, isHOD, updateLeaveStatus);

router.get("/reports", protect, isHOD, getLeaveReports);
router.get("/statistics", protect, isHOD, getLeaveStatistics);

router.get("/:leaveId", protect, getLeaveById);

router.get("/pending", protect, isHOD, getPendingLeaves);

export default router;
