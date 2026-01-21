let dadosProdutos = JSON.parse(localStorage.getItem('carrinho')) || [];
let container = document.getElementById("lista-produtos");
let botaoConfirmarPagamento = document.querySelector(".confirmar-pagamento");
let cardPagamento = document.querySelector(".card-de-pagamento");
let fecharMenuPagamento = document.querySelector(".btn-fechar-pagamento");
let totalDaCompra = document.querySelector(".total-a-pagar");
let btnFinalizarPedido = document.getElementById("finalizarpedido")
let btnLocalizacao = document.getElementById("btn-localizacao");

let btnPagEntrega = document.getElementById("btn-pag-entrega");
let btnPagPix = document.getElementById("btn-pag-pix");
let btnPagCartao = document.getElementById("btn-pag-cartao");
let divTroco = document.getElementById("div-troco");
let inputTroco = document.getElementById("troco");
let metodoPagamentoSelecionado = "Pix";
const TAXA_CAMBIO = 1200;
const TAXA_ENTREGA = 10000;

function atualizarTotais(valor) {
    let valorReais = valor / TAXA_CAMBIO;
    let html = `Gs ${valor.toLocaleString('pt-BR')} <br><span class="small text-muted" style="font-size: 0.6em">(R$ ${valorReais.toLocaleString('pt-BR', {minimumFractionDigits: 2})})</span>`;
    document.getElementById("valor-total").innerHTML = html;
    totalDaCompra.innerHTML = html;
}

if(btnPagEntrega && btnPagPix && btnPagCartao) {
    btnPagEntrega.addEventListener("click", () => {
        metodoPagamentoSelecionado = "Dinheiro/Entrega";
        
    
        btnPagEntrega.classList.remove("btn-outline-secondary");
        btnPagEntrega.classList.add("btn-primary", "border-2");
        
        btnPagPix.classList.remove("btn-primary", "border-2");
        btnPagPix.classList.add("btn-outline-secondary");

        btnPagCartao.classList.remove("btn-primary", "border-2");
        btnPagCartao.classList.add("btn-outline-secondary");
        
    
        divTroco.classList.remove("d-none");
    });

    btnPagPix.addEventListener("click", () => {
        metodoPagamentoSelecionado = "Pix";
        
        btnPagPix.classList.remove("btn-outline-secondary");
        btnPagPix.classList.add("btn-primary", "border-2");
        
        btnPagEntrega.classList.remove("btn-primary", "border-2");
        btnPagEntrega.classList.add("btn-outline-secondary");

        btnPagCartao.classList.remove("btn-primary", "border-2");
        btnPagCartao.classList.add("btn-outline-secondary");
        
        divTroco.classList.add("d-none");
        inputTroco.value = "";
    });
    btnPagCartao.addEventListener("click", () => {
        metodoPagamentoSelecionado = "Cartão";
        
        btnPagCartao.classList.remove("btn-outline-secondary");
        btnPagCartao.classList.add("btn-primary", "border-2");
        
        btnPagPix.classList.remove("btn-primary", "border-2");
        btnPagPix.classList.add("btn-outline-secondary");

        btnPagEntrega.classList.remove("btn-primary", "border-2");
        btnPagEntrega.classList.add("btn-outline-secondary");
        
        divTroco.classList.add("d-none");
        inputTroco.value = "";
    });
}
    

if(dadosProdutos.length === 0){
    let mensagem = `<div class="row">
                        <div class="col-12">
                        <h1 class="text-center display-6">Carrinho está vazio!</h1>
                        </div>
                    </div>`
                    ;
                container.innerHTML += mensagem;
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
                    <div class="col-4 text-center">
                        <img src="${dadosProduto.imagem}" class="img-fluid rounded" style="max-height: 140px; object-fit: contain;">
                    </div>
                    
                    <div class="col-8">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h5 class="card-title mb-0 fw-bold">${dadosProduto.nome}</h5>
                                <small class="text-muted badge bg-light text-dark border mt-1">${dadosProduto.ml}</small>
                            </div>
                            <button class="btn btn-sm btn-outline-danger excluir border-0" data-index="${index}" title="Remover item">✕</button>
                        </div>

                        <div class="mb-2">
                            <small class="fw-bold text-secondary">Acompanhamentos:</small>
                            <ul class="list-unstyled small mb-0 ps-2 border-start border-3 border-light text-muted">
                                ${listaAcompanhamentos}
                            </ul>
                        </div>

                        ${listaAdicionais ? `
                        <div class="mb-2">
                            <small class="fw-bold text-secondary">Adicionais:</small>
                            <ul class="list-unstyled small mb-0 ps-2 border-start border-3 border-warning text-muted">
                                ${listaAdicionais}
                            </ul>
                        </div>` : ''}

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

if (dadosProdutos.length > 0) {
    let htmlEntrega = `
    <div class="col-12 col-md-8 mb-3">
        <div class="card shadow-sm border-0 rounded-3">
            <div class="card-body p-3 d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <span style="font-size: 1.5rem; margin-right: 10px;">🛵</span>
                    <h5 class="card-title mb-0 fw-bold text-muted">Taxa de Entrega</h5>
                </div>
                <h5 class="mb-0 text-primary fw-bold">${TAXA_ENTREGA.toLocaleString('pt-BR')} Gs</h5>
            </div>
        </div>
    </div>`;
    container.innerHTML += htmlEntrega;
}

let total = 0;
dadosProdutos.forEach(dadosProduto => {
    let precoTexto = dadosProduto.preco.replace("Gs", "").replace(",", ".").trim();
    let valor = parseFloat(precoTexto);
    
    if (!isNaN(valor)) {
        total += valor;
    }
});
if (dadosProdutos.length > 0) {
    total += TAXA_ENTREGA;
}
atualizarTotais(total);

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

atualizarTotais(total);


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
            atualizarTotais(total);
            valorElement.innerText = `${(valorUnitario * quantidadeAtual).toLocaleString('pt-BR')} Gs`;
            
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
        let precoTexto = valorElement.getAttribute("data-preco").replace("Gs", "").replace(",", ".").trim();
        let valorUnitario = parseFloat(precoTexto);
        total += valorUnitario;
        atualizarTotais(total);

        valorElement.innerText = `${(valorUnitario * quantidadeAtual).toLocaleString('pt-BR')} Gs`;

    })
});

