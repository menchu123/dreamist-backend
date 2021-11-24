import User from "../../database/models/user";
import Dream from "../../database/models/dream";

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
