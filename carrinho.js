// --- CONFIGURAÇÃO DA LOJA (PEQUE NO GOOGLE MAPS) ---
const LOJA_LAT = -22.539468911839155;
const LOJA_LNG = -55.73687930310499; 

let dadosProdutos = JSON.parse(localStorage.getItem('carrinho')) || [];
let container = document.getElementById("lista-produtos");
let totalDaCompra = document.querySelector(".total-a-pagar");
let btnFinalizarPedido = document.getElementById("finalizarpedido");
let btnLocalizacao = document.getElementById("btn-localizacao");
let inputTroco = document.getElementById("troco");
let divTroco = document.getElementById("div-troco");

let TAXA_ENTREGA_ATUAL = 0;
let metodoPagamentoSelecionado = "Pix";
const TAXA_CAMBIO = 1200;

// --- FUNÇÃO MATEMÁTICA DE DISTÂNCIA ---
function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; 
}

// --- SUA TABELA DE PREÇOS ATUALIZADA ---
function definirPrecoPorKM(distancia) {
    if (distancia < 1.0) {
        return 0; 
    }
    if (distancia >= 1.0 && distancia <= 2.6) {
        return 5000;
    }
    if (distancia > 2.6 && distancia <= 4.0) {
        return 10000;
    }
    if (distancia > 4.0 && distancia <= 6.0) {
        return 15000;
    }
    return 15000; 
}          

// --- CONTROLE DO MODAL DE PAGAMENTO (REATIVADO) ---
let botaoConfirmarPagamento = document.querySelector(".confirmar-pagamento");
let cardPagamento = document.querySelector(".card-de-pagamento");
let fecharMenuPagamento = document.querySelector(".btn-fechar-pagamento");

if (botaoConfirmarPagamento && cardPagamento) {
    botaoConfirmarPagamento.addEventListener("click", () => {
        if (dadosProdutos.length > 0) {
            cardPagamento.classList.add("ativo-card-de-pagamento");
        } else {
            alert("O seu carrinho está vazio!");
        }
    });
}

if (fecharMenuPagamento && cardPagamento) {
    fecharMenuPagamento.addEventListener("click", () => {
        cardPagamento.classList.remove("ativo-card-de-pagamento");
    });
}

// Seletor de métodos de pagamento (opcional, caso tenha sumido)
document.querySelectorAll(".btn-pag").forEach(btn => {
    btn.addEventListener("click", (e) => {
        metodoPagamentoSelecionado = e.target.innerText;
        // Lógica simples para mostrar/esconder campo de troco
        if(metodoPagamentoSelecionado.includes("Dinheiro")) {
            if(divTroco) divTroco.classList.remove("d-none");
        } else {
            if(divTroco) divTroco.classList.add("d-none");
        }
    });
});
function atualizarTotais() {
    let subtotalProdutos = 0;
    document.querySelectorAll(".cards").forEach(card => {
        let precoUnitario = parseInt(card.querySelector(".valor").getAttribute("data-preco").replace(/[^\d]/g, '')) || 0;
        let qtd = parseInt(card.querySelector(".quantidade").innerText) || 1;
        subtotalProdutos += (precoUnitario * qtd);
    });

    let totalGeral = subtotalProdutos + TAXA_ENTREGA_ATUAL;
    
    // USANDO Math.round() para converter Gs em R$ e ficar um número inteiro
    let valorReais = Math.floor(totalGeral / TAXA_CAMBIO);

    // .toLocaleString('pt-BR') sem as casas decimais
    let html = `Gs ${totalGeral.toLocaleString('pt-BR')} <br><span style="font-size: 0.6em">(R$ ${valorReais.toLocaleString('pt-BR')})</span>`;
    
    if(document.getElementById("valor-total")) document.getElementById("valor-total").innerHTML = html;
    if(totalDaCompra) totalDaCompra.innerHTML = html;
    
    return totalGeral;
}

// --- RENDERIZAR ITENS (LIMPO E ORGANIZADO) ---
container.innerHTML = ""; // Limpa o container antes de desenhar

