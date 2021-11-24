import express from "express";
import Dream from "../../database/models/dream";

const router = express.Router();

const newDream = {
  title: "pesadilla infernal",
  description: "backend en typescript",
  mood: 5,
  image: "aaa",
  drawing: "aaa",
};

router.get("/add", (req, res) => {
  Dream.create(newDream);
  res.json(newDream);
});

export default router;
