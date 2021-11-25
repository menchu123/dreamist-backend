import User from "../../database/models/user";
import Dream from "../../database/models/dream";

class NewError extends Error {
  code: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDreams = async (req, res, next) => {
  Dream.find();
  res.json();
};

export const getUserDreams = async (req, res, next) => {
  try {
    const userDreams = await User.findById(req.userId).populate("dreams");
    res.json(userDreams.dreams);
  } catch (error) {
    error.code = 400;
    error.message = "Could not get dreams";
    next(error);
  }
};

export const getUserDreamById = async (req, res, next) => {
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

export const createDream = async (req, res, next) => {
  const { file } = req;
  const dreamContent = req.body;
  dreamContent.image = file.fileURL;
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

export const deleteDream = async (req, res, next) => {
  const { idDream } = req.params;
  try {
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
