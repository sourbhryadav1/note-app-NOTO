import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-z0-9_]+$/,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure a DB-level unique index for usernames
userSchema.index({ username: 1 }, { unique: true });

userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

const User = mongoose.model("User", userSchema);
export default User;


