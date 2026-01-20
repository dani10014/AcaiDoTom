let overlay = document.querySelector(".overlay");
let btnFecharCard = document.querySelector(".fechar-card");
let cardAcompanhamentos = document.querySelector(".card-acompanhamentos")
let horario = document.getElementById("horario");
let mensagemAberto = document.getElementById("aberto")
let mensagemFechado = document.getElementById("meuModal")
let alertaAdicao = document.querySelector(".alerta")


function atualizarHora(){

    const agora = new Date();
    
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    
    const horarioFormatado = horas + ":" + minutos;
    horario.innerHTML = horarioFormatado;

    let horaAtual = agora.getHours();
    if (horaAtual > 5 && horaAtual < 22) {
        mensagemAberto.classList.add("aberto-ativo");
        mensagemFechado.classList.remove("fechado-ativo");
    } else {
        mensagemAberto.classList.remove("aberto-ativo");
        mensagemFechado.classList.add("fechado-ativo");
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
            const imgSrc = secaoAdicionarAcompanhamento.querySelector(".carrosel img").getAttribute("src");
            const nomeProduto = secaoAdicionarAcompanhamento.querySelector(".card-title").innerHTML;
            const mlDoProduto = secaoAdicionarAcompanhamento.querySelector(".alert-info").innerHTML;
            const valorProduto = secaoAdicionarAcompanhamento.querySelector(".valor").innerHTML;
        if (secaoAdicionarAcompanhamento) {

            const elementoTitulo = secaoAdicionarAcompanhamento.querySelector(".card-title");
            const nomeProdutoCheck = (elementoTitulo.getAttribute("data-tipo") || elementoTitulo.innerText).toLowerCase();
            let modalHTML = "";
        if(nomeProdutoCheck.includes("suco")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    <img src="${imgSrc}" class="card-img-top" style="height: 120px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <h5 class="alert alert-danger text-center">Por favor selecione o tamanho do copo</h5>
                        <h5 class="text-center border-bottom pb-2">Tamanho</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="Ml-suco" type="radio" id="acompanhamento1">
                                    <label class="form-check-label" for="acompanhamento1">300 Ml</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="Ml-suco" type="radio" id="acompanhamento2">
                                    <label class="form-check-label" for="acompanhamento2">500 Ml</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="Ml-suco" type="radio" id="acompanhamento3">
                                    <label class="form-check-label" for="acompanhamento3">1 Litro</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2 invisible">
                                    <input class="form-check-input" name="Ml-suco" type="radio" id="acompanhamento3">
                                    <label class="form-check-label" for="acompanhamento3">1 Litro</label>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                            <span class="fw-bold">Total:</span>
                            <span class="fw-bold" id="preco-total">${valorProduto}</span>
                        </div>
                        <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                    </div>
                </div>`;
                }else if(nomeProdutoCheck.includes("salgadinhos")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    <img src="${imgSrc}" class="card-img-top" style="height: 120px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <h5 class="alert alert-danger text-center">Por favor selecione a quantidade de pasteis após adicionar ao seu carrinho</h5>
                        <h5 class="text-center border-bottom pb-2">Escolha o recheio</h5>
                        <div class="row text-start p-2 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="acompanhamento1">
                                    <label class="form-check-label" for="acompanhamento1">Coxinha de fr</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="acompanhamento2">
                                    <label class="form-check-label" for="acompanhamento2">Croquete de calab.</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="acompanhamento3">
                                    <label class="form-check-label" for="acompanhamento3">Bolinha de queijo</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="acompanhamento4">
                                    <label class="form-check-label" for="acompanhamento4">Kibe</label>
                                </div>
                            </div>
                            <div class="col-6 invisible">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" name="pastel-recheio" type="radio" id="acompanhamento4">
                                    <label class="form-check-label" for="acompanhamento4">Enroladinho de salsicha</label>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                            <span class="fw-bold">Total:</span>
                            <span class="fw-bold" id="preco-total">${valorProduto}</span>
                        </div>
                        <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                    </div>
                </div>`;
                }else if(nomeProdutoCheck.includes("salgado")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    <img src="${imgSrc}" class="card-img-top" style="height: 120px; object-fit: cover;">
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
                        <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                            <span class="fw-bold">Total:</span>
                            <span class="fw-bold" id="preco-total">${valorProduto}</span>
                        </div>
                        <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                    </div>
                </div>`;
            }else if(nomeProdutoCheck.includes("sabor-unico")){
                    let produtoSelecionado = secaoAdicionarAcompanhamento;
                    
                    let listaIngredientes = Array.from(produtoSelecionado.querySelectorAll("ul li"))
                        .map(li => li.innerText);

                    let dadosProduto = {
                        nome:produtoSelecionado.querySelector(".card-title").innerHTML,
                        ml:produtoSelecionado.querySelector(".alert-info").innerText,
                        preco:produtoSelecionado.querySelector(".valor").innerText,
                        imagem:produtoSelecionado.querySelector(".carrosel img").getAttribute("src"),
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
            }else if(nomeProdutoCheck.includes("completo")){
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    <img src="${imgSrc}" class="card-img-top" style="height: 120px; object-fit: cover;">
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
                        <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                            <span class="fw-bold">Total:</span>
                            <span class="fw-bold" id="preco-total">${valorProduto}</span>
                        </div>
                        <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
                    </div>
                </div>`;
            }else{
                modalHTML = `
                <div class="card text-white" style="background-color: rgb(75, 0, 119);">
                    <img src="${imgSrc}" class="card-img-top" style="height: 120px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
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
                        <div class="d-flex justify-content-between align-items-center alert alert-info mt-3 mb-3">
                            <span class="fw-bold">Total:</span>
                            <span class="fw-bold" id="preco-total">${valorProduto}</span>
                        </div>
                        <button class="btn btn-primary w-100 mt-3 btn-confirmar">Adicionar ao carrinho</button>
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

            inputsExtras.forEach(input => {
                input.addEventListener('change', () => {
                    let total = precoBase;
                    inputsExtras.forEach(i => {
                        if (i.checked) {
                            const textoPreco = i.closest('.d-flex').querySelector('.alert-info').innerText;
                            total += parseValor(textoPreco);
                        }
                    });
                    displayTotal.innerText = total + " Gs";
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

                let inputsAcompanhamentos = Produto.querySelectorAll(".form-check-input:not(.input-adicionais)");
                let inputsAdicionais = Produto.querySelectorAll(".input-adicionais");

                let dadosProduto = {
                    imagem: Produto.querySelector(".card-img-top").getAttribute("src"),
                    nome: Produto.querySelector(".card-title").innerHTML,
                    ml: Produto.querySelector(".alert-info").innerHTML,
                    preco: Produto.querySelector("#preco-total").innerText
                }

                let listaAcompanhamentos = Array.from(inputsAcompanhamentos)
                    .filter(input => input.checked)
                    .map(input => input.nextElementSibling.innerText);
                
                let listaAdicionais = Array.from(inputsAdicionais)
                    .filter(input => input.checked)
                    .map(input => input.nextElementSibling.innerText);
                    
                
                dadosProduto.acompanhamentos = listaAcompanhamentos;
                dadosProduto.adicionais = listaAdicionais;

                let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
                carrinho.push(dadosProduto);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                
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

    });
    $(".cards-açai").slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        dots: true,
        infinite: false,
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