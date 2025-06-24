import { format } from "@fast-csv/format";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, {dirname} from 'path';
import { fetchAll } from "./fetchAll.js";
import mysql from 'mysql';
import { variables } from "./variables.js";

export async function buildCSV() {

    const connectionPool = mysql.createPool(variables.databaseConfig); // use connection pools
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    try {
        const allArticles = await fetchAll(connectionPool);

        // write to CSV
        const csvStream = format({
            headers: true,
            quoteColumns: true, // encase strings in quotations to avoid commas from escaping
            quoteHeaders: true,
        });
        const writableStream = fs.createWriteStream(path.join(__dirname, './articles.csv'));

        csvStream.pipe(writableStream);
        allArticles.forEach(row => csvStream.write(row)); // forEach is quick enuf
        csvStream.end();
    }
    catch (err) {
        console.error(err);
    };
}