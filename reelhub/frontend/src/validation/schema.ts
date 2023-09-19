import joi from "joi"


export const loginSchema = {
    email:
    joi.string(),
    password: joi.string().trim()
    .min(1).message("Can't be empty")
    .max(40).message("Too long")
}

export const registerSchema = {
    firstName: joi.string().min(1).message("Can't be empty").max(50).message("Too long"),
    lastName: joi.string().min(1).message("Too short").max(50).message("Too long"),
    email:
    joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).messages({
        "string.pattern.base": "can't be empty",
      }),
    password: joi.string().trim()
    .min(5)
    .max(40)
    .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/)
    .messages({
      "object.regex": "Must have one number",
      "string.pattern.base": "At least one number required",
    })
}