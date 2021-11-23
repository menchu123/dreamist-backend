import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dreams: {
    type: [Types.ObjectId],
    ref: "Dream",
    required: true,
  },
});

const User = model("User", userSchema, "Users");

export default User;
