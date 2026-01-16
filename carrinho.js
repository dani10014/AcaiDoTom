let dadosProdutos = JSON.parse(localStorage.getItem('carrinho')) || [];
let container = document.getElementById("lista-produtos");
let botaoConfirmarPagamento = document.querySelector(".confirmar-pagamento");
let cardPagamento = document.querySelector(".card-de-pagamento");
let fecharMenuPagamento = document.querySelector(".btn-fechar-pagamento");
let totalDaCompra = document.querySelector(".total-a-pagar");
let btnFinalizarPedido = document.getElementById("finalizarpedido")


if(dadosProdutos.length === 0){
    let mensagen = `<div class="row">
                        <div class="col-12">
                        <h1 class="text-center display-6">Carrinho esta vazio!</h1>
                        </div>
                    </div>`
                    ;
                container.innerHTML += mensagen;
    botaoConfirmarPagamento.style.display = "none";
}
dadosProdutos.forEach((dadosProduto, index) => {
    let listaAcompanhamentos = "";
    if (dadosProduto.acompanhamentos && Array.isArray(dadosProduto.acompanhamentos)) {
        listaAcompanhamentos = dadosProduto.acompanhamentos.map(item => `<li>${item}</li>`).join("");
    }

    let listaAdicionais = "";
    if (dadosProduto.adicionais && Array.isArray(dadosProduto.adicionais)) {
        listaAdicionais = dadosProduto.adicionais.map(item => `<li>${item}</li>`).join("");
    }

    let html =` <div class="col-12 col-md-8">
                        <div class="card mb-4">
                        <div class="card-body">
                        <div class="row align-items-center">
                                    <div class="col-4">
                                    <img src="${dadosProduto.imagem}" class="img-fluid text-center mb-5" style="height: 140px; object-fit: contain; border-radius:10px">
                                    </div>
                                    <div class="col-8">
                                    <h5 class="card-title text-center">${dadosProduto.nome}</h5>
                                    <p class="card-text alert alert-info text-center">${dadosProduto.ml}</p>
                                    <ul>
                                        ${listaAcompanhamentos}
                                    </ul>
                                    <h5 class="display-5 text-center border-bottom pb-2">Adicionais</h5>
                                    <ul>
                                        ${listaAdicionais}
                                    </ul>
                                    <h5 class="text-center mb-3 valor" data-preco="${dadosProduto.preco}">${dadosProduto.preco}</h5>
                                    <div class="valor-e-quantidade d-flex justify-content-between align-items-center">
                                        <button class="btn btn-dark menos">Menos</button>
                                        <span class="btn btn-info quantidade">1</span>
                                        <button class="btn btn-dark mais">Mais</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-danger w-100 excluir" data-index="${index}">Excluir</button>
                    </div>`
                    ;
                container.innerHTML += html;
});

let total = 0;
dadosProdutos.forEach(dadosProduto => {
    let precoTexto = dadosProduto.preco.replace("Gs", "").replace(",", ".").trim();
    let valor = parseFloat(precoTexto);
    
    if (!isNaN(valor)) {
        total += valor;
    }
    document.getElementById("valor-total").innerHTML = `Gs ${total.toFixed(2)}`;
});

let botaoExcluir = document.querySelectorAll(".excluir");

botaoExcluir.forEach(button => {
    button.addEventListener("click", (event) => {
        let index = event.target.getAttribute("data-index");
        dadosProdutos.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(dadosProdutos));
        location.reload();
    })
})

botaoConfirmarPagamento.addEventListener("click", () => {
        cardPagamento.classList.add("ativo-card-de-pagamento");
});
fecharMenuPagamento.addEventListener("click", () => {
    cardPagamento.classList.remove("ativo-card-de-pagamento");
});

totalDaCompra.innerText = `Gs ${total.toFixed(2)}`;


let botaoAdicionarMais = document.querySelectorAll(".mais");
let botaoRemover = document.querySelectorAll(".menos")

botaoRemover.forEach(button => {
    button.addEventListener("click", (event) => {
        let quantidade = event.target.closest(".card").querySelector(".quantidade");
        let quantidadeAtual = parseInt(quantidade.innerText);

        if(quantidadeAtual === 1){
            let blocoAlerta = document.querySelector(".alerta");
            blocoAlerta.classList.add("ativo")
            setTimeout(() => {
                blocoAlerta.classList.remove("ativo");
            }, 1000);
        }
        if(quantidadeAtual > 1){
            quantidadeAtual--;
            quantidade.innerText = quantidadeAtual;
            let valorElement = event.target.closest(".card").querySelector(".valor");
            let precoTexto = valorElement.getAttribute("data-preco").replace("Gs", "").replace(",", ".").trim();
            let valorUnitario = parseFloat(precoTexto);
            total -= valorUnitario;
            document.getElementById("valor-total").innerHTML = `Gs${total.toFixed(2)}`;
            totalDaCompra.innerText = `Gs${total.toFixed(2)}`;
            valorElement.innerText = `${(valorUnitario * quantidadeAtual).toFixed(2)} Gs`;
            
        }
        
    });
});

botaoAdicionarMais.forEach(button => {
    button.addEventListener("click", (event) => {
        let quantidade = event.target.closest(".card").querySelector(".quantidade");
        let quantidadeAtual = parseInt(quantidade.innerText);

        quantidadeAtual++;
        quantidade.innerText = quantidadeAtual;
        let valorElement = event.target.closest(".card").querySelector(".valor");
        let precoTexto = valorElement.getAttribute("data-preco").replace("Gs", "").replace(",", "").trim();
        let valorUnitario = parseFloat(precoTexto);
        total += valorUnitario;
        document.getElementById("valor-total").innerHTML = `Gs${total.toFixed(2)}`;
        totalDaCompra.innerText = `Gs${total.toFixed(2)}`;

        valorElement.innerText = `${(valorUnitario * quantidadeAtual).toFixed(2)} Gs`;

    })
});

btnFinalizarPedido.addEventListener("click", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;

    if (nome.trim() === "") {
        alert("Por favor, preencha seu Nome Completo antes de finalizar.");
        return;
    }

    let mensagem = `Olá, me chamo *${nome}* e gostaria de fazer um pedido:\n\n`;

    dadosProdutos.forEach((produto, index) => {
        mensagem += `*Item ${index + 1}:* ${produto.nome} (${produto.ml})\n`;
        if (produto.acompanhamentos && produto.acompanhamentos.length > 0) mensagem += `  + Acomp: ${produto.acompanhamentos.join(", ")}\n`;
        if (produto.adicionais && produto.adicionais.length > 0) mensagem += `  + Extras: ${produto.adicionais.join(", ")}\n`;
        mensagem += `  Valor: ${produto.preco}\n\n`;
    });

    mensagem += `*Total a Pagar:* Gs ${total.toFixed(2)}\n`;
    if (endereco) mensagem += `*Endereço:* ${endereco}\n`;
    mensagem += `*Pagamento:* Pix`;

    let numeroWhatsApp = "5567991070222"; 
    let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, "_blank");
});