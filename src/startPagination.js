import { paginate } from './paginate.js';
import { parseArticles } from './parseArticles.js';
import { saveToDB } from './saveToDB.js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


export async function startPagination() {

    // get articles count
    let totalArticles = 0;
    let scraped = 0;
    const firstResponse = await paginate(0, 1);
    totalArticles = firstResponse.count;
    console.log(`scraping ${totalArticles} articles`);

    for (let i = 0; i < totalArticles; i += 25) {
        try {

            const mode = process.env.MODE;
            const pool = mysql.createPool({
                host: `${mode === 'production' ? process.env.DB_HOST : process.env.DEV_DB_HOST}`,
                user: `${mode === 'production' ? process.env.DB_USER : process.env.DEV_DB_USER}`,
                password: `${mode === 'production' ? process.env.DB_PASSWORD : process.env.DEV_DB_PASSWORD}`,
                database: `${mode === 'production' ? process.env.DB_NAME : process.env.DEV_DB_NAME}`,
                connectionLimit: 25,
                waitForConnections: true
            });

            let response = await paginate(i).then(res => { return res });
            if (response?.entries) {
                let articles = parseArticles(response.entries); // Array
                scraped += articles.length;
    
                await saveToDB(articles, pool); // save to sqldb
                pool.end(); // end connection pool
            };

        } catch (err) {
            console.error(err);
        };
    };

    console.log(`refreshed ${scraped} articles`);
};