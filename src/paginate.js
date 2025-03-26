export async function paginate(skip, limit = 25) {

    // const cloneUrl = `https://cdn.contentstack.io/v3/content_types/news_article/entries/?only[BASE][]=image&only[BASE][]=mobile_image&only[BASE][]=banner_image&only[BASE][]=subtitle&only[BASE][]=date&only[BASE][]=title&only[BASE][]=url&only[BASE][]=html_content&only[BASE][]=publish_details&only[BASE][]=author&locale=en-us&desc=date&include_count=true&limit=${limit}&environment=live&skip=${skip}`;
    const cloneUrl = `https://cdn.contentstack.io/v3/content_types/news_article/entries/?only[BASE][]=subtitle&only[BASE][]=date&only[BASE][]=title&only[BASE][]=url&only[BASE][]=publish_details&only[BASE][]=author&only[BASE][]=html_content&locale=en-us&desc=date&include_count=true&limit=${limit}&skip=${skip}&environment=live`;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            api_key: 'blte410e3b15535c144',
            access_token: 'cs7929311353379d90697fc0b6'
        },
        method: 'GET'
    };

    const response = await fetch(cloneUrl, options);
    return response.json();
};