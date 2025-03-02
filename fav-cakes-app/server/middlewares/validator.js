const Joi = require('joi'); 

const validateCake = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        'any.required': 'Name is required',
      }),
    comment: Joi.string()
      .min(5)
      .max(200)
      .required()
      .messages({
        'string.min': 'Comment should be at least 5 characters',
        'string.max': 'Comment should be less than 200 characters',
        'any.required': 'Comment is required',
      }),
    imageUrl: Joi.string()
      .required()
      .messages({
        'string.base': 'Image URL must be a string',
        'any.required': 'Image URL is required',
      }),
    yumFactor: Joi.number()
      .required()
      .messages({
        'any.required': 'Yum Factor is required',
      }),
  });

  const validateCakeMiddleware = (req, res, next) => {
    const { error } = validateCake.validate(req.body);
    
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    next();
  };
  
  module.exports = { validateCakeMiddleware };
  