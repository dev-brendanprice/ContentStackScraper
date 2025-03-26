import { paginate } from './paginate.js';
import { parseArticles } from './parseArticles.js';
import { saveToDB } from './saveToDB.js';


export async function startPagination() {

    // get articles count
    let totalArticles = 0;
    let scraped = 0;
    const firstResponse = await paginate(0, 1);
    totalArticles = firstResponse.count;
    console.log(`scraping ${totalArticles} articles`);

    for (let i = 0; i < totalArticles; i += 25) {

        let response = await paginate(i).then(res => { return res });
        let articles = parseArticles(response.entries); // Array
        articles.forEach(v => { scraped++; });

        await saveToDB(articles); // save to sqldb

        // pagination complete
        try {
            if (totalArticles === scraped) {
                throw '';
            };
        } catch (err) {
            console.log(`refreshed ${scraped} articles`);
        };
    };
};