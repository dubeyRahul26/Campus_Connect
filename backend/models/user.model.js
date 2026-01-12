import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
    profilePic: { type: String, default: "" },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    branch: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;