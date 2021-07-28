let cart = [];
let modalQt = 1;
let modalKey = 0;

//criando atalhos para não ter de ficar repetindo o querySelector e o querySelectorAll
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//mapeando o arquivo acais.js e selecionando item a item pelo index
acaiJson.map((item, index)=>{
    let acaiItem = c('.models .acai-item').cloneNode(true); //clonando as estruturas

    acaiItem.setAttribute('data-key', index);

    //exibindo as informações da API (imagem, preço, nome e descrição das acais) para o usuário
    acaiItem.querySelector('.acai-item--img img').src = item.img;
    acaiItem.querySelector('.acai-item--price').innerHTML = `R$ ${item.price.toFixed('2')}`;
    acaiItem.querySelector('.acai-item--name').innerHTML = item.name;
    acaiItem.querySelector('.acai-item--desc').innerHTML = item.description;
    
    //removendo o refresh na página ao abrir o modal
    acaiItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.acai-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        ////exibindo as informações da API (imagem, preço, nome e descrição das acais) no modal
        c('.acaiBig img').src = item.img;
        c('.acaiBig img').style.width = '300px';
        c('.acaiBig img').style.height = '200px';
        c('.acaiInfo h1').innerHTML = item.name;
        c('.acaiInfo--desc').innerHTML = item.description;
        c('.acaiInfo--actualPrice').innerHTML = `R$ ${acaiJson[key].price.toFixed('2')}`;
        c('.acaiInfo--size.selected').classList.remove('selected');
        cs('.acaiInfo--size').forEach((size, sizeIndex)=>{

            if(sizeIndex == 2){
                size.classList.add('selected'); //mantendo o tamanho Grande selecionado mesmo fechando o modal
            }

            size.querySelector('span').innerHTML = acaiJson[key].sizes[sizeIndex]; //adicionando os tamanhos das acais
        });

        c('.acaiInfo--qt').innerHTML = modalQt;

        c('.acaiWindowArea').style.opacity = 0;
        c('.acaiWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.acaiWindowArea').style.opacity = 1;
        }, 200); //setando delay no modal
        
    });

    c('.acai-area').append(acaiItem);
});

//Eventos do modal
function closeModal(){
    c('.acaiWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.acaiWindowArea').style.display = 'none';
    }, 500);
}
cs('.acaiInfo--cancelMobileButton, .acaiInfo--cancelButton').forEach((item)=>{
    item.addEventListener ('click', closeModal);
})

//Eventos dos botões de adicionar e remover quantidade de acais
c('.acaiInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        c('.acaiInfo--qt').innerHTML = modalQt;
    }
    
});
c('.acaiInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.acaiInfo--qt').innerHTML = modalQt;
});

//Evento de seleção dos tamanhos
cs('.acaiInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.acaiInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//Evento de adição dos produtos ao carrinho
c('.acaiInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.acaiInfo--size.selected').getAttribute('data-key'));//Pegando o tamanho do item
    let identifier = acaiJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if (key > -1){
        cart[key].qt += modalQt;
    }else{
        cart.push({
            id:acaiJson[modalKey].id,
            size,
            qt:modalQt
         });//adicionando ao carrinho
    }
    updateCart();
    closeModal();   
});

c('.menu-openner').addEventListener('click', ()=>{
    if (cart.length > 0){
        c('aside').style.left = '0';
    }
});
c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
});


//Função de atualização do carrinho com base nos itens adicionados ou removidos
function updateCart(){
    c('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart){
            let acaiItem = acaiJson.find((item)=>item.id == cart[i].id);
            subtotal += acaiItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);

            let acaiSizeName;
            switch(cart[i].size){
                case 0:
                    acaiSizeName = 'P';
                    break;
                case 1:
                    acaiSizeName = 'M';
                    break;
                case 2:
                    acaiSizeName = 'G';
                    break;
            }
            
            let acaiName = `${acaiItem.name} (${acaiSizeName})`;
            
            cartItem.querySelector('img').src = acaiItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = acaiName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i, 1);
                }
                
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=> {
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal  - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}
