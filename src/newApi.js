async function getNews(){
    try {
        const response = await fetch(`https://g1-clone-node-react.onrender.com/news`);
        const news = await response.json();
        
        return news

    } catch (error) {
        console.log(error);
    }
}

export {getNews}