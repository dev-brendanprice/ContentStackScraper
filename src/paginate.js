export async function paginate(skip, limit = 25) {

    try {
        const cloneUrl = `https://cdn.contentstack.io/v3/content_types/news_article/entries/?only[BASE][]=subtitle&only[BASE][]=date&only[BASE][]=title&only[BASE][]=url&only[BASE][]=publish_details&only[BASE][]=author&only[BASE][]=html_content&locale=en-us&desc=date&include_count=true&limit=${limit}&skip=${skip}&environment=live`;
        const options = {
            headers: {
                'Content-Type': 'application/json',
                api_key: process.env.CS_APIKEY,
                access_token: process.env.CS_ACCESS
            },
            method: 'GET'
        };
    
        const response = await fetch(cloneUrl, options)
            .then(res => res.json())
            .then(data => { return data; })
            .catch(console.error);
        
        return response;
    } catch (err) {
        console.error(err);
        return [];
    };
};