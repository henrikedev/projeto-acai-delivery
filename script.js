let modalQt = 1;

//criando atalhos para não ter de ficar repetindo o querySelector e o querySelectorAll
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//mapeando o arquivo pizzas.js e selecionando item a item pelo index
pizzaJson.map((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true); //clonando as estruturas

    pizzaItem.setAttribute('data-key', index);

    //exibindo as informações da API (imagem, preço, nome e descrição das pizzas) para o usuário
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed('2')}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    
    //removendo o refresh na página ao abrir o modal
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;

        ////exibindo as informações da API (imagem, preço, nome e descrição das pizzas) no modal
        c('.pizzaBig img').src = item.img;
        c('.pizzaBig img').style.width = '300px';
        c('.pizzaBig img').style.height = '200px';
        c('.pizzaInfo h1').innerHTML = item.name;
        c('.pizzaInfo--desc').innerHTML = item.description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed('2')}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{

            if(sizeIndex == 2){
                size.classList.add('selected'); //mantendo o tamanho Grande selecionado mesmo fechando o modal
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]; //adicionando os tamanhos das pizzas
        });

        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200); //setando delay no modal
        
    });

    c('.pizza-area').append(pizzaItem);
});

//Eventos do modal
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}
cs('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>{
    item.addEventListener ('click', closeModal);
})

//Eventos dos botões de adicionar e remover quantidade de pizzas
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
    
});
c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});
cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
