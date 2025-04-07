// import Leave from "../models/Leave.js";
// import User from "../models/User.js";

// // export const applyLeave = async (req, res) => {
// //   const { startDate, endDate, reason } = req.body;

// //   try {
// //     const user = await User.findById(req.user.id);
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     const start = new Date(startDate);
// //     const end = new Date(endDate);

// //     const isOneDayLeave = start.toDateString() === end.toDateString();

// //     // Get the current month and year
// //     const currentMonth = start.getMonth();
// //     const currentYear = start.getFullYear();

// //     // Count one-day leaves taken by the employee in the current month
// //     const oneDayLeavesThisMonth = await Leave.countDocuments({
// //       employee: req.user.id,
// //       startDate: { $gte: new Date(currentYear, currentMonth, 1) },
// //       endDate: { $lte: new Date(currentYear, currentMonth + 1, 0) },
// //       status: "Approved",
// //       startDate: { $eq: endDate }, // Ensuring it's a one-day leave
// //     });

// //     let status = "Pending";

// //     if (isOneDayLeave) {
// //       if (oneDayLeavesThisMonth < 2) {
// //         status = "Approved";
// //       }
// //     }

// //     const leave = new Leave({
// //       employee: req.user.id,
// //       department: user.department,
// //       startDate,
// //       endDate,
// //       reason,
// //       status,
// //     });

// //     await leave.save();
// //     res.status(201).json(leave);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// // Employee views their leave status

// export const applyLeave = async (req, res) => {
//   const { startDate, endDate, reason } = req.body;

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     // Ensure end date is not before start date
//     if (end < start) {
//       return res
//         .status(400)
//         .json({ message: "End date cannot be before start date." });
//     }

//     const isOneDayLeave = start.toDateString() === end.toDateString();

//     // Get the current month and year
//     const currentMonth = start.getMonth();
//     const currentYear = start.getFullYear();

//     // Count one-day leaves taken by the employee in the current month
//     const oneDayLeavesThisMonth = await Leave.countDocuments({
//       employee: req.user.id,
//       startDate: { $gte: new Date(currentYear, currentMonth, 1) },
//       endDate: { $lte: new Date(currentYear, currentMonth + 1, 0) },
//       status: "Approved",
//       startDate: { $eq: endDate }, // Ensuring it's a one-day leave
//     });

//     let status = "Pending";

//     if (isOneDayLeave) {
//       if (oneDayLeavesThisMonth >= 2) {
//         return res.status(400).json({
//           message: "Your one-day leave limit is over for this month.",
//         });
//       } else {
//         status = "Approved";
//       }
//     }

//     // Calculate total leave days
//     let leaveDaysCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

//     // Check for sandwich leave (Saturday-Sunday-Monday)
//     let isSandwichLeave = false;
//     let hasSaturday = false;
//     let hasSunday = false;
//     let hasMonday = false;

//     let currentDate = new Date(start);
//     while (currentDate <= end) {
//       let day = currentDate.getDay();
//       if (day === 6) hasSaturday = true; // Saturday
//       if (day === 0) hasSunday = true; // Sunday
//       if (day === 1) hasMonday = true; // Monday

//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     if (hasSaturday && hasSunday && hasMonday) {
//       isSandwichLeave = true;
//       leaveDaysCount += 2; // Deduct for Sat & Sun as well
//     }

//     // Get total leave count for this month
//     const totalLeavesThisMonth = await Leave.aggregate([
//       {
//         $match: {
//           employee: req.user.id,
//           startDate: { $gte: new Date(currentYear, currentMonth, 1) },
//           endDate: { $lte: new Date(currentYear, currentMonth + 1, 0) },
//           status: "Approved",
//         },
//       },
//       {
//         $group: {
//           _id: "$employee",
//           totalDays: { $sum: "$leaveDaysCount" },
//         },
//       },
//     ]);

//     const totalLeaveDays =
//       totalLeavesThisMonth.length > 0 ? totalLeavesThisMonth[0].totalDays : 0;

//     const leave = new Leave({
//       employee: req.user.id,
//       department: user.department,
//       startDate,
//       endDate,
//       reason,
//       status,
//       isSandwichLeave,
//       leaveDaysCount,
//     });

//     await leave.save();
//     res.status(201).json({
//       leave,
//       message: `Leave applied successfully! You have taken ${
//         totalLeaveDays + leaveDaysCount
//       } out of ${new Date(currentYear, currentMonth + 1, 0).getDate()} days.`,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getLeavesForUser = async (req, res) => {
//   try {
//     const leaves = await Leave.find({ employee: req.user.id });
//     res.json(leaves);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // HOD views all leave requests in their department
// export const getLeavesForHOD = async (req, res) => {
//   try {
//     const hod = await User.findById(req.user.id);
//     if (!hod || hod.role !== "hod")
//       return res.status(403).json({ message: "Not authorized" });

//     const leaves = await Leave.find({ department: hod.department }).populate(
//       "employee",
//       "name department"
//     ); // Populate employee name & department

//     res.json(leaves);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // HOD approves or rejects leave requests
// export const updateLeaveStatus = async (req, res) => {
//   const { leaveId } = req.params;
//   const { status } = req.body;

//   try {
//     const leave = await Leave.findById(leaveId);
//     if (!leave)
//       return res.status(404).json({ message: "Leave request not found" });

//     leave.status = status;
//     await leave.save();

//     res.json({ message: `Leave ${status}`, leave });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // HOD views department leave reports
// export const getLeaveReports = async (req, res) => {
//   const { startDate, endDate } = req.query;

