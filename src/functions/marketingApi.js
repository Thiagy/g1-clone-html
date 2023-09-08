/*
import baseurl from "./baseurl";

async function getMarketing(){

    try {

        const response = await fetch(`${baseurl}/marketing`)
        
        const marketing = await response.json()

        return marketing

    } catch (e) {

        console.log(e)

    }
    
}

async function postMarketing(newsData) {

    try {

      const response = await fetch(`${baseurl}/marketing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(newsData), 
      });
  
      if (response.ok) {
        console.log("propaganda postada com sucesso!");
      } else {
        console.error("Erro ao postar a propaganda:", response.status);
      }
    } catch (error) {
      console.error("Erro ao postar a propaganda:", error);
    }

}
  

export {getMarketing, postMarketing}


*/