if (dadosProdutos.length === 0) {
    container.innerHTML = `<h1 class="text-center display-6">Carrinho vazio!</h1>`;
    TAXA_ENTREGA_ATUAL = 0; 
} else {
    // 1. Desenha os Produtos
    dadosProdutos.forEach((produto, index) => {
        // Lógica do "Puro" para acompanhamentos e adicionais
        let acompanhamentos = (produto.acompanhamentos && produto.acompanhamentos.length > 0) 
            ? produto.acompanhamentos.map(i => `<li>${i}</li>`).join("") 
            : "<li><i>Puro (Sem acompanhamentos)</i></li>";

        let adicionais = (produto.adicionais && produto.adicionais.length > 0) 
            ? produto.adicionais.map(i => `<li>${i}</li>`).join("") 
            : "<li><i>Sem adicionais</i></li>";
        
        container.innerHTML += `
        <div class="col-12 col-md-8 mb-3 cards">
            <div class="card shadow-sm border-0">
                <div class="card-body p-3">
                    <div class="row align-items-center">
                        <div class="col-4"><img src="${produto.imagem}" class="img-fluid rounded"></div>
                        <div class="col-8">
                            <div class="d-flex justify-content-between">
                                <h5 class="fw-bold mb-0">${produto.nome}</h5>
                                <button class="btn btn-sm text-danger excluir" data-index="${index}">✕</button>
                            </div>
                            <ul class="list-unstyled small text-muted border-start ps-2 mt-1">
                                ${acompanhamentos} ${adicionais}
                            </ul>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <span class="fw-bold text-primary valor" data-preco="${produto.preco}">${produto.preco}</span>
                                <div class="bg-light rounded-pill px-2">
                                    <button class="btn btn-sm menos">-</button>
                                    <span class="mx-2 quantidade">1</span>
                                    <button class="btn btn-sm mais">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    // 2. Desenha o Card da Taxa (Só se tiver produto)
    container.innerHTML += `
        <div class="col-12 col-md-8 mb-3" id="card-taxa">
            <div class="card border-warning shadow-sm">
                <div class="card-body d-flex justify-content-between py-2">
                    <span>🛵 Taxa de Entrega</span>
                    <span class="fw-bold text-primary" id="exibir-taxa-entrega">
                        ${TAXA_ENTREGA_ATUAL > 0 ? 'Gs ' + TAXA_ENTREGA_ATUAL.toLocaleString('pt-BR') : 'Calcule na localização'}
                    </span>
                </div>
            </div>
        </div>`;
}

/// --- EVENTO BOTÃO MAIS ---
document.querySelectorAll(".mais").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let card = e.target.closest(".cards"); // Acha o card desse produto
        let qtdElemento = card.querySelector(".quantidade");
        let precoElemento = card.querySelector(".valor");
        
        // Pega o preço unitário que guardamos no data-preco
        let precoUnitario = parseInt(precoElemento.getAttribute("data-preco").replace(/[^\d]/g, '')) || 0;
        
        // Aumenta a quantidade
        let novaQtd = parseInt(qtdElemento.innerText) + 1;
        qtdElemento.innerText = novaQtd;
        
        // Atualiza o valor NO CARD (Preço Unitário x Quantidade)
        let novoSubtotal = precoUnitario * novaQtd;
        precoElemento.innerText = `${novoSubtotal.toLocaleString('pt-BR')} Gs`;
        
        atualizarTotais(); 
    });
});


document.querySelectorAll(".menos").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let card = e.target.closest(".cards");
        let qtdElemento = card.querySelector(".quantidade");
        let precoElemento = card.querySelector(".valor");
        
        let precoUnitario = parseInt(precoElemento.getAttribute("data-preco").replace(/[^\d]/g, '')) || 0;
        let qtdAtual = parseInt(qtdElemento.innerText);

        if (qtdAtual > 1) {
            let novaQtd = qtdAtual - 1;
            qtdElemento.innerText = novaQtd;
            
            // Atualiza o valor NO CARD
            let novoSubtotal = precoUnitario * novaQtd;
            precoElemento.innerText = `${novoSubtotal.toLocaleString('pt-BR')} Gs`;
            
            atualizarTotais();
        }
    });
});

document.querySelectorAll(".excluir").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let index = e.target.getAttribute("data-index");
        dadosProdutos.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(dadosProdutos));
        location.reload();
    });
});

// --- GEOLOCALIZAÇÃO E CÁLCULO REAL ---
btnLocalizacao.addEventListener("click", () => {
    if (navigator.geolocation) {
        btnLocalizacao.innerHTML = "⏳ Calculando...";
        navigator.geolocation.getCurrentPosition((position) => {
            const latC = position.coords.latitude;
            const lngC = position.coords.longitude;
            
            const dist = calcularDistancia(LOJA_LAT, LOJA_LNG, latC, lngC);
            TAXA_ENTREGA_ATUAL = definirPrecoPorKM(dist);
            
            document.getElementById("endereco").value = `https://www.google.com/maps?q=${latC},${lngC}`;
            document.getElementById("exibir-taxa-entrega").innerText = `Gs ${TAXA_ENTREGA_ATUAL.toLocaleString('pt-BR')} (${dist.toFixed(1)} km)`;
            
            btnLocalizacao.innerHTML = "✅ Frete Calculado";
            atualizarTotais();
        }, () => alert("Ative o GPS para calcular o frete!"));
    }
});

// --- FINALIZAR WHATSAPP ---
btnFinalizarPedido.addEventListener("click", (e) => {
    e.preventDefault();
    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;

    if (!nome || !endereco || TAXA_ENTREGA_ATUAL === 0) {
        return alert("Por favor, preencha nome, endereço e calcule o frete!");
    }

    let totalGeral = atualizarTotais();
    let msg = `👋 *Novo Pedido!* 🛒\n\n👤 *Cliente:* ${nome}\n`;
    msg += `----------------------------------\n`;
    
    document.querySelectorAll(".cards").forEach(card => {
        let nomeP = card.querySelector("h5").innerText;
        let qtd = card.querySelector(".quantidade").innerText;
        let vTotalItem = card.querySelector(".valor").innerText;
        msg += `🔹 *${nomeP}* (${qtd}x) - ${vTotalItem}\n`;
    });

    msg += `----------------------------------\n`;
    msg += `🛵 *Entrega:* Gs ${TAXA_ENTREGA_ATUAL.toLocaleString('pt-BR')}\n`;
    msg += `💰 *TOTAL:* *Gs ${totalGeral.toLocaleString('pt-BR')}*\n`;
    msg += `📍 *Endereço:* ${endereco}\n`;

    window.open(`https://wa.me/595976652307?text=${encodeURIComponent(msg)}`, "_blank");
    localStorage.removeItem('carrinho');
    location.reload();
});

atualizarTotais();