import Debug from "debug";
import bcrypt from "bcrypt";
import chalk from "chalk";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import User from "../../database/models/user";

const debug = Debug("dreamist:user:controller");

export const userLogin = async (req: Request, res: Response, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    debug(chalk.redBright("Wrong credentials"));
    const error: any = new Error("Wrong credentials");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      debug(chalk.redBright("Wrong credentialss"));
      const error: any = new Error("Wrong credentialss");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.SECRET,
        {
          expiresIn: 72 * 60 * 60,
        }
      );
      res.json({ token });
    }
  }
};

export const userSignUp = async (req: Request, res: Response, next) => {
  const newUser = req.body;
  const user = await User.findOne({ username: newUser.username });
  if (user) {
    debug(chalk.redBright("Username already taken"));
    const error: any = new Error("Username already taken");
    error.code = 400;
    next(error);
  } else {
    newUser.dreams = [];
    newUser.password = await bcrypt.hash(newUser.password, 10);
    User.create(newUser);
    res.json().status(200);
  }
};
