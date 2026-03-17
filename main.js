let overlay = document.querySelector(".overlay");
let btnFecharCard = document.querySelector(".fechar-card");
let cardAcompanhamentos = document.querySelector(".card-acompanhamentos")
let horario = document.getElementById("horario");
let mensagemAberto = document.getElementById("aberto")
let mensagemFechado = document.getElementById("meuModal")
let alertaAdicao = document.querySelector(".alerta")
let contadorCarrinho = document.querySelector(".contador-de-produtos");
let modalBootstrap;

if (mensagemFechado) {
    modalBootstrap = new bootstrap.Modal(mensagemFechado);
}

function atualizarBotaoFlutuante(carrinho) {
    let botaoFlutuante = document.getElementById("botao-carrinho-flutuante");
    let spanValor = document.getElementById("valor-total-flutuante");

    if (botaoFlutuante && spanValor) {
        if (carrinho.length > 0) {
            let total = 0;
            carrinho.forEach(item => {
                let preco = parseInt(item.preco.replace(/[^\d]/g, '')) || 0;
                total += preco;
            });
            total += 10000;
            spanValor.innerText = `${total.toLocaleString('pt-BR')} Gs`;
            botaoFlutuante.classList.add("ativo");
        } else {
            botaoFlutuante.classList.remove("ativo");
        }
    }
}

function atualizarContador() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (contadorCarrinho) {
        const totalItens = carrinho.length;
        contadorCarrinho.innerText = totalItens;

        if (totalItens > 0) {
            contadorCarrinho.classList.remove('contador-desativado');
        } else {
            contadorCarrinho.classList.add('contador-desativado');
        }
    }
    atualizarBotaoFlutuante(carrinho);
}
setInterval(atualizarContador, 1000);
atualizarContador();


function atualizarHora(){
    const agora = new Date();
    const horaPy = parseInt(new Intl.DateTimeFormat('pt-BR',{
        timeZone : "America/Asuncion",
        hour:"2-digit",
        minute:"2-digit",
        hour12:false

    }).format(agora));

    const relogioTexto = agora.toLocaleTimeString('pt-BR', {
        timeZone: 'America/Asuncion',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
    });
    
    horario.innerHTML = relogioTexto;

    if(horaPy >= 13){
        mensagemAberto.classList.add("aberto-ativo");
        if (modalBootstrap) {
            modalBootstrap.hide();
        }
    }
    else{
        if (modalBootstrap && !document.querySelector(".modal.show")) {
            modalBootstrap.show();
        }
    }

} 
setInterval(atualizarHora, 1000);

function fecharCardAberto() {
    cardAcompanhamentos.classList.remove("acompanhamentos-ativo");
    cardAcompanhamentos.innerHTML = ""; 
    overlay.classList.remove("overlay-ativo");
    btnFecharCard.classList.remove("btn-ativo-card");
}

btnFecharCard.addEventListener("click", fecharCardAberto);
overlay.addEventListener("click", fecharCardAberto);

