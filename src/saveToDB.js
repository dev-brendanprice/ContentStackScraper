import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: `${process.env.DEV_DB_HOST}`,
    user: `${process.env.DEV_DB_USER}`,
    password: `${process.env.DEV_DB_PASSWORD}`,
    database: `${process.env.DEV_DB_NAME}`,
    connectionLimit: 25,
    waitForConnections: true
});

// Insert article into SQL database
export async function saveToDB(articles) {

    const connection = await pool.getConnection();
    const query = `
        INSERT INTO articles (uid, title, subtitle, date, dateShortForm, publishedAt, author, htmlContent, url, type) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            title = VALUES(title), 
            subtitle = VALUES(subtitle), 
            date = VALUES(date), 
            dateShortForm = VALUES(dateShortForm), 
            publishedAt = VALUES(publishedAt), 
            author = VALUES(author), 
            htmlContent = VALUES(htmlContent), 
            url = VALUES(url), 
            type = VALUES(type);
    `;
    
    // should be pushing (mostly) 25 articles at a time
    try {
        await Promise.all(articles.map(article => {
            const values = [
                article.uid,
                article.title,
                article.subtitle,
                article.date,
                article.dateShortForm,
                article.publishedAt,
                article.author,
                article.html_content,
                article.url,
                article.type
            ];
            return connection.query(query, values);
        }));
    } catch (err) {
        console.error(err);
    } finally {
        connection.release();
    };
};