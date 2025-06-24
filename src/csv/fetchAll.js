// return all articles for remote indexing
export function fetchAll(connectionPool) {

    const sqlQuery = 'SELECT * FROM articles';

    return new Promise((resolve, reject) => {
        connectionPool.query(sqlQuery, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}