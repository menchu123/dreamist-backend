import { Joi } from "express-validation";

export const loginSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const registerSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
