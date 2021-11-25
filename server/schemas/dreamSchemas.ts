import { Joi } from "express-validation";

const createSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string(),
    mood: Joi.number(),
    image: Joi.string(),
    drawing: Joi.string(),
  }),
};

export default createSchema;
