const { Schema, model, Types } = require("mongoose");

interface UserInterface {
  name: string;
  user: string;
  password: string;
  dreams: string[];
}

const userSchema: UserInterface = new Schema({
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

export = { User };
