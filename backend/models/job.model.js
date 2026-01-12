import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: String },
    deadline: { type: Date, required: true },
    jobType: {
      type: String,
      enum: ["Tech", "Sales", "Marketing", "HR", "Finance", "Operations", "Other"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    url: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  { timestamps: true }
);


const Job = mongoose.model("Job", jobSchema);
export default Job;
