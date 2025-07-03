const twabRegex = /^This Week (?:at Bungie|in Destiny)\b/i;
const hotfixRegex = /^Destiny 2 Hotfix ([\d+.]+)$/i;
const updateRegex = /^Destiny 2 Update ([\d+.]+)$/i;

// Save important information from each article and delete redundant information
export function parseArticles(articles) {
    
    for (let article of articles) {
        
        const date = new Date(article.date.trim());
        const hostedUrl = article.url.hosted_url.replace('/', '').trim();
        article.title = article.title.trim();
        article.subtitle = article.subtitle.trim();
        article.date = date;
        article.publishedAt = article.publish_details.time.trim();
        article.author = article.author.trim();
        article.uid = article.uid.trim();
        article.url = 'https://www.bungie.net/7/en/news/article' + '/' + hostedUrl;
        article.hostedUrl = hostedUrl;
        article.type = 'news'; // default type
        
        // article header image (can be null)
        if (article.image?.url) {
            article.imgUrl = article.image?.url.trim();
        }
        else {
            article.imgUrl = null;
        };

        const dateStringLong = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'GMT'
        });
        const dateStringShort = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'GMT'
        });
        article.dateShortForm = dateStringShort;

        // check type to format properties
        const twabMatch = article.title.match(twabRegex);
        if (twabMatch) {
            const twabTitle = 'This Week in Destiny - ' + dateStringLong;
            article.title = twabTitle;
            article.type = 'twab';
        };

        const hotfixMatch = article.title.match(hotfixRegex);
        if (hotfixMatch) {
            const hotfixTitle = 'Destiny 2 Hotfix ' + hotfixMatch[1];
            article.title = hotfixTitle;
            article.type = 'hotfix';
        };

        const updateMatch = article.title.match(updateRegex);
        if (updateMatch) {
            const updateTitle = 'Destiny 2 Update ' + updateMatch[1];
            article.title = updateTitle;
            article.type = 'update';
        };

        delete article.publish_details;
        delete article.system;
        delete article.image;
    };

    return articles;
};