let overlay = document.querySelector(".overlay");
let btnFecharCard = document.querySelector(".fechar-card");
let cardAcompanhamentos = document.querySelector(".card-acompanhamentos")

function fecharCardAberto() {
    cardAcompanhamentos.classList.remove("acompanhamentos-ativo");
    cardAcompanhamentos.innerHTML = ""; // Limpa o conteúdo ao fechar
    overlay.classList.remove("overlay-ativo");
    btnFecharCard.classList.remove("btn-ativo-card");
}

document.addEventListener("click", function (event) {
    if (event.target.matches(".adicionar-carrinho")) {
        const secaoAdicionarAcompanhamento = event.target.closest(".card");
        if (secaoAdicionarAcompanhamento) {
            const imgSrc = secaoAdicionarAcompanhamento.querySelector(".carrosel img").getAttribute("src");
            const nomeProduto = secaoAdicionarAcompanhamento.querySelector(".card-title").innerHTML;
            const mlDoProduto = secaoAdicionarAcompanhamento.querySelector(".alert-info").innerHTML;
            cardAcompanhamentos.classList.add("acompanhamentos-ativo");
            overlay.classList.add("overlay-ativo");
            btnFecharCard.classList.add("btn-ativo-card");
            cardAcompanhamentos.innerHTML = `
                <div class="card text-white h-100" style="background-color: rgb(75, 0, 119);">
                    <img src="${imgSrc}" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title text-center">${nomeProduto}</h5>
                        <p class="alert alert-info text-center small">${mlDoProduto}</p>
                        <h2 class="text-center border-bottom pb-2">Escolha seus acompanhamentos</h2>
                        <div class="row text-start p-3 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
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
                                    <input class="form-check-input" type="checkbox" id="acompanhamento3">
                                    <label class="form-check-label" for="acompanhamento3">Uva</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento4">
                                    <label class="form-check-label" for="acompanhamento4">Amendoim</label>
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
                                    <label class="form-check-label" for="acompanhamento6">Leite</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento7">
                                    <label class="form-check-label" for="acompanhamento7">Leite cond.</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento8">
                                    <label class="form-check-label" for="acompanhamento8">Gotas Chocolate</label>
                                </div>
                            </div>
                        </div>
                        <h2 class="mt-3 mb-3">Adicionais</h2>
                        <div class="row text-start p-3 justify-content-center" style="background-color: rgb(255, 255, 255); color:black; border-radius:10px;">
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
                                    <input class="form-check-input" type="checkbox" id="acompanhamento3">
                                    <label class="form-check-label" for="acompanhamento3">Uva</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento4">
                                    <label class="form-check-label" for="acompanhamento4">Amendoim</label>
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
                                    <label class="form-check-label" for="acompanhamento6">Leite</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento7">
                                    <label class="form-check-label" for="acompanhamento7">Leite cond.</label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="acompanhamento8">
                                    <label class="form-check-label" for="acompanhamento8">Gotas Chocolate</label>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary w-100 mt-3">Adicionar ao carrinho</button>
                    </div>
                </div>`;
        }
    }
});


btnFecharCard.addEventListener('click', fecharCardAberto);
overlay.addEventListener('click', fecharCardAberto);

$(document).ready(function() {
    $(".carrosel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
    });
    $(".cards-açai").slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        dots: true,
        infinite: false,
    });

    })