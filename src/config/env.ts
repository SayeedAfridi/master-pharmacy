const env = import.meta.env;

export const dbURL = env.VITE_APP_DB_URL;
export const dbName = env.VITE_APP_DB_NAME;
export const dbUser = env.VITE_APP_DB_USERNAME;
export const dbPass = env.VITE_APP_DB_PASSWORD;
