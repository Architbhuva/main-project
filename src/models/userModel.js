import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username "],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password "],
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPassworldToken: String,
  forgotPasswordTokenExpires: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("User", userSchema);

export default User;
