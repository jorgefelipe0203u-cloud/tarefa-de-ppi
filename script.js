/* =========================================================
   GUIA MIRANDA/MS
   Sem banco de dados
========================================================= */


/* =========================================================
   DADOS DOS LOCAIS
========================================================= */

const locais = [

    {
        id: 1,

        nome: "Hotel Miranda",

        categoria: "Hospedagem",

        endereco: "Miranda/MS",

        descricao:
            "Opção de hospedagem localizada no município de Miranda/MS.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    },


    {
        id: 2,

        nome: "Pousada Capitão Leno",

        categoria: "Hospedagem",

        endereco: "Miranda/MS",

        descricao:
            "Opção de hospedagem na região de Miranda/MS.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    },


    {
        id: 3,

        nome: "Refúgio Ecológico Caiman",

        categoria: "Ecoturismo",

        endereco: "Região de Miranda/MS",

        descricao:
            "Destino relacionado ao ecoturismo e à observação da natureza.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    },


    {
        id: 4,

        nome: "San Francisco",

        categoria: "Ecoturismo",

        endereco: "Região de Miranda/MS",

        descricao:
            "Local relacionado ao turismo de natureza na região de Miranda.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    },


    {
        id: 5,

        nome: "Refúgio da Ilha",

        categoria: "Ecoturismo",

        endereco: "Região de Miranda/MS",

        descricao:
            "Opção de turismo e contato com a natureza na região.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    },


    {
        id: 6,

        nome: "Pousada Beira Rio",

        categoria: "Hospedagem",

        endereco: "Miranda/MS",

        descricao:
            "Opção de hospedagem na região de Miranda.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    },


    {
        id: 7,

        nome: "Morro do Azeite Ecolodge",

        categoria: "Ecoturismo",

        endereco: "Região de Miranda/MS",

        descricao:
            "Local relacionado ao ecoturismo e hospedagem na região.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    },


    {
        id: 8,

        nome: "Pousada Pioneiro",

        categoria: "Hospedagem",

        endereco: "Miranda/MS",

        descricao:
            "Opção de hospedagem no município de Miranda/MS.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    },


    {
        id: 9,

        nome: "Pousada Águas do Miranda",

        categoria: "Ecoturismo",

        endereco: "Região de Miranda/MS",

        descricao:
            "Opção relacionada ao turismo e à natureza na região de Miranda.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    },


    {
        id: 10,

        nome: "Rota 21 Chopperia & Hamburgueria Gourmet",

        categoria: "Gastronomia",

        endereco: "Miranda/MS",

        descricao:
            "Estabelecimento de alimentação localizado em Miranda/MS.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    },


    {
        id: 11,

        nome: "Estação Ferroviária de Miranda",

        categoria: "Cultura",

        endereco: "Miranda/MS",

        descricao:
            "Local de interesse histórico e cultural de Miranda/MS.",

        fonte:
            "https://turismo.miranda.ms.gov.br/",

        acessibilidade: {
            rampa: false,
            banheiro: false,
            vaga: false,
            entrada: false
        }
    }

];


/* =========================================================
   ELEMENTOS
========================================================= */

const listaLugares =
    document.getElementById("lista-lugares");

const detalhes =
    document.getElementById("detalhes");

const semResultados =
    document.getElementById("semResultados");


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    mostrarLocais(locais);

});


/* =========================================================
   MOSTRAR LOCAIS
========================================================= */

function mostrarLocais(lista) {

    listaLugares.innerHTML = "";

    if (lista.length === 0) {

        semResultados.hidden = false;

        return;
    }

    semResultados.hidden = true;


    lista.forEach(local => {

        const card =
            document.createElement("article");

        card.className = "card-local";


        card.innerHTML = `

            <span class="card-categoria">
                ${local.categoria}
            </span>

            <h3>
                ${local.nome}
            </h3>

            <p class="card-endereco">
                📍 ${local.endereco}
            </p>

            <p class="card-descricao">
                ${local.descricao}
            </p>

            <div class="tags-acessibilidade">

                ${criarTag(
                    "♿ Rampa",
                    local.acessibilidade.rampa
                )}

                ${criarTag(
                    "🚻 Banheiro",
                    local.acessibilidade.banheiro
                )}

                ${criarTag(
                    "🅿️ Vaga PCD",
                    local.acessibilidade.vaga
                )}

                ${criarTag(
                    "🚪 Entrada",
                    local.acessibilidade.entrada
                )}

            </div>

            <button
                type="button"
                class="btn-ver-detalhes"
                onclick="abrirDetalhes(${local.id})"
            >
                Ver detalhes
            </button>

        `;


        listaLugares.appendChild(card);

    });

}


/* =========================================================
   TAGS DE ACESSIBILIDADE
========================================================= */

function criarTag(nome, disponivel) {

    if (disponivel) {

        return `
            <span class="tag-acessibilidade disponivel">
                ${nome} ✓
            </span>
        `;

    }


    return `
        <span class="tag-acessibilidade">
            ${nome}
        </span>
    `;
}


/* =========================================================
   FILTROS
========================================================= */

function atualizarResultados() {

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


    const filtroRampa =
        document
            .getElementById("filtroRampa")
            .checked;


    const filtroBanheiro =
        document
            .getElementById("filtroBanheiro")
            .checked;


    const filtroVaga =
        document
            .getElementById("filtroVaga")
            .checked;


    const filtroEntrada =
        document
            .getElementById("filtroEntrada")
            .checked;


    const resultado =
        locais.filter(local => {

            /* Pesquisa */

            const correspondeTexto =
                local.nome
                    .toLowerCase()
                    .includes(texto) ||

                local.categoria
                    .toLowerCase()
                    .includes(texto) ||

                local.endereco
                    .toLowerCase()
                    .includes(texto);


            if (!correspondeTexto) {
                return false;
            }


            /* Categoria */

            if (
                categoria !== "Todos" &&
                local.categoria !== categoria
            ) {

                return false;

            }


            /* Rampa */

            if (
                filtroRampa &&
                !local.acessibilidade.rampa
            ) {

                return false;

            }


            /* Banheiro */

            if (
                filtroBanheiro &&
                !local.acessibilidade.banheiro
            ) {

                return false;

            }


            /* Vaga */

            if (
                filtroVaga &&
                !local.acessibilidade.vaga
            ) {

                return false;

            }


            /* Entrada */

            if (
                filtroEntrada &&
                !local.acessibilidade.entrada
            ) {

                return false;

            }


            return true;

        });


    mostrarLocais(resultado);

}


/* =========================================================
   FILTRO POR CATEGORIA
========================================================= */

function filtrarCategoria(categoria) {

    document
        .getElementById("categoriaSelect")
        .value = categoria;


    irParaLugares();

    atualizarResultados();

}


/* =========================================================
   PESQUISA DA PÁGINA INICIAL
========================================================= */

function pesquisarInicio() {

    const texto =
        document
            .getElementById("homeSearch")
            .value;


    document
        .getElementById("searchInput")
        .value = texto;


    irParaLugares();

    atualizarResultados();

}


/* =========================================================
   LIMPAR FILTROS
========================================================= */

function limparFiltros() {

    document
        .getElementById("homeSearch")
        .value = "";


    document
        .getElementById("searchInput")
        .value = "";


    document
        .getElementById("categoriaSelect")
        .value = "Todos";


    document
        .getElementById("filtroRampa")
        .checked = false;


    document
        .getElementById("filtroBanheiro")
        .checked = false;


    document
        .getElementById("filtroVaga")
        .checked = false;


    document
        .getElementById("filtroEntrada")
        .checked = false;


    mostrarLocais(locais);

}


/* =========================================================
   DETALHES DO LOCAL
========================================================= */

function abrirDetalhes(id) {

    const local =
        locais.find(item => item.id === id);


    if (!local) {
        return;
    }


    document
        .getElementById("detCategoria")
        .textContent = local.categoria;


    document
        .getElementById("detNome")
        .textContent = local.nome;


    document
        .getElementById("detEndereco")
        .textContent =
            "📍 " + local.endereco;


    document
        .getElementById("detDescricao")
        .textContent =
            local.descricao;


    /* Acessibilidade */

    const acessibilidade =
        document.getElementById(
            "detAcessibilidade"
        );


    acessibilidade.innerHTML = `

        ${criarDetalheAcessibilidade(
            "♿ Rampa de acesso",
            local.acessibilidade.rampa
        )}

        ${criarDetalheAcessibilidade(
            "🚻 Banheiro acessível",
            local.acessibilidade.banheiro
        )}

        ${criarDetalheAcessibilidade(
            "🅿️ Vaga PCD",
            local.acessibilidade.vaga
        )}

        ${criarDetalheAcessibilidade(
            "🚪 Entrada acessível",
            local.acessibilidade.entrada
        )}

    `;


    /* Google Maps */

    const consulta =
        encodeURIComponent(
            `${local.nome}, ${local.endereco}`
        );


    document
        .getElementById("btnMaps")
        .href =
            `https://www.google.com/maps/search/?api=1&query=${consulta}`;


    /* Fonte */

    document
        .getElementById("btnFonte")
        .href =
            local.fonte;


    /* Trocar telas */

    document
        .getElementById("lugares")
        .hidden = true;


    document
        .getElementById("detalhes")
        .hidden = false;


    document
        .getElementById("semResultados")
        .hidden = true;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   DETALHE DE ACESSIBILIDADE
========================================================= */

function criarDetalheAcessibilidade(
    nome,
    disponivel
) {

    if (disponivel) {

        return `
            <div class="det-acessibilidade-item disponivel">
                ${nome} — disponível ✓
            </div>
        `;

    }


    return `
        <div class="det-acessibilidade-item">
            ${nome} — não confirmado
        </div>
    `;

}


/* =========================================================
   VOLTAR PARA LISTA
========================================================= */

function voltarParaLista() {

    document
        .getElementById("detalhes")
        .hidden = true;


    document
        .getElementById("lugares")
        .hidden = false;


    irParaLugares();

}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

function irParaInicio() {

    document
        .getElementById("detalhes")
        .hidden = true;


    document
        .getElementById("lugares")
        .hidden = false;


    document
        .getElementById("inicio")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function irParaLugares() {

    document
        .getElementById("detalhes")
        .hidden = true;


    document
        .getElementById("lugares")
        .hidden = false;


    document
        .getElementById("lugares")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   ALTO CONTRASTE
========================================================= */

function alternarContraste() {

    document
        .body
        .classList
        .toggle("contraste");


    const ativado =
        document
            .body
            .classList
            .contains("contraste");


    const botao =
        document.getElementById(
            "btnContraste"
        );


    if (ativado) {

        botao.textContent =
            "☀️ Contraste normal";

    } else {

        botao.textContent =
            "👁️ Alto contraste";

    }

}
