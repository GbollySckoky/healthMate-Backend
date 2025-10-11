import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(
    'development', 'staging', 'production'
  ).required(),
  PORT: Joi.number().default(3000),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().optional(),

  EMAIL_HOST: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  EMAIL_USERNAME: Joi.string().email().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_FROM: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  PAYSTACK_SECRET: Joi.string().required(),
  PAYSTACK_PUBLIC: Joi.string().required(),
  PAYSTACK_BASE_URL: Joi.string().uri().required(),

  VTPASS_API_KEY: Joi.string().required(),
  VTPASS_PUBLIC_KEY: Joi.string().required(),
  VTPASS_SECRET_KEY: Joi.string().required(),
  VTPASS_LIVE_BASE_URL: Joi.string().uri().required(),
  VTPASS_SANDBOX_BASE_URL: Joi.string().uri().required(),
});
