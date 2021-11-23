import { Schema, model } from "mongoose";

const dreamSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 1,
    max: 25,
  },
  description: {
    type: String,
    required: true,
    min: 1,
    max: 600,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: "normal",
  },
  mood: {
    type: Number,
    min: 1,
    max: 5,
  },
  image: {
    type: String,
  },
  drawing: {
    type: String,
  },
});

const Dream = model("Dream", dreamSchema, "Dreams");

export default Dream;
