/*
import baseurl from "./baseurl";



async function getNews(){
    try {
        const response = await fetch(`${baseurl}/news`)
        const news = await response.json()

        return news
    } catch (e) {
        console.log(e)
    }
}

async function postNews(newsData) {
    try {

      const response = await fetch(`${baseurl}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Especifique o tipo de conteúdo como JSON
        },
        body: JSON.stringify(newsData), // Converte o objeto de notícia em JSON
      });
  
      if (response.ok) {
        console.log("Notícia postada com sucesso!");
      } else {
        console.error("Erro ao postar a notícia:", response.status);
      }
    } catch (error) {
      console.error("Erro ao postar a notícia:", error);
    }
}
  

export {getNews, postNews}


*/