btnLocalizacao.addEventListener("click", () => {
    if (navigator.geolocation) {

        btnLocalizacao.innerHTML = "⏳ Buscando...";
        btnFinalizarPedido.classList.add("disabled");
        btnFinalizarPedido.innerHTML = "⏳ Aguardando localização...";
        
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            
            const linkMaps = `https://www.google.com/maps?q=${lat},${lng}`;
            document.getElementById("endereco").value = linkMaps;
            btnLocalizacao.innerHTML = "✅ Localização Definida";
            
            const mapaPreview = document.getElementById("mapa-preview");
            mapaPreview.innerHTML = `<iframe width="100%" height="200" frameborder="0" style="border:0; border-radius: 10px;" src="https://maps.google.com/maps?q=${lat},${lng}&hl=pt&z=16&output=embed"></iframe>`;
            
            btnFinalizarPedido.classList.remove("disabled");
            btnFinalizarPedido.innerHTML = "Finalizar pedido";

        }, () => {
            alert("Erro ao obter sua localização. Verifique se o GPS está ativo.");
            btnLocalizacao.innerHTML = "❌ Tentar Novamente";
            btnFinalizarPedido.classList.remove("disabled");
            btnFinalizarPedido.innerHTML = "Finalizar pedido";
        });
    } else {
        alert("Seu navegador não suporta geolocalização.");
    }
});

btnFinalizarPedido.addEventListener("click", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;

    if (nome.trim() === "") {
        alert("Por favor, preencha seu Nome Completo antes de finalizar.");
        return;
    }
    
    if (endereco.trim() === "") {
        alert("Por favor, informe o endereço de entrega ou use a localização.");
        return;
    }

    let mensagem = `Olá, me chamo *${nome}* e gostaria de fazer um pedido:\n\n`;

    dadosProdutos.forEach((produto, index) => {
        mensagem += `*Item ${index + 1}:* ${produto.nome} (${produto.ml})\n`;
        if (produto.acompanhamentos && produto.acompanhamentos.length > 0) mensagem += `  + Acomp: ${produto.acompanhamentos.join(", ")}\n`;
        if (produto.adicionais && produto.adicionais.length > 0) mensagem += `  + Extras: ${produto.adicionais.join(", ")}\n`;
        mensagem += `  Valor: ${produto.preco}\n\n`;
    });
    mensagem += `*Taxa de Entrega:* Gs ${TAXA_ENTREGA.toLocaleString('pt-BR')}\n`;

    let totalReais = total / TAXA_CAMBIO;
    mensagem += `*Total a Pagar:* Gs ${total.toLocaleString('pt-BR')} (R$ ${totalReais.toLocaleString('pt-BR', {minimumFractionDigits: 2})})\n`;
    if (endereco) mensagem += `*Endereço:* ${endereco}\n`;
    
    mensagem += `*Pagamento:* ${metodoPagamentoSelecionado}\n`;
    
    if (metodoPagamentoSelecionado === "Dinheiro/Entrega") {
        let valorTroco = inputTroco.value;
        if (valorTroco.trim() !== "") {
            mensagem += `*Troco para:* ${valorTroco}\n`;
        } else {
            mensagem += `*Troco:* Não precisa\n`;
        }
    }

    let numeroWhatsApp = "5567991070222"; 
    let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, "_blank");

    localStorage.removeItem('carrinho');
    setTimeout(() => {
        location.reload();
    }, 1000);
});