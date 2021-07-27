const c = (el)=>return document.querySelector(el);
const cs = (el)=>return document.querySelectorAll(el);

//mapeando o arquivo pizzas.js e selecionando item a item pelo index
pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //clonando as estruturas

    c('.pizza-area').append(pizzaItem);
}); 