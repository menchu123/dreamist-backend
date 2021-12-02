import { Joi } from "express-validation";

export const createSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string(),
    mood: Joi.number(),
    image: Joi.string(),
    drawing: Joi.string(),
    date: Joi.date().raw(),
  }),
};

export const editSchema = {
  body: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    type: Joi.string(),
    mood: Joi.number(),
    image: Joi.string(),
    drawing: Joi.string(),
    date: Joi.date().raw(),
  }),
};
