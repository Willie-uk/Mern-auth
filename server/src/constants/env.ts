import dotenv from 'dotenv';
dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
  
    if (value === undefined) {
      throw Error(`Missing String environment variable for ${key}`);
    }
  
    return value;
  };
  
  export const NODE_ENV = getEnv("NODE_ENV", "development");
  export const PORT = getEnv("PORT");
  export const MONGO_URI = getEnv("MONGO_URI");
  export const APP_ORIGIN = getEnv("APP_ORIGIN");
  export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");
  export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET");
  export const APP_PASS = getEnv("APP_PASS");
  export const GMAIL_USER = getEnv("GMAIL_USER");
  export const EMAIL_HOST = getEnv("EMAIL_HOST");
  export const EMAIL_PORT = getEnv("EMAIL_PORT");
  export const ADMIN_PASS = getEnv("ADMIN_PASS");
  