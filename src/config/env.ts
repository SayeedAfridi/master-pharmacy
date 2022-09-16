const env = import.meta.env;

export const dbURL: string = env.VITE_APP_DB_URL;
export const dbName: string = env.VITE_APP_DB_NAME;
export const dbUser: string = env.VITE_APP_DB_USERNAME;
export const dbPass: string = env.VITE_APP_DB_PASSWORD;
