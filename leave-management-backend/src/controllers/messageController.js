// controllers/messageController.js
import Message from "../models/Message.js";
import Leave from "../models/Leave.js";
import User from "../models/User.js";

// Get messages for a specific leave
export const getMessagesForLeave = async (req, res) => {
  const { leaveId } = req.params;

  try {
    // Check if the user is authorized to view these messages
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Check if user is either the employee or the HOD of the department
    const user = await User.findById(req.user.id);
    if (
      leave.employee.toString() !== req.user.id &&
      !(user.role === "hod" && user.department === leave.department)
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const messages = await Message.find({ leaveId })
      .populate("sender", "name role")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new message
export const createMessage = async (req, res) => {
  const { leaveId, content } = req.body;

  try {
    // Check if the leave exists and user is authorized
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Check if user is either the employee or the HOD of the department
    const user = await User.findById(req.user.id);
    if (
      leave.employee.toString() !== req.user.id &&
      !(user.role === "hod" && user.department === leave.department)
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const message = new Message({
      leaveId,
      sender: req.user.id,
      content,
    });

    await message.save();

    // Populate sender info before sending response
    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "name role"
    );

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
