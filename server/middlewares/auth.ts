import jwt from "jsonwebtoken";

class NewError extends Error {
  code: number | undefined;
}

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new NewError("Not authorized sorry");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];

    if (!token) {
      const error = new NewError("Token is missing...");
      error.code = 401;
      next(error);
    } else {
      try {
        const userData = jwt.verify(token, process.env.SECRET);
        req.userId = userData.id;
        req.userName = userData.name;
        next();
      } catch (error) {
        error.message = "Token not valid";
        error.code = 401;
        next(error);
      }
    }
  }
};

export default auth;
