// ============================================================
// GUIA MIRANDA/MS
// Sem banco de dados.
// Os locais ficam neste arquivo e o Maps faz a localização.
// ============================================================


const locais = [

    {
        id: 1,

        nome: "Hotel Miranda",

        categoria: "Hospedagem",

        endereco:
            "Rua Firmo Dutra, 45 - Miranda/MS",

        descricao:
            "Hotel localizado em Miranda, Mato Grosso do Sul.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    },


    {
        id: 2,

        nome: "Pousada Capitão Leno",

        categoria: "Hospedagem",

        endereco:
            "BR-262, Km 543,5 - Miranda/MS",

        descricao:
            "Pousada localizada na região de Miranda.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    },


    {
        id: 3,

        nome: "Refúgio Ecológico Caiman",

        categoria: "Ecoturismo",

        endereco:
            "Estância Caiman - Miranda/MS",

        descricao:
            "Destino de ecoturismo localizado no Pantanal de Miranda.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    },


    {
        id: 4,

        nome: "San Francisco",

        categoria: "Ecoturismo",

        endereco:
            "Miranda/MS",

        descricao:
            "Destino turístico relacionado ao Pantanal e ao ecoturismo.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    },


    {
        id: 5,

        nome: "Refúgio da Ilha",

        categoria: "Ecoturismo",

        endereco:
            "Região de Miranda/MS",

        descricao:
            "Destino de natureza localizado na região de Miranda.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    },


    {
        id: 6,

        nome: "Pousada Beira Rio",

        categoria: "Hospedagem",

        endereco:
            "Miranda/MS",

        descricao:
            "Pousada localizada na região turística de Miranda.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    },


    {
        id: 7,

        nome: "Morro do Azeite Ecolodge",

        categoria: "Ecoturismo",

        endereco:
            "Miranda/MS",

        descricao:
            "Ecolodge relacionado ao turismo de natureza da região.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    },


    {
        id: 8,

        nome: "Pousada Pioneiro",

        categoria: "Hospedagem",

        endereco:
            "Miranda/MS",

        descricao:
            "Pousada localizada no município de Miranda.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    },


    {
        id: 9,

        nome: "Pousada Águas do Miranda",

        categoria: "Ecoturismo",

        endereco:
            "Miranda/MS",

        descricao:
            "Destino turístico ligado à natureza da região.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    },


    {
        id: 10,

        nome: "Rota 21 Chopperia & Hamburgueria Gourmet",

        categoria: "Gastronomia",

        endereco:
            "Miranda/MS",

        descricao:
            "Estabelecimento de alimentação localizado em Miranda.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    },


    {
        id: 11,

        nome: "Estação Ferroviária de Miranda",

        categoria: "Cultura",

        endereco:
            "Miranda/MS",

        descricao:
            "Local relacionado à história ferroviária e à cultura de Miranda.",

        fonte:
            "https://turismo.miranda.ms.gov.br/"
    }

];


// ============================================================
// NAVEGAÇÃO
// ============================================================

function irPara(id) {

    document
        .querySelectorAll(".pagina")
        .forEach(function (pagina) {

            pagina.classList.remove("ativa");

        });


    const pagina =
        document.getElementById(id);


    if (pagina) {

        pagina.classList.add("ativa");

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ============================================================
// GOOGLE MAPS
// ============================================================

function gerarLinkMaps(local) {

    const pesquisa =
        encodeURIComponent(
            local.nome +
            ", " +
            local.endereco +
            ", Miranda MS"
        );


    return (
        "https://www.google.com/maps/search/?api=1&query=" +
        pesquisa
    );

}


// ============================================================
// SEGURANÇA
// ============================================================

function escapar(texto) {

    const elemento =
        document.createElement("div");


    elemento.textContent =
        texto ?? "";


    return elemento.innerHTML;

}


// ============================================================
// MOSTRAR LUGARES
// ============================================================

function mostrarLocais(lista) {

    const container =
        document.getElementById(
            "lista-lugares"
        );


    const contador =
        document.getElementById(
            "contador"
        );


    if (!container) return;


    if (contador) {

        contador.textContent =
            lista.length +
            (
                lista.length === 1
                    ? " lugar encontrado"
                    : " lugares encontrados"
            );

    }


    container.innerHTML = "";


    if (lista.length === 0) {

        container.innerHTML = `

            <div class="vazio">

                <h3>
                    Nenhum lugar encontrado
                </h3>

                <p>
                    Tente pesquisar por outro nome
                    ou categoria.
                </p>

            </div>

        `;

        return;

    }


    lista.forEach(function (local) {

        const card =
            document.createElement("article");


        card.className =
            "lugar-card";


        card.innerHTML = `

            <span class="badge">

                ${escapar(local.categoria)}

            </span>


            <h3>

                ${escapar(local.nome)}

            </h3>


            <p class="endereco-card">

                📍 ${escapar(local.endereco)}

            </p>


            <p>

                ${escapar(local.descricao)}

            </p>


            <div class="acoes-card">

                <button
                    class="btn btn-pequeno"
                    onclick="abrirDetalhes(${local.id})"
                >

                    Ver detalhes

                </button>


                <a
                    class="btn btn-secundario btn-pequeno"
                    href="${gerarLinkMaps(local)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >

                    📍 Maps

                </a>

            </div>

        `;


        container.appendChild(card);

    });

}


// ============================================================
// FILTROS
// ============================================================

function aplicarFiltros() {

    const texto =
        document
            .getElementById("searchInput")
            .value
            .trim()
            .toLowerCase();


    const categoria =
        document
            .getElementById("categoriaSelect")
            .value;


    const resultados =
        locais.filter(function (local) {


            const textoEncontrado =

                !texto ||

                local.nome
                    .toLowerCase()
                    .includes(texto) ||

                local.categoria
                    .toLowerCase()
                    .includes(texto) ||

                local.endereco
                    .toLowerCase()
                    .includes(texto);


            const categoriaEncontrada =

                categoria === "Todos" ||

                local.categoria === categoria;


            return (
                textoEncontrado &&
                categoriaEncontrada
            );

        });


    mostrarLocais(resultados);

}


// ============================================================
// PESQUISA DA HOME
// ============================================================

function pesquisarInicio() {

    const texto =
        document
            .getElementById("homeSearch")
            .value
            .trim();


    document
        .getElementById("searchInput")
        .value = texto;


    document
        .getElementById("categoriaSelect")
        .value = "Todos";


    irPara("lugares");


    aplicarFiltros();

}


// ============================================================
// CATEGORIA
// ============================================================

function filtrarCategoria(categoria) {

    document
        .getElementById("searchInput")
        .value = "";


    document
        .getElementById("categoriaSelect")
        .value = categoria;


    irPara("lugares");


    aplicarFiltros();

}


// ============================================================
// LIMPAR
// ============================================================

function limparFiltros() {

    document
        .getElementById("searchInput")
        .value = "";


    document
        .getElementById("categoriaSelect")
        .value = "Todos";


    mostrarLocais(locais);

}


// ============================================================
// DETALHES
// ============================================================

function abrirDetalhes(id) {

    const local =
        locais.find(function (item) {

            return item.id === id;

        });


    if (!local) return;


    document
        .getElementById("detCategoria")
        .textContent =
            local.categoria;


    document
        .getElementById("detNome")
        .textContent =
            local.nome;


    document
        .getElementById("detEndereco")
        .textContent =
            "📍 " + local.endereco;


    document
        .getElementById("detDescricao")
        .textContent =
            local.descricao;


    document
        .getElementById("botaoMaps")
        .onclick = function () {

            window.open(
                gerarLinkMaps(local),
                "_blank"
            );

        };


    document
        .getElementById("botaoFonte")
        .href =
            local.fonte;


    irPara("detalhes");

}


// ============================================================
// CONTRASTE
// ============================================================

function alternarContraste() {

    document
        .body
        .classList
        .toggle("contraste");


    const ativo =
        document
            .body
            .classList
            .contains("contraste");


    localStorage.setItem(
        "contraste",
        ativo ? "1" : "0"
    );

}


// ============================================================
// INICIALIZAÇÃO
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        if (
            localStorage.getItem(
                "contraste"
            ) === "1"
        ) {

            document
                .body
                .classList
                .add("contraste");

        }


        document
            .getElementById("homeSearch")
            .addEventListener(
                "keydown",
                function (evento) {

                    if (
                        evento.key === "Enter"
                    ) {

                        pesquisarInicio();

                    }

                }
            );


        mostrarLocais(locais);

    }
);
