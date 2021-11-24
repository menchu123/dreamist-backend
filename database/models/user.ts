import { Schema, model } from "mongoose";

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
    type: [Schema.Types.ObjectId],
    ref: "Dream",
  },
});

const User = model("User", userSchema);

export default User;
