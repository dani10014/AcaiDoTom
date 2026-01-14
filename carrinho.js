let produtos = JSON.parse(localStorage.getItem('carrinho')) || [];
let container = document.getElementById("lista-produtos");
let botaoConfirmarPagamento = document.querySelector(".confirmar-pagamento");
let cardPagamento = document.querySelector(".card-de-pagamento");
let fecharMenuPagamento = document.querySelector(".btn-fechar-pagamento");
let totalDaCompra = document.querySelector(".total-a-pagar");

if(produtos.length === 0){
    let mensagen = `<div class="row">
                        <div class="col-12">
                        <h1 class="text-center display-6">Carrinho esta vazio!</h1>
                        </div>
                    </div>`
                    ;
                container.innerHTML += mensagen;
    botaoConfirmarPagamento.style.display = "none";
}
produtos.forEach((produto, index) => {
    let html =` <div class="col-12 col-md-8">
                        <div class="card mb-4">
                        <div class="card-body">
                        <div class="row align-items-center">
                                    <div class="col-4">
                                    <img src="${produto.imagem}" class="img-fluid" style="height: 140px; object-fit: contain;">
                                    </div>
                                    <div class="col-8">
                                    <h5 class="card-title">${produto.nome}</h5>
                                    <ul>
                                        <li>Banana</li>
                                        <li>Morango</li>
                                        <li>Kiwi</li>
                                    </ul>
                                    <h5 class="text-center mb-3 valor" data-preco="${produto.preco}">${produto.preco}</h5>
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
produtos.forEach(produto => {
    let precoTexto = produto.preco.replace("R$", "").replace(",", ".").trim();
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
        produtos.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(produtos));
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
