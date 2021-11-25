import { Response, NextFunction } from "express";
import User from "../../database/models/user";
import Dream from "../../database/models/dream";
import NewError from "../../utils/NewError";
import RequestPlus from "../../utils/RequestPlus";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDreams = async (req, res, next) => {
  Dream.find();
  res.json();
};

export const getUserDreams = async (
  req: RequestPlus,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDreams = await User.findById(req.userId).populate("dreams");
    res.json(userDreams.dreams);
  } catch (error) {
    error.code = 400;
    error.message = "Could not get dreams";
    next(error);
  }
};

export const getUserDreamById = async (
  req: RequestPlus,
  res: Response,
  next: NextFunction
) => {
  const { idDream } = req.params;
  try {
    const userDreams = await User.findById(req.userId).populate("dreams");
    const searchedDream = userDreams.dreams.filter(
      (dream) => dream.id === idDream
    );
    res.json(searchedDream[0]);
  } catch (error) {
    error.code = 400;
    error.message = "Could not get dreams";
    next(error);
  }
};

export const createDream = async (
  req: RequestPlus,
  res: Response,
  next: NextFunction
) => {
  const { file } = req;
  const dreamContent = req.body;
  if (file) {
    dreamContent.image = file.fileURL;
  }
  try {
    const newDream = await Dream.create(dreamContent);
    await User.findOneAndUpdate(
      { _id: req.userId },
      { $push: { dreams: newDream.id } }
    );
    res.json(newDream);
  } catch (error) {
    error.message = "Post failed";
    error.code = 400;
    next(error);
  }
};

export const deleteDream = async (
  req: RequestPlus,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idDream } = req.params;
    const deletedDream = await Dream.findByIdAndDelete(idDream);
    if (!deletedDream) {
      const error = new NewError("Dream not found :(");
      error.code = 404;
      next(error);
    } else {
      await User.findByIdAndUpdate(
        { _id: req.userId },
        { $pull: { dreams: idDream } }
      );
      res.json(deletedDream);
    }
  } catch {
    const error = new NewError("Couldn't delete dream :(");
    error.code = 400;
    next(error);
  }
};

export const updateDream = async (
  req: RequestPlus,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idDream } = req.params;
    const { file } = req;
    if (file) {
      req.body.image = file.fileURL;
    }
    const dream = await Dream.findById(idDream);

    if (!dream) {
      const error = new NewError("Dream not found :(");
      error.code = 404;
      next(error);
    } else {
      const updatedDream = await Dream.findByIdAndUpdate(idDream, req.body, {
        new: true,
      });
      res.json(updatedDream);
    }
  } catch {
    const error = new NewError("Couldn't update dream :(");
    error.code = 400;
    next(error);
  }
};
