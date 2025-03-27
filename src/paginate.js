export async function paginate(skip, limit = 25) {

    const cloneUrl = `https://cdn.contentstack.io/v3/content_types/news_article/entries/?only[BASE][]=subtitle&only[BASE][]=date&only[BASE][]=title&only[BASE][]=url&only[BASE][]=publish_details&only[BASE][]=author&only[BASE][]=html_content&locale=en-us&desc=date&include_count=true&limit=${limit}&skip=${skip}&environment=live`;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            api_key: '',
            access_token: ''
        },
        method: 'GET'
    };

    const response = await fetch(cloneUrl, options);
    return response.json();
};