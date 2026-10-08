import 'dotenv/config';
import Joi from 'joi';

interface EnvVars {
    PORT: number;
    DATABASE_URL: string;
}

// Define the schema for environment variable validation
const envVarsSchema: Joi.ObjectSchema<EnvVars> = Joi.object({
    PORT: Joi.number().default(3000),
}).unknown(true); // Allow other environment variables to be present without validation

const { error, value} = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL
}