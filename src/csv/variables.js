import dotenv from 'dotenv';
dotenv.config();

const mode = process.env.MODE;
let allowedOrigins = []; // optional for dev, required for prod
let databaseConfig

// diff variables for dev and prod
if (mode === 'development') {
    databaseConfig = {
        connectionLimit: 10,
        host: process.env.DEV_DB_HOST,
        user: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME
    };
}
else if (mode === 'production') {
    allowedOrigins = [
        'https://dev.destinyarticlefinder.com',
        'https://www.destinyarticlefinder.com',
    ];
    databaseConfig = {
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };
};

export const variables = { allowedOrigins, databaseConfig };