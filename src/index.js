import { getNews } from "./newApi.js"

const spinner = document.querySelector('#spinner')
const main = document.querySelector('main')
const footer = document.querySelector('footer')


var count_image = 0
async function handleImgMarketing(){

    const response = await fetch(`https://g1-clone-node-react.onrender.com/marketing`)
    const marketings = await response.json()
    const marketingtag = document.getElementById("marketing")

    if (count_image < marketings.length - 1) { 
        count_image++;
    } else {
        count_image = 0; 
    }

    marketingtag.src = marketings[count_image].image
    
}


//A fim de evitar várias requisições para o servidor, é feita uma única vez e armazenada em sessionStorage
document.addEventListener('DOMContentLoaded', async ()=>{

    if(!JSON.parse(sessionStorage.getItem('newsArray'))){

        const newsArray = await getNews()

        if(newsArray){

            sessionStorage.setItem('newsArray', JSON.stringify(newsArray))

            await getNewsHightLight()
            await getNewsBoxNew1()
            await getNewsBoxNew2()

            window.location.reload();

            spinner.style.display='none'
            main.style.display='flex'
            footer.style.display='flex'
            
        }

    } else {

        await getNewsHightLight()
        await getNewsBoxNew1()
        await getNewsBoxNew2()

        spinner.style.display='none'
        main.style.display='flex'
        footer.style.display='flex'
    }

    

})

var news = JSON.parse(sessionStorage.getItem('newsArray'))

let newsCounter = 0; //Contador de notícias exibidas
const newsPerPage = 10; //Número de notícias a serem exibidas por vez

//Aqui obtém um array de notícias
async function getNewsBoxNew1(){

    try {

        if(news){

            // Verificar se há mais notícias para exibir
            if (newsCounter < news.length){

                const remainingNews = news.slice(newsCounter, newsCounter + newsPerPage);

                remainingNews.forEach((newsItem) => {

                    //gera notícias na primeira coluna
                    createHtmlNew1(newsItem, 1);
                    

                });

                newsCounter += newsPerPage;
            }

            // Esconde o botão 'Veja mais' se não houver mais notícias
            if (newsCounter >= news.length) {

                document.getElementById('toShowMore').style.display = 'none';

            }
            
        } else {
            return
        }

    } catch (e) {

        console.error(e);

    }
}

var index_box_sec_news = 0
//Aqui obtém um array de notícias
async function getNewsBoxNew2(){

    try {

        if(news){

            const sub_box_new_2 = document.querySelectorAll('.sub_box_new_2')
            const text_sub_box_new_2_1 = document.createElement('h3')
            const text_sub_box_new_2_2 = document.createElement('h3')
            const text_sub_box_new_2_3 = document.createElement('h3')
            const line_sub_box_new_2_1 = document.createElement('hr')
            const line_sub_box_new_2_2 = document.createElement('hr')
            const line_sub_box_new_2_3 = document.createElement('hr')

            text_sub_box_new_2_1.setAttribute('class', 'text_sub_box_new_2')
            text_sub_box_new_2_2.setAttribute('class', 'text_sub_box_new_2')
            text_sub_box_new_2_3.setAttribute('class', 'text_sub_box_new_2')

            line_sub_box_new_2_1.setAttribute('class', 'line_sub_box_new_2')
            line_sub_box_new_2_2.setAttribute('class', 'line_sub_box_new_2')
            line_sub_box_new_2_3.setAttribute('class', 'line_sub_box_new_2')

            const box_sec_news_1 = news.slice(index_box_sec_news, index_box_sec_news + 5)
            const box_sec_news_2 = news.slice(index_box_sec_news + 6, index_box_sec_news + 11)
            const box_sec_news_3 = news.slice(index_box_sec_news + 12, index_box_sec_news + 17)

            sub_box_new_2.forEach((element) => {

                element.innerHTML = '';
                
            });

            text_sub_box_new_2_1.innerText='Você viu isso?'
            sub_box_new_2[0].append(text_sub_box_new_2_1, line_sub_box_new_2_1)

            text_sub_box_new_2_2.innerText='Blogs e colunas'
            sub_box_new_2[1].append(text_sub_box_new_2_2, line_sub_box_new_2_2)

            text_sub_box_new_2_3.innerText='Mais lidas'
            sub_box_new_2[2].append(text_sub_box_new_2_3, line_sub_box_new_2_3)
            
            box_sec_news_1.forEach(n=>{
                
                createHtmlNew2(n, 0)
            })


            box_sec_news_2.forEach(n=>{
                createHtmlNew2(n, 1)
            })

            box_sec_news_3.forEach(n=>{
                createHtmlNew2(n, 2)
            })

            if(index_box_sec_news + 17 < news.length) {

                index_box_sec_news += 7

            } else {

                index_box_sec_news = 0

            }
            
        } else {
            return
        }

    } catch (e) {

        console.error(e);

    }
}

