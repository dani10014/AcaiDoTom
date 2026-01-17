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
    if (dadosProduto.acompanhamentos && Array.isArray(dadosProduto.acompanhamentos) && dadosProduto.acompanhamentos.length > 0) {
        listaAcompanhamentos = dadosProduto.acompanhamentos.map(item => `<li>${item}</li>`).join("");
    } else {
        listaAcompanhamentos = "<li class='text-muted small' style='list-style:none'><em>Somente açaí (sem acompanhamentos)</em></li>";
    }
    let listaAdicionais = "";
    if (dadosProduto.adicionais && Array.isArray(dadosProduto.adicionais) && dadosProduto.adicionais.length > 0) {
        listaAdicionais = dadosProduto.adicionais.map(item => `<li>${item}</li>`).join("");
    }

    let html = `
    <div class="col-12 col-md-8 mb-3">
        <div class="card shadow-sm border-0 rounded-3">
            <div class="card-body p-3">
                <div class="row g-3 align-items-center">
                    <!-- Imagem -->
                    <div class="col-4 col-sm-3 text-center">
                        <img src="${dadosProduto.imagem}" class="img-fluid rounded" style="max-height: 100px; object-fit: contain;">
                    </div>
                    
                    <!-- Detalhes -->
                    <div class="col-8 col-sm-9">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h5 class="card-title mb-0 fw-bold">${dadosProduto.nome}</h5>
                                <small class="text-muted badge bg-light text-dark border mt-1">${dadosProduto.ml}</small>
                            </div>
                            <button class="btn btn-sm btn-outline-danger excluir border-0" data-index="${index}" title="Remover item">✕</button>
                        </div>

                        <!-- Acompanhamentos -->
                        <div class="mb-2">
                            <small class="fw-bold text-secondary">Acompanhamentos:</small>
                            <ul class="list-unstyled small mb-0 ps-2 border-start border-3 border-light text-muted">
                                ${listaAcompanhamentos}
                            </ul>
                        </div>

                        <!-- Adicionais (se houver) -->
                        ${listaAdicionais ? `
                        <div class="mb-2">
                            <small class="fw-bold text-secondary">Adicionais:</small>
                            <ul class="list-unstyled small mb-0 ps-2 border-start border-3 border-warning text-muted">
                                ${listaAdicionais}
                            </ul>
                        </div>` : ''}

                        <!-- Preço e Quantidade -->
                        <div class="d-flex justify-content-between align-items-end mt-3 pt-2 border-top">
                            <h5 class="mb-0 text-primary fw-bold valor" data-preco="${dadosProduto.preco}">${dadosProduto.preco}</h5>
                            
                            <div class="d-flex align-items-center bg-light rounded-pill border px-2 py-1">
                                <button class="btn btn-sm btn-link text-decoration-none text-dark p-0 menos" style="width: 20px;">-</button>
                                <span class="mx-2 fw-bold small quantidade">1</span>
                                <button class="btn btn-sm btn-link text-decoration-none text-dark p-0 mais" style="width: 20px;">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
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