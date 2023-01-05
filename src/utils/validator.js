const Joi = require('joi');

const validator = (schema) => (payload) => {
	return schema.validate(payload, {abortEarly: false});
};

const emailSchema = Joi.object({
	email: Joi.string()
		.min(6)
		.required()
		.messages({
			// 'string.base': `"email" should be a type of 'text'`,
			'string.min': `minimum`,
			// 'any.required': `Username or email is required` 
		  })
});

const passwordSchema = Joi.object({
	password: Joi.string()
		.min(6)
		.pattern(/^[\w[\]`!@#$%^&*()={}:;<>+'-]+$/)
		.required()
		.messages({
			// 'string.base': `"password" should be a type of 'text'`,
			'string.min': `minimum`,
			'string.pattern.base': `pattern`,
			// 'any.required': `Password is required`
		  })
})

exports.emailValidation = validator(emailSchema);
exports.passwordValidation = validator(passwordSchema);