//Aqui cria o html de cada noticia
function createHtmlNew1(newObject, typeNew){

    const div_new = document.createElement('div')
    const div_new_img = document.createElement('div')
    const img_new = document.createElement('img')
    const div_new_text = document.createElement('div')
    const title = document.createElement('h4')
    const text = document.createElement('h3')
    const line = document.createElement('hr')
    
    div_new.setAttribute('class', 'div_new')
    div_new_img.setAttribute('class', 'div_new_img')
    div_new_text.setAttribute('class', 'div_new_text')


    text.style.color='#C4170C'

    img_new.src= newObject.image
    title.innerText= newObject.title
    text.innerText= newObject.content

    div_new_img.append(img_new)
    div_new_text.append(title, text)
    div_new.append(div_new_img, div_new_text)

    if(typeNew===2){
        
        div_new.style.padding='5px'
        div_new.style.width='85%'
        div_new.style.justifyContent='space-between'
        div_new.style.alignItems='center'
        div_new.style.flexDirection='row-reverse'
        div_new.style.backgroundColor='white'

        div_new_img.style.height='80px'
        div_new_img.style.width='80px'

        div_new_text.style.width='70%'
        title.style.display='none'

        document.getElementById('box_new_2').append(div_new, line)

    }else{

        document.getElementById('box_new_1').append(div_new, line)

    }

}

//Aqui cria o html de cada noticia
function createHtmlNew2(newObject, index){

    const sub_box_new_2 = document.querySelectorAll('.sub_box_new_2')

    const div_new = document.createElement('div')
    const div_new_img = document.createElement('div')
    const img_new = document.createElement('img')
    const div_new_text = document.createElement('div')
    const title = document.createElement('h4')
    const text = document.createElement('h3')
    const line = document.createElement('hr')
    
    div_new.setAttribute('class', 'div_new')
    div_new_img.setAttribute('class', 'div_new_img')
    div_new_text.setAttribute('class', 'div_new_text')

    text.style.color='#C4170C'

    img_new.src= newObject.image
    title.innerText= newObject.title
    text.innerText= newObject.content

    div_new_img.append(img_new)
    div_new_text.append(title, text)
    div_new.append(div_new_img, div_new_text)

    div_new.style.padding='5px'
    div_new.style.width='85%'
    div_new.style.justifyContent='space-between'
    div_new.style.alignItems='center'
    div_new.style.flexDirection='row-reverse'
    div_new.style.backgroundColor='white'

    div_new_img.style.height='80px'
    div_new_img.style.width='80px'

    div_new_text.style.width='70%'
    title.style.display='none'

    line.style.width='85%'
    line.style.margin='auto'

    sub_box_new_2[index].append(div_new, line)
}

var index_img_1 = 0;
var index_img_2 = 0;
var index_img_3 = 0;
//Aqui obtém um array de notícias de destaques
async function getNewsHightLight(){

    try {

        if(news){

            const array_1 = news.slice(0, 16);
            const array_2 = news.slice(16, 32);
            const array_3 = news.slice(32, 48);

            const div_hightLight_1 = document.createElement('div');
            const div_hightLight_2 = document.createElement('div');
            const div_hightLight_3 = document.createElement('div');

            const text_hight_light_1 = document.createElement('h2');
            const text_hight_light_2 = document.createElement('h2');
            const text_hight_light_3 = document.createElement('h2');

            const img_hight_light_1 = document.createElement('img');
            const img_hight_light_2 = document.createElement('img');
            const img_hight_light_3 = document.createElement('img');

            //css da div das notícias de destaques
            div_hightLight_1.setAttribute('id', 'hightLight_1');
            div_hightLight_2.setAttribute('id', 'hightLight_2');
            div_hightLight_3.setAttribute('id', 'hightLight_3');

            //css do texto das notícias de destaques
            text_hight_light_1.setAttribute('class', 'text_hight_light');
            text_hight_light_2.setAttribute('class', 'text_hight_light');
            text_hight_light_3.setAttribute('class', 'text_hight_light');

        if (index_img_1 < array_1.length) {

            text_hight_light_1.innerText=array_1[index_img_1].content
            img_hight_light_1.src = array_1[index_img_1].image;
            index_img_1 += 1;

        }else{

            index_img_1 = 0;

        }
        if (index_img_2 < array_2.length) {

            text_hight_light_2.innerText=array_2[index_img_2].content
            img_hight_light_2.src = array_2[index_img_2].image;
            index_img_2 += 1;

        }else{

            index_img_2 = 0;

        }
        if (index_img_3 < array_3.length) {

            text_hight_light_3.innerText=array_3[index_img_3].content
            img_hight_light_3.src = array_3[index_img_3].image;
            index_img_3 += 1;

        }else{

            index_img_3 = 0;

        }

        div_hightLight_1.append(img_hight_light_1, text_hight_light_1);
        div_hightLight_2.append(img_hight_light_2, text_hight_light_2);
        div_hightLight_3.append(img_hight_light_3, text_hight_light_3);

        document.getElementById('hightLight').append(div_hightLight_1, div_hightLight_2, div_hightLight_3);

    } else {
        return
    }

    } catch (e) {
        console.error(e);
    }
}

setInterval( async () =>{

    await handleImgMarketing()
    
}, 5000);

setInterval( async () =>{

    await getNewsHightLight()
    
}, 5000);

setInterval( async () =>{

    await getNewsBoxNew2()

}, 5000);


//Função  que permite abrir/fechar o menu
function closeMenu(){
    const menu_header = document.getElementById('menu-header');
    const currentLeft = getComputedStyle(menu_header).getPropertyValue('left');

    if (currentLeft === '0px') {
        menu_header.style.left = '-290px';
        backdrop.style.display = 'none';
    } else {
        menu_header.style.left = '0';
        backdrop.style.display = 'block';
    }
}
//Função que abre menu
const btn_menu = document.getElementById('cssmenu')
const backdrop = document.getElementById('backdrop');

btn_menu.addEventListener('click', closeMenu)
backdrop.addEventListener('click', closeMenu)
document.getElementById('toShowMore').addEventListener('click', getNewsBoxNew1);
