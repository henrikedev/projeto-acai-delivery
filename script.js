//criando atalhos para não ter de ficar repetindo o querySelector e o querySelectorAll
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//mapeando o arquivo pizzas.js e selecionando item a item pelo index
pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //clonando as estruturas

    //exibindo as informações da API (imagem, preço, nome e descrição das pizas) para o usuário
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed('2')}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    
    //removendo o refresh na página ao abrir o modal
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();

        c('.pizzaWindowArea').style.opacity = 0.5;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200); //setando delay no modal
        
    });

    c('.pizza-area').append(pizzaItem);
});