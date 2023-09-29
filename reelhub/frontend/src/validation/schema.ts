import joi from "joi";

export const loginSchema = {
  email: joi.string().messages({
    'string.email': "Invalid email format",
    'string.empty': "Can't be empty",
  }),
  password: joi.string().trim().messages({
    'string.empty': "Can't be empty"
  })
};

export const registerSchema = {
  firstName: joi.string().min(1).max(50).messages({
    'string.min': "Must be 1 or more characters",
    'string.max': "Must be 50 characters or less",
    'string.empty': "Can't be empty",

  }),
  lastName: joi.string().min(1).max(50).messages({
    'string.min': "Must be 1 or more characters",
    'string.max': "Must be 50 characters or less",
    'string.empty': "Can't be empty",

  }),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).messages({
    'string.email': "Invalid email format",
    'string.empty': "Can't be empty",
  }),
  password: joi.string().trim()
  .min(5).message("Must be 5 or more characters")
  .max(40).message("Must be 40 characters or less")
  .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/).message("Must have at least one number").messages({'string.empty': "Can't be empty"}),
  repeatPassword: joi.string().trim().valid(joi.ref('password')).messages({
    'any.only': 'Passwords must match',
    'string.empty': "Can't be empty",
  }),
  // .custom((value, helpers) => {
  //   if (value === helpers.state.password) {
  //     return value; // Passwords match
  //   } else {
  //     return helpers.message('Passwords must match');
  //   }
  // })
  // .messages({
  //   'string.empty': "Can't be empty",
  // }),
  // .valid(joi.ref('password'))
  // .options({
  //   language: {
  //     any: {
  //       allowOnly: '!!Passwords do not match',
  //     }
  //   } 
  // })
 
};
