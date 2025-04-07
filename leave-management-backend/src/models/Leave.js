// import mongoose from "mongoose";

// const leaveSchema = new mongoose.Schema(
//   {
//     employee: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     department: { type: String, required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     reason: { type: String, required: true },
//     status: {
//       type: String,
//       enum: ["Approved", "Pending", "Talk to HOD"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// const Leave = mongoose.model("Leave", leaveSchema);
// export default Leave;

import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["Approved", "Pending", "Talk to HOD"],
      default: "Pending",
    },
    isSandwichLeave: { type: Boolean, default: false }, // Tracks sandwich leave
    leaveDaysCount: { type: Number, required: true }, // Total leave days
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