document.addEventListener("click", function (event) {
    if (event.target.matches(".adicionar-carrinho")) {

        const secaoAdicionarAcompanhamento = event.target.closest(".card");
            const mediaElement = secaoAdicionarAcompanhamento.querySelector(".carrosel img") || secaoAdicionarAcompanhamento.querySelector(".carrosel video");
            const imgSrc = mediaElement ? mediaElement.getAttribute("src") : "";
            const nomeProduto = secaoAdicionarAcompanhamento.querySelector(".card-title").innerHTML;
            const mlDoProduto = secaoAdicionarAcompanhamento.querySelector(".alert-info").innerHTML;
            const valorProduto = secaoAdicionarAcompanhamento.querySelector(".valor").innerHTML;
            
            // Verifica se é vídeo ou imagem para exibir corretamente no modal
            let midiaModalHtml = "";
            if (imgSrc && imgSrc.endsWith(".mp4")) {
                midiaModalHtml = `<video src="${imgSrc}" class="card-img-top" style="height: 120px; object-fit: cover;" autoplay muted loop playsinline></video>`;
            } else {
                midiaModalHtml = `<img src="${imgSrc}" class="card-img-top" style="height: 120px; object-fit: cover;">`;
            }

        if (secaoAdicionarAcompanhamento) {

            const elementoTitulo = secaoAdicionarAcompanhamento.querySelector(".card-title");
            const nomeProdutoCheck = (elementoTitulo.getAttribute("data-tipo") || elementoTitulo.innerText).toLowerCase();
            let modalHTML = "";
        if(nomeProdutoCheck.includes("suco")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    ${midiaModalHtml}
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <h5 class="alert alert-danger text-center">Por favor selecione o tamanho do copo</h5>
                        <h5 class="text-center border-bottom pb-2">Tamanho</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="Ml-suco" type="radio" id="acompanhamento1" data-preco="10000" checked>
                                    <label class="form-check-label" for="acompanhamento1">300 Ml <p class="alert alert-danger p-1 ">(10.000 Gs)</p></label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="Ml-suco" type="radio" id="acompanhamento2" data-preco="15000">
                                    <label class="form-check-label" for="acompanhamento2">500 Ml <p class="alert alert-danger p-1 ">(15.000 Gs)</p></label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="Ml-suco" type="radio" id="acompanhamento3" data-preco="25000">
                                    <label class="form-check-label" for="acompanhamento3">1 Litro <p class="alert alert-danger p-1 ">(25.000 Gs)</p></label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2 invisible">
                                    <input class="form-check-input" name="Ml-suco" type="radio" id="acompanhamento3" data-preco="15000">
                                    <label class="form-check-label" for="acompanhamento3">1 Litro (15.000 Gs)</label>
                                </div>
                            </div>
                        </div>
                        <div class="sticky-footer">
                            <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                                <span class="fw-bold">Total:</span>
                                <span class="fw-bold" id="preco-total">10000 Gs</span>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>`;
                }else if(nomeProdutoCheck.includes("salgado-assado")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    ${midiaModalHtml}
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <h5 class="alert alert-danger text-center">Selecione o recheio</h5>
                        <h5 class="text-center border-bottom pb-2">Recheio</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="assado1">
                                    <label class="form-check-label" for="assado1">Carne</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="assado2">
                                    <label class="form-check-label" for="assado2">Queijo</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="assado3">
                                    <label class="form-check-label" for="assado3">Presunto</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="assado4">
                                    <label class="form-check-label" for="assado4">Frango</label>
                                </div>
                            </div>
                        </div>
                        <div class="sticky-footer">
                            <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                                <span class="fw-bold">Total:</span>
                                <span class="fw-bold" id="preco-total">${valorProduto}</span>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>`;
                }else if(nomeProdutoCheck.includes("salgado")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    ${midiaModalHtml}
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <h5 class="alert alert-danger text-center">Por favor selecione a quantidade de pasteis após adicionar ao seu carrinho</h5>
                        <h5 class="text-center border-bottom pb-2">Escolha o recheio</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="acompanhamento1">
                                    <label class="form-check-label" for="acompanhamento1">Carne</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="acompanhamento2">
                                    <label class="form-check-label" for="acompanhamento2">Queijo</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="acompanhamento3">
                                    <label class="form-check-label" for="acompanhamento3">Presunto</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="acompanhamento4">
                                    <label class="form-check-label" for="acompanhamento4">Frango</label>
                                </div>
                            </div>
                            <div class="col-6 invisible">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="acompanhamento4">
                                    <label class="form-check-label" for="acompanhamento4">Frango</label>
                                </div>
                            </div>
                        </div>
                        <div class="sticky-footer">
                            <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                                <span class="fw-bold">Total:</span>
                                <span class="fw-bold" id="preco-total">${valorProduto}</span>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>`;
            }else if(nomeProdutoCheck.includes("pastel-especial")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    ${midiaModalHtml}
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <h5 class="alert alert-danger text-center">Selecione o recheio</h5>
                        
                        <h5 class="text-center border-bottom pb-2">Tradicionais (10.000 Gs)</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="recheio-pastel-especial" type="radio" id="recheio1" data-preco="10000" checked>
                                    <label class="form-check-label" for="recheio1">Carne</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="recheio-pastel-especial" type="radio" id="recheio2" data-preco="10000">
                                    <label class="form-check-label" for="recheio2">Queijo</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="recheio-pastel-especial" type="radio" id="recheio3" data-preco="10000">
                                    <label class="form-check-label" for="recheio3">Frango</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="recheio-pastel-especial" type="radio" id="recheio4" data-preco="10000">
                                    <label class="form-check-label" for="recheio4">Calabresa acebolada</label>
                                </div>
                            </div>
                        </div>

                        <h5 class="text-center border-bottom pb-2 mt-3">Especiais (15.000 Gs)</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-12"><div class="form-check form-switch mb-2"><input class="form-check-input" name="recheio-pastel-especial" type="radio" id="recheio5" data-preco="15000"><label class="form-check-label" for="recheio5">Carne c/ Queijo</label></div></div>
                            <div class="col-12"><div class="form-check form-switch mb-2"><input class="form-check-input" name="recheio-pastel-especial" type="radio" id="recheio6" data-preco="15000"><label class="form-check-label" for="recheio6">Queijo e Presunto</label></div></div>
                            <div class="col-12"><div class="form-check form-switch mb-2"><input class="form-check-input" name="recheio-pastel-especial" type="radio" id="recheio7" data-preco="15000"><label class="form-check-label" for="recheio7">Frango c/ Queijo</label></div></div>
                            <div class="col-12"><div class="form-check form-switch mb-2"><input class="form-check-input" name="recheio-pastel-especial" type="radio" id="recheio8" data-preco="15000"><label class="form-check-label" for="recheio8">Calabresa c/ Queijo</label></div></div>
                        </div>

                        <h5 class="text-center border-bottom pb-2 mt-3">Super Recheado (20.000 Gs)</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="recheio-pastel-especial" type="radio" id="recheio9" data-preco="20000">
                                    <label class="form-check-label" for="recheio9">Tudo (Qj, Fr, Crn, Bcn, Cal)</label>
                                </div>
                            </div>
                        </div>

                        <div class="sticky-footer">
                            <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                                <span class="fw-bold">Total:</span>
                                <span class="fw-bold" id="preco-total">10000 Gs</span>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>`;
            }else if(nomeProdutoCheck.includes("frango-batata")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    ${midiaModalHtml}
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <h5 class="alert alert-danger text-center">Selecione o tamanho da porção</h5>
                        <h5 class="text-center border-bottom pb-2">Tamanho</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="tamanho-frango" type="radio" id="tamanhoP" data-preco="35000">
                                    <label class="form-check-label" for="tamanhoP">Pequena (35.000 Gs)</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="tamanho-frango" type="radio" id="tamanhoM" data-preco="50000" checked>
                                    <label class="form-check-label" for="tamanhoM">Média (50.000 Gs)</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="tamanho-frango" type="radio" id="tamanhoG" data-preco="75000">
                                    <label class="form-check-label" for="tamanhoG">Grande (75.000 Gs)</label>
                                </div>
                            </div>
                        </div>
                        <div class="sticky-footer">
                            <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                                <span class="fw-bold">Total:</span>
                                <span class="fw-bold" id="preco-total">50000 Gs</span>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>`
            }else if(nomeProdutoCheck.includes("bolo-no-pote")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    ${midiaModalHtml}
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <h5 class="alert alert-danger text-center">Selecione o sabor do bolo</h5>
                        <h5 class="text-center border-bottom pb-2">Tamanho</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="sabor-bolo" type="radio" id="bolo-nutela" data-preco="20000">
                                    <label class="form-check-label" for="bolo-nutela">Bolo no pote de Nutela</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="sabor-bolo" type="radio" id="bolo-chantininho" data-preco="20000">
                                    <label class="form-check-label" for="bolo-chantininho">Bolo no pote de Chantininho</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="sabor-bolo" type="radio" id="bolo-cenoura" data-preco="20000">
                                    <label class="form-check-label" for="bolo">Bolo no pote de Cenoura com nutela</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="sabor-bolo" type="radio" id="bolo-ninho-morango" data-preco="20000">
                                    <label class="form-check-label" for="bolo-ninho-morango">Bolo no pote de Ninho com Morango</label>
                                </div>
                            </div>
                        </div>
                        <div class="sticky-footer">
                            <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                                <span class="fw-bold">Total:</span>
                                <span class="fw-bold" id="preco-total">0 Gs</span>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>`;
            }else if(nomeProdutoCheck.includes("bola-de-sorvete")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    ${midiaModalHtml}
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <div class="alert alert-warning text-center">Selecione a quantidade de cada sabor</div>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            ${(() => {
                                const sabores = ["Maracujá", "Abacaxi", "Ninho c/ Nutella", "Chocolate", "Bis", "Morango", "Leite Cond.", "Flocos", "Oreo", "Banana Caramelada", "Pavê", "Doce de Leite", "Chocomenta", "Chicle"];
                                return sabores.map(sabor => `
                                <div class="col-6 mb-2">
                                    <div class="d-flex flex-column align-items-center border rounded p-2 h-100 bg-light text-dark">
                                        <span class="text-center small fw-bold mb-2 sabor-nome">${sabor}</span>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <button class="btn btn-sm btn-outline-danger rounded-circle p-0 d-flex align-items-center justify-content-center menos-sabor" style="width: 24px; height: 24px;">-</button>
                                            <span class="mx-2 fw-bold small quantidade-sabor">0</span>
                                            <button class="btn btn-sm btn-outline-success rounded-circle p-0 d-flex align-items-center justify-content-center mais-sabor" style="width: 24px; height: 24px;">+</button>
                                        </div>
                                    </div>
                                </div>`).join('');
                            })()}
                        </div>
                        <div class="sticky-footer">
                            <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                                <span class="fw-bold">Total:</span>
                                <span class="fw-bold" id="preco-total">0 Gs</span>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>`;
            }else if(nomeProdutoCheck.includes("sabor-unico") || nomeProdutoCheck.includes("salgadinhos")){
                    let produtoSelecionado = secaoAdicionarAcompanhamento;
                    
                    let listaIngredientes = Array.from(produtoSelecionado.querySelectorAll("ul li"))
                        .map(li => li.innerText);

                    let dadosProduto = {
                        nome:produtoSelecionado.querySelector(".card-title").innerHTML,
                        ml:produtoSelecionado.querySelector(".alert-info").innerText,
                        preco:produtoSelecionado.querySelector(".valor").innerText,
                        imagem: imgSrc,
                        acompanhamentos: listaIngredientes
                    };
                    
                    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
                    carrinho.push(dadosProduto);
                    localStorage.setItem('carrinho', JSON.stringify(carrinho));
                    alertaAdicao.querySelector("h5").innerText = "Produto adicionado ao carrinho!";
                    alertaAdicao.classList.add("alerta-ativo");
                    setTimeout(() => {
                        alertaAdicao.classList.remove("alerta-ativo");
                    }, 1000);
                    return;
            }else if(nomeProdutoCheck.includes("geladinho-gourmet")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    ${midiaModalHtml}
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <div class="alert alert-warning text-center">Por favor selecione o sabor</div>
                        <div class="row text-start p-2" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="radio" name="sabor-geladinho" id="acompanhamento1">
                                    <label class="form-check-label" for="acompanhamento1">Chocolate</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="radio" name="sabor-geladinho" id="acompanhamento2">
                                    <label class="form-check-label" for="acompanhamento2">Morango e nutela</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="radio" name="sabor-geladinho" id="acompanhamento3">
                                    <label class="form-check-label" for="acompanhamento3">Maracuja mouse</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="radio" name="sabor-geladinho" id="acompanhamento4">
                                    <label class="form-check-label" for="acompanhamento4">Coco</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="radio" name="sabor-geladinho" id="acompanhamento5">
                                    <label class="form-check-label" for="acompanhamento5">Leite cond.</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="radio" name="sabor-geladinho" id="acompanhamento6">
                                    <label class="form-check-label" for="acompanhamento6">Amendoin</label>
                                </div>
                            </div>
                        </div>
                            <div class="sticky-footer">
                            <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                                <span class="fw-bold">Total:</span>
                                <span class="fw-bold" id="preco-total">${valorProduto}</span>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                        </div>`
            }else if(nomeProdutoCheck.includes("completo")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    ${midiaModalHtml}
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <div class="alert alert-warning text-center">Este item já vem completo!</div>
                        <div class="row text-start p-2" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento1" checked>
                                    <label class="form-check-label" for="acompanhamento1">Banana</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento2" checked>
                                    <label class="form-check-label" for="acompanhamento2">Morango</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento3" checked>
                                    <label class="form-check-label" for="acompanhamento3">Uva</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento4" checked>
                                    <label class="form-check-label" for="acompanhamento4">Amendoim</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento5" checked>
                                    <label class="form-check-label" for="acompanhamento5">Granola</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento6" checked>
                                    <label class="form-check-label" for="acompanhamento6">Leite em pó</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento7" checked>
                                    <label class="form-check-label" for="acompanhamento7">Leite Cond.</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento8" checked>
                                    <label class="form-check-label" for="acompanhamento8">Gotas Choc.</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento9" checked>
                                    <label class="form-check-label" for="acompanhamento9">Bis</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento10" checked>
                                    <label class="form-check-label" for="acompanhamento10">Sucrilhos</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento11" checked>
                                    <label class="form-check-label" for="acompanhamento11">M&Ms</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento12" checked>
                                    <label class="form-check-label" for="acompanhamento12">Mel</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento13" checked>
                                    <label class="form-check-label" for="acompanhamento13">Calda Choc.</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento14" checked>
                                    <label class="form-check-label" for="acompanhamento14">Calda Morango</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento15" checked>
                                    <label class="form-check-label" for="acompanhamento15">Chantilly</label>
                                </div>
                            </div>
                        </div>

                        <h5 class="mt-3 mb-2">Adicionais Extras</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input input-adicionais" type="checkbox" id="adicional1">
                                        <label class="form-check-label" for="adicional1">Talento</label>
                                    </div>
                                    <span class="alert alert-info mb-0 p-1">5.000 Gs</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input input-adicionais" type="checkbox" id="adicional2">
                                        <label class="form-check-label" for="adicional2">Nutella</label>
                                    </div>
                                    <span class="alert alert-info mb-0 p-1">5.000 Gs</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input input-adicionais" type="checkbox" id="adicional3">
                                        <label class="form-check-label" for="adicional3">KitKat</label>
                                    </div>
                                    <span class="alert alert-info mb-0 p-1">5.000 Gs</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input input-adicionais" type="checkbox" id="adicional4">
                                        <label class="form-check-label" for="adicional4">Prestígio</label>
                                    </div>
                                    <span class="alert alert-info mb-0 p-1">5.000 Gs</span>
                                </div>
                            </div>
                        </div>
                        <div class="sticky-footer">
                            <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                                <span class="fw-bold">Total:</span>
                                <span class="fw-bold" id="preco-total">${valorProduto}</span>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>`;
            }else{
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    ${midiaModalHtml}
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <h5 class="alert alert-danger text-center">Por favor, escolha os acompanhamentos</h5>
                        <h5 class="text-center border-bottom pb-2">Escolha seus acompanhamentos</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento1">
                                    <label class="form-check-label" for="acompanhamento1">Banana</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento2">
                                    <label class="form-check-label" for="acompanhamento2">Morango</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento5">
                                    <label class="form-check-label" for="acompanhamento5">Granola</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento6">
                                    <label class="form-check-label" for="acompanhamento6">Leite em p.</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento7">
                                    <label class="form-check-label" for="acompanhamento7">Leite cond.</label>
                                </div>
                            </div>
                            <div class="col-6 invisible">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento7">
                                    <label class="form-check-label" for="acompanhamento7">Leite cond.</label>
                                </div>
                            </div>
                        </div>
                        <h5 class="mt-3 mb-2">Adicionais</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input input-adicionais" type="checkbox" id="adicional1">
                                        <label class="form-check-label" for="adicional1">Talento</label>
                                    </div>
                                    <span class="alert alert-info mb-0 p-1">5.000 Gs</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input input-adicionais" type="checkbox" id="adicional2">
                                        <label class="form-check-label" for="adicional2">Nutella</label>
                                    </div>
                                    <span class="alert alert-info mb-0 p-1">5.000 Gs</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input input-adicionais" type="checkbox" id="adicional3">
                                        <label class="form-check-label" for="adicional3">KitKat</label>
                                    </div>
                                    <span class="alert alert-info mb-0 p-1">5.000 Gs</span>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input input-adicionais" type="checkbox" id="adicional4">
                                        <label class="form-check-label" for="adicional4">Prestígio</label>
                                    </div>
                                    <span class="alert alert-info mb-0 p-1">5.000 Gs</span>
                                </div>
                            </div>
                        </div>
                        <div class="sticky-footer">
                            <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                                <span class="fw-bold">Total:</span>
                                <span class="fw-bold" id="preco-total">${valorProduto}</span>
                            </div>
                            <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>`;
            }
            
            cardAcompanhamentos.classList.add("acompanhamentos-ativo");
            overlay.classList.add("overlay-ativo");
            btnFecharCard.classList.add("btn-ativo-card");
            cardAcompanhamentos.innerHTML = modalHTML;

            const inputsExtras = cardAcompanhamentos.querySelectorAll('.input-adicionais');
            const displayTotal = cardAcompanhamentos.querySelector('#preco-total');
            const parseValor = (str) => parseInt(str.replace(/[^\d]/g, '')) || 0;
            const precoBase = parseValor(valorProduto);

            const atualizarTotalGeral = () => {
                let total = 0;
                
                if (nomeProdutoCheck.includes("bola-de-sorvete")) {
                    const spansQuantidade = cardAcompanhamentos.querySelectorAll('.quantidade-sabor');
                    let totalBolas = 0;
                    spansQuantidade.forEach(span => {
                        totalBolas += parseInt(span.innerText);
                    });
                    total = totalBolas * precoBase;
                } else {
                    total = precoBase;
                }

                inputsExtras.forEach(i => {
                    if (i.checked) {
                        const textoPreco = i.closest('.d-flex').querySelector('.alert-info').innerText;
                        total += parseValor(textoPreco);
                    }
                });
                displayTotal.innerText = total + " Gs";
            };

            inputsExtras.forEach(input => {
                input.addEventListener('change', atualizarTotalGeral);
            });
            
            const botoesMaisSabor = cardAcompanhamentos.querySelectorAll(".mais-sabor");
            botoesMaisSabor.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const span = e.target.closest("div").querySelector(".quantidade-sabor");
                    let qtd = parseInt(span.innerText);
                    span.innerText = qtd + 1;
                    atualizarTotalGeral();
                });
            });

            const botoesMenosSabor = cardAcompanhamentos.querySelectorAll(".menos-sabor");
            botoesMenosSabor.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const span = e.target.closest("div").querySelector(".quantidade-sabor");
                    let qtd = parseInt(span.innerText);
                    if (qtd > 0) {
                        span.innerText = qtd - 1;
                        atualizarTotalGeral();
                    }
                });
            });

            const inputsTamanhoFrango = cardAcompanhamentos.querySelectorAll('input[name="tamanho-frango"]');
            inputsTamanhoFrango.forEach(input => {
                input.addEventListener('change', () => {
                    if(input.checked){
                        displayTotal.innerText = input.getAttribute('data-preco') + " Gs";
                    }
                });
            });

            const inputsMlSuco = cardAcompanhamentos.querySelectorAll('input[name="Ml-suco"]');
            inputsMlSuco.forEach(input => {
                input.addEventListener('change', () => {
                    if(input.checked){
                        displayTotal.innerText = input.getAttribute('data-preco') + " Gs";
                    }
                });
            });

            const inputsPastelEspecial = cardAcompanhamentos.querySelectorAll('input[name="recheio-pastel-especial"]');
            inputsPastelEspecial.forEach(input => {
                input.addEventListener('change', () => {
                    if(input.checked){
                        displayTotal.innerText = input.getAttribute('data-preco') + " Gs";
                    }
                });
            });

            const inputsSaborBolo = cardAcompanhamentos.querySelectorAll('input[name="sabor-bolo"]');
            inputsSaborBolo.forEach(input => {
                input.addEventListener('change', () => {
                    if(input.checked){
                        displayTotal.innerText = input.getAttribute('data-preco') + " Gs";
                    }
                });
            });

            let btnConfirmar = document.querySelector(".btn-confirmar");
            
            btnConfirmar.addEventListener("click", () => {
                let Produto = btnConfirmar.closest(".card")

                let opcoesRecheio = Produto.querySelectorAll('input[name="pastel-recheio"]');
                if (opcoesRecheio.length > 0) {
                    let recheioSelecionado = Array.from(opcoesRecheio).some(radio => radio.checked);
                    if (!recheioSelecionado) {
                        alert("Por favor, selecione um recheio antes de adicionar ao carrinho.");
                        return;
                    }
                }

                let opcoesSaborBolo = Produto.querySelectorAll('input[name="sabor-bolo"]');
                if (opcoesSaborBolo.length > 0) {
                    let saborSelecionado = Array.from(opcoesSaborBolo).some(radio => radio.checked);
                    if (!saborSelecionado) {
                        alert("Por favor, selecione um sabor de bolo.");
                        return;
                    }
                }

                let opcoesSaborSorvete = Produto.querySelectorAll('.quantidade-sabor');
                if (opcoesSaborSorvete.length > 0) {
                    let totalBolas = 0;
                    opcoesSaborSorvete.forEach(span => totalBolas += parseInt(span.innerText));
                    if (totalBolas === 0) {
                        alert("Por favor, selecione pelo menos uma bola de sorvete.");
                        return;
                    }
                }

                let inputsAcompanhamentos = Produto.querySelectorAll(".form-check-input:not(.input-adicionais)");
                let inputsAdicionais = Produto.querySelectorAll(".input-adicionais");

                let mlSelecionado = Produto.querySelector(".alert-info").innerHTML;

                // Verifica se é Suco e pega o tamanho selecionado (removendo o preço)
                let inputMlSuco = Produto.querySelector('input[name="Ml-suco"]:checked');
                if (inputMlSuco) {
                    let label = Produto.querySelector(`label[for="${inputMlSuco.id}"]`);
                    if (label && label.firstChild) {
                        mlSelecionado = label.firstChild.textContent.trim();
                    }
                }

                // Verifica se é Frango e pega o tamanho selecionado
                let inputTamanhoFrango = Produto.querySelector('input[name="tamanho-frango"]:checked');
                if (inputTamanhoFrango) {
                    let label = Produto.querySelector(`label[for="${inputTamanhoFrango.id}"]`);
                    if (label) {
                        mlSelecionado = label.innerText.trim();
                    }
                }

                let dadosProduto = {
                    imagem: Produto.querySelector(".card-img-top").getAttribute("src"),
                    nome: Produto.querySelector(".card-title").innerHTML,
                    ml: mlSelecionado,
                    preco: Produto.querySelector("#preco-total").innerText
                }

                let listaAcompanhamentos = [];
                if (nomeProdutoCheck.includes("bola-de-sorvete")) {
                     Produto.querySelectorAll(".quantidade-sabor").forEach(span => {
                        let qtd = parseInt(span.innerText);
                        if(qtd > 0) {
                            let nomeSabor = span.closest(".d-flex.flex-column").querySelector(".sabor-nome").innerText;
                            listaAcompanhamentos.push(`${nomeSabor} (${qtd}x)`);
                        }
                     });
                } else {
                    listaAcompanhamentos = Array.from(inputsAcompanhamentos)
                        .filter(input => input.checked && input.name !== 'Ml-suco' && input.name !== 'tamanho-frango')
                        .map(input => input.nextElementSibling.innerText);
                }
                
                let listaAdicionais = Array.from(inputsAdicionais)
                    .filter(input => input.checked)
                    .map(input => input.nextElementSibling.innerText);
                    
                
                dadosProduto.acompanhamentos = listaAcompanhamentos;
                dadosProduto.adicionais = listaAdicionais;

                let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
                carrinho.push(dadosProduto);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                
                alertaAdicao.querySelector("h5").innerText = "Produto adicionado ao carrinho!";
                alertaAdicao.classList.add("alerta-ativo");
                setTimeout(() => {
                    alertaAdicao.classList.remove("alerta-ativo");
                }, 1000);

                fecharCardAberto();
            });

        }
    }
});


$(document).ready(function() {
    $(".carrosel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        speed:800,
        autoplay:true,
        touchThreshold:10,

    });
    $(".cards-açai").slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        dots: true,
        infinite: false,
        touchThreshold:10,
    });

    // Exibir preço em Reais nos cards
    const TAXA_CAMBIO = 1200;
    document.querySelectorAll('.card.produto .valor').forEach(el => {
        let valorGs = parseFloat(el.innerText.replace(/[^\d]/g, ''));
        if(!isNaN(valorGs)){
            let valorReal = valorGs / TAXA_CAMBIO;
            let div = document.createElement('div');
            div.className = "text-center text-muted small mb-2";
            div.style.marginTop = "-5px";
            div.innerText = `R$ ${valorReal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
            el.parentNode.insertBefore(div, el.nextSibling);
        }
    });
    })