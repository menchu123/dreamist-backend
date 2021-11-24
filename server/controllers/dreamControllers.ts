import User from "../../database/models/user";

const getUserDreams = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: "dreams",
      select: "title description date tags mood image drawing",
    });
    res.json(user.friends);
  } catch (error) {
    error.code = 400;
    error.message = "Could not get dreams";
    next(error);
  }
};

export default getUserDreams;
