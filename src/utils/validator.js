const Joi = require('joi');

const validator = (schema) => (payload) => {
	return schema.validate(payload, {abortEarly: false});
};

const emailSchema = Joi.object({
	email: Joi.string().min(6).required()
});

const passwordSchema = Joi.object({
	password: Joi.string().min(6).pattern(/[\w[\]`!@#$%^&*()={}:;<>+'-]*/).required()
})

exports.emailValidation = validator(emailSchema);
exports.passwordValidation = validator(passwordSchema);
