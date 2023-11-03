const Joi = require("joi");

const userValidation = Joi.object({

  email: Joi.string().email().optional(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

})

module.exports = {  userValidation};