
// Insert article into SQL database
export async function saveToDB(articles, pool) {

    const connection = await pool.getConnection();
    const query = `
        INSERT INTO articles (uid, title, subtitle, date, dateShortForm, publishedAt, author, htmlContent, url, type, hostedUrl) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            title = VALUES(title), 
            subtitle = VALUES(subtitle), 
            date = VALUES(date), 
            dateShortForm = VALUES(dateShortForm), 
            publishedAt = VALUES(publishedAt), 
            author = VALUES(author), 
            htmlContent = VALUES(htmlContent), 
            url = VALUES(url), 
            type = VALUES(type),
            hostedUrl = VALUES(hostedUrl);
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
                article.type,
                article.hostedUrl
            ];
            return connection.query(query, values);
        }));
    } catch (err) {
        console.error(err);
    } finally {
        connection.release();
    };
};