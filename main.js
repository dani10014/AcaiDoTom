let blocoAlerta = document.querySelector(".alerta");
let produtos = JSON.parse(localStorage.getItem('carrinho')) || [];
let quantidade = [];
let produtoQueCliquei = document.querySelectorAll(".produto")
let fecharCardEscolhido = document.querySelector(".fechar-card");
let overlay = document.querySelector(".overlay");
let MensagemAberto = document.getElementById("aberto");
let modalMensagem = new bootstrap.Modal(document.getElementById("meuModal"));


MensagemAberto.classList.add("aberto-ativo");
function atualizarRelogio(){
    let dataAtual = new Date();

    let horaAtual = dataAtual.getHours(); 
    
    let relogioTexto = dataAtual.toLocaleTimeString("pt-BR", {hour: '2-digit', minute: '2-digit'});
    document.getElementById("horario").innerHTML = relogioTexto;
}
setInterval(atualizarRelogio, 1000);


/***** *
function atualizarRelogio(){
    let dataAtual = new Date();

    let horaAtual = dataAtual.getHours(); 
    
    let relogioTexto = dataAtual.toLocaleTimeString("pt-BR", {hour: '2-digit', minute: '2-digit'});
    document.getElementById("horario").innerHTML = relogioTexto;

    if(horaAtual >= 12 && horaAtual < 22){
        modalMensagem.hide()
        MensagemAberto.classList.add("aberto-ativo");
        MensagemAberto.classList.remove("fechado-ativo");
        MensagemAberto.innerHTML = "Estamos abertos!";
    } else {
        modalMensagem.show()
        MensagemAberto.classList.remove("aberto-ativo");
        MensagemAberto.classList.add("fechado-ativo");
        MensagemAberto.innerHTML = "Estamos fechados!";
    }
}
setInterval(atualizarRelogio, 1000);
*****/

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("adicionar-carrinho")) {
        blocoAlerta.classList.add("alerta-ativo")
        
        event.stopPropagation();
        setTimeout(() => {
            blocoAlerta.classList.remove("alerta-ativo")
        }, 1000);
        
        let card = event.target.closest(".card");

        let produto = {
            imagem: card.querySelector("img").src,
            nome: card.querySelector(".card-title").innerText,
            preco: card.querySelector("#valor").innerText,
            
        }
        produtos.push(produto)
        localStorage.setItem('carrinho', JSON.stringify(produtos));
    }
});

produtoQueCliquei.forEach(card => {
    card.addEventListener("click", (event) => {

        if (event.target.classList.contains("slick-arrow")) {
            return;
        }
        event.stopPropagation();
        
        let cardOriginal = event.currentTarget;
        let container = document.getElementById('container-expandido');
        let clone = cardOriginal.cloneNode(true);

        // Limpar o carrossel do clone para remover artefatos do Slick original
        let carousel = clone.querySelector('.carrosel');
        let imgs = [];
        // Pega apenas as imagens originais (não clonadas pelo slick)
        $(cardOriginal).find('.carrosel img:not(.slick-cloned)').each((i, el) => imgs.push(el.src));

        carousel.innerHTML = '';
        carousel.className = 'carrosel';
        imgs.forEach(src => {
            let img = document.createElement('img');
            img.src = src;
            carousel.appendChild(img);
        });

        clone.classList.add("ativo-produto-apertado");
        clone.classList.remove("mx-2", "mb-3"); // Remove margens que podem atrapalhar a centralização
        
        container.innerHTML = '';
        container.appendChild(clone);

        fecharCardEscolhido.classList.add("btn-ativo-card");
        overlay.classList.add("ativo");
        
        // Inicializa o slick no clone
        $(clone).find('.carrosel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false
        });
    })
});

fecharCardEscolhido.addEventListener("click", () => {
        document.getElementById('container-expandido').innerHTML = '';
        fecharCardEscolhido.classList.remove("btn-ativo-card");
        overlay.classList.remove("ativo");
});
overlay.addEventListener("click", () => {
    document.getElementById('container-expandido').innerHTML = '';
    fecharCardEscolhido.classList.remove("btn-ativo-card");
    overlay.classList.remove("ativo");
});

$(document).ready(function() {
    $(".carrosel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    $(".cards-açai").slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        dots: true,
        infinite: false,
    });

    })