//   try {
//     const hod = await User.findById(req.user.id);
//     if (!hod || hod.role !== "hod")
//       return res.status(403).json({ message: "Not authorized" });

//     const filter = { department: hod.department };

//     if (startDate && endDate) {
//       filter.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
//     }

//     const leaves = await Leave.find(filter).populate(
//       "employee",
//       "name email department"
//     );
//     res.json(leaves);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // HOD views leave statistics for their department
// export const getLeaveStatistics = async (req, res) => {
//   try {
//     const hod = await User.findById(req.user.id);
//     if (!hod || hod.role !== "hod")
//       return res.status(403).json({ message: "Not authorized" });

//     const stats = await Leave.aggregate([
//       { $match: { department: hod.department } },
//       {
//         $group: {
//           _id: "$status",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     res.json(stats);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import Leave from "../models/Leave.js";
import User from "../models/User.js";

export const applyLeave = async (req, res) => {
  const { startDate, endDate, reason } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res
        .status(400)
        .json({ message: "End date cannot be before start date." });
    }

    const isOneDayLeave = start.toDateString() === end.toDateString();

    const currentMonth = start.getMonth();
    const currentYear = start.getFullYear();

    // Count one-day leaves taken by employee in the current month
    const oneDayLeavesThisMonth = await Leave.countDocuments({
      employee: req.user.id,
      startDate: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lte: new Date(currentYear, currentMonth + 1, 0),
      },
      status: "Approved",
      leaveDaysCount: 1,
    });

    let status = "Pending";
    if (isOneDayLeave) {
      if (oneDayLeavesThisMonth >= 2) {
        return res.status(400).json({
          message: "Your one-day leave limit is over for this month.",
        });
      } else {
        status = "Approved"; // Auto-approve one-day leave
      }
    }

    // Calculate total leave days
    let leaveDaysCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Check for Sandwich Leave (Saturday-Sunday-Monday Rule)
    let isSandwichLeave = false;
    let hasSaturday = false;
    let hasSunday = false;
    let hasMonday = false;

    let currentDate = new Date(start);
    while (currentDate <= end) {
      let day = currentDate.getDay();
      if (day === 6) hasSaturday = true;
      if (day === 0) hasSunday = true;
      if (day === 1) hasMonday = true;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (hasSaturday && hasSunday && hasMonday) {
      isSandwichLeave = true;
      leaveDaysCount += 2; // Deduct for Sat & Sun as well
    }

    // Get total leave count for this month
    const totalLeavesThisMonth = await Leave.aggregate([
      {
        $match: {
          employee: req.user.id,
          startDate: { $gte: new Date(currentYear, currentMonth, 1) },
          endDate: { $lte: new Date(currentYear, currentMonth + 1, 0) },
          status: "Approved",
        },
      },
      {
        $group: { _id: "$employee", totalDays: { $sum: "$leaveDaysCount" } },
      },
    ]);

    const totalLeaveDays =
      totalLeavesThisMonth.length > 0 ? totalLeavesThisMonth[0].totalDays : 0;

    // Save Leave Request
    const leave = new Leave({
      employee: req.user.id,
      department: user.department,
      startDate,
      endDate,
      reason,
      status,
      isSandwichLeave,
      leaveDaysCount,
    });

    await leave.save();
    res.status(201).json({
      leave,
      message: `Leave applied successfully! You have taken ${
        totalLeaveDays + leaveDaysCount
      } out of ${new Date(currentYear, currentMonth + 1, 0).getDate()} days.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Leaves for an Employee
export const getLeavesForUser = async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user.id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ HOD Views Leave Requests for Their Department

export const getLeavesForHOD = async (req, res) => {
  try {
    const hod = await User.findById(req.user.id);
    if (!hod || hod.role !== "hod")
      return res.status(403).json({ message: "Not authorized" });

    const leaves = await Leave.find({ department: hod.department })
      .populate("employee", "name email department")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ HOD Approves or Rejects Leave Requests
export const updateLeaveStatus = async (req, res) => {
  const { leaveId } = req.params;
  const { status } = req.body;

  try {
    const leave = await Leave.findById(leaveId);
    if (!leave)
      return res.status(404).json({ message: "Leave request not found" });

    leave.status = status;
    await leave.save();

    res.json({ message: `Leave ${status}`, leave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ HOD Views Department Leave Reports
export const getLeaveReports = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const hod = await User.findById(req.user.id);
    if (!hod || hod.role !== "hod")
      return res.status(403).json({ message: "Not authorized" });

    const filter = { department: hod.department };
    if (startDate && endDate) {
      filter.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const leaves = await Leave.find(filter).populate(
      "employee",
      "name email department"
    );
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ HOD Views Leave Statistics
export const getLeaveStatistics = async (req, res) => {
  try {
    const hod = await User.findById(req.user.id);
    if (!hod || hod.role !== "hod")
      return res.status(403).json({ message: "Not authorized" });

    const stats = await Leave.aggregate([
      { $match: { department: hod.department } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeaveById = async (req, res) => {
  const { leaveId } = req.params;

  try {
    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Check if user is authorized to view this leave
    if (
      leave.employee.toString() !== req.user.id &&
      !(req.user.role === "hod" && req.user.department === leave.department)
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingLeaves = async (req, res) => {
  try {
    const hod = await User.findById(req.user.id);
    if (!hod || hod.role !== "hod")
      return res.status(403).json({ message: "Not authorized" });

    const leaves = await Leave.find({
      department: hod.department,
      status: "Pending",
    })
      .populate("employee", "name email department")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
