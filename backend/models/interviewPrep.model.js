import mongoose from "mongoose";

const interviewPrepSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ["Experience", "Questions", "Tips"],
      required: true,
    },
    company: { type: String, trim: true },
    role: { type: String, trim: true },
    tags: [String],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    upvotes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],

    isHidden: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

export default mongoose.model("InterviewPrep", interviewPrepSchema);
