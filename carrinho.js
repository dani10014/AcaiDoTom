// --- CONFIGURAÇÃO DA LOJA ---
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

// --- TABELA DE PREÇOS (ÁUDIO) ---
function definirPrecoPorKM(distancia) {
    if (distancia < 1.0) return 0; 
    if (distancia >= 1.0 && distancia <= 2.6) return 5000;
    if (distancia > 2.6 && distancia <= 4.0) return 10000;
    if (distancia > 4.0 && distancia <= 6.0) return 15000;
    return 15000; 
}          

// --- CONTROLE DO MODAL DE PAGAMENTO ---
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

// --- ATUALIZAR TOTAIS ---
function atualizarTotais() {
    let subtotalProdutos = 0;
    document.querySelectorAll(".cards").forEach(card => {
        let precoUnitario = parseInt(card.querySelector(".valor").getAttribute("data-preco").replace(/[^\d]/g, '')) || 0;
        let qtd = parseInt(card.querySelector(".quantidade").innerText) || 1;
        subtotalProdutos += (precoUnitario * qtd);
    });

    let totalGeral = subtotalProdutos + TAXA_ENTREGA_ATUAL;
    let valorReais = Math.floor(totalGeral / TAXA_CAMBIO);

    let html = `Gs ${totalGeral.toLocaleString('pt-BR')} <br><span style="font-size: 0.6em">(R$ ${valorReais.toLocaleString('pt-BR')})</span>`;
    
    if(document.getElementById("valor-total")) document.getElementById("valor-total").innerHTML = html;
    if(totalDaCompra) totalDaCompra.innerHTML = html;
    
    return totalGeral;
}

// --- RENDERIZAR ITENS ---
function renderizarCarrinho() {
    container.innerHTML = ""; 

    if (dadosProdutos.length === 0) {
        container.innerHTML = `<h1 class="text-center display-6">Carrinho vazio!</h1>`;
        TAXA_ENTREGA_ATUAL = 0; 
    } else {
        dadosProdutos.forEach((produto, index) => {
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
                                <p class="alert alert-info w-50 p-2 mt-3">${produto.ml}</p>
                                <div class="small text-muted mt-2">
                                    <ul class="list-unstyled border-start ps-2 mb-1" style="border-left: 3px solid #ffc107 !important;">
                                        <span class="fw-bold text-dark" style="font-size: 0.8em;">Acompanhamentos:</span>
                                        ${acompanhamentos}
                                    </ul>
                                    <ul class="list-unstyled border-start ps-2" style="border-left: 3px solid #0d6efd !important;">
                                        <span class="fw-bold text-dark" style="font-size: 0.8em;">Adicionais:</span>
                                        ${adicionais}
                                    </ul>
                                </div>
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
    atribuirEventosBotoes();
    atualizarTotais();
}

// --- ATRIBUIR EVENTOS AOS BOTÕES ---
function atribuirEventosBotoes() {
    document.querySelectorAll(".mais").forEach(btn => {
        btn.onclick = (e) => {
            let card = e.target.closest(".cards");
            let qtdElem = card.querySelector(".quantidade");
            let precoElem = card.querySelector(".valor");
            let precoUnit = parseInt(precoElem.getAttribute("data-preco").replace(/[^\d]/g, '')) || 0;
            let novaQtd = parseInt(qtdElem.innerText) + 1;
            qtdElem.innerText = novaQtd;
            precoElem.innerText = `Gs ${(precoUnit * novaQtd).toLocaleString('pt-BR')}`;
            atualizarTotais(); 
        };
    });

    document.querySelectorAll(".menos").forEach(btn => {
        btn.onclick = (e) => {
            let card = e.target.closest(".cards");
            let qtdElem = card.querySelector(".quantidade");
            let precoElem = card.querySelector(".valor");
            let precoUnit = parseInt(precoElem.getAttribute("data-preco").replace(/[^\d]/g, '')) || 0;
            let qtdAtu = parseInt(qtdElem.innerText);
            if (qtdAtu > 1) {
                let novaQtd = qtdAtu - 1;
                qtdElem.innerText = novaQtd;
                precoElem.innerText = `Gs ${(precoUnit * novaQtd).toLocaleString('pt-BR')}`;
                atualizarTotais();
            }
        };
    });

    document.querySelectorAll(".excluir").forEach(btn => {
        btn.onclick = (e) => {
            let index = e.target.getAttribute("data-index");
            dadosProdutos.splice(index, 1);
            localStorage.setItem('carrinho', JSON.stringify(dadosProdutos));
            renderizarCarrinho();
        };
    });
}

// --- GEOLOCALIZAÇÃO ---
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
        }, () => alert("Ative o GPS!"));
    }
});

// --- FINALIZAR WHATSAPP ---
// --- FINALIZAR WHATSAPP ---
btnFinalizarPedido.addEventListener("click", (e) => {
    e.preventDefault();
    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    if (!nome || !endereco || TAXA_ENTREGA_ATUAL === 0) return alert("Preencha tudo e calcule o frete!");

    let totalGeral = atualizarTotais();
    let totalReais = Math.floor(totalGeral / TAXA_CAMBIO);
    let msg = `👋 *Novo Pedido!* 🛒\n\n👤 *Cliente:* ${nome}\n`;
    msg += `----------------------------------\n`;

    document.querySelectorAll(".cards").forEach(card => {
        // --- AQUI ESTÁ O AJUSTE ---
        let nomeProduto = card.querySelector("h5").innerText;
        let qtd = card.querySelector(".quantidade").innerText;
        let valor = card.querySelector(".valor").innerText;
        let ml = card.querySelector(".alert-info").innerText; // Pegamos o ML que está na tela

        msg += `🔹 *${nomeProduto}* - ${ml}\n`; // Adicionamos o ML na mensagem
        msg += `   (${qtd}x) - ${valor}\n`;
        // --------------------------
    });

    msg += `----------------------------------\n`;
    msg += `🛵 *Entrega:* Gs ${TAXA_ENTREGA_ATUAL.toLocaleString('pt-BR')}\n`;
    msg += `💰 *TOTAL:* *Gs ${totalGeral.toLocaleString('pt-BR')}* (R$ ${totalReais})\n`;
    msg += `📍 *Endereço:* ${endereco}\n`;

    window.open(`https://wa.me/595976652307?text=${encodeURIComponent(msg)}`, "_blank");
});

// Inicialização
renderizarCarrinho();