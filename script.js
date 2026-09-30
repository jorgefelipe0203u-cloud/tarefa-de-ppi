// =========================================================
// CONFIGURAÇÃO
// =========================================================

let locais = [];
let localAtual = null;


// =========================================================
// NAVEGAÇÃO
// =========================================================

function nav(view) {

    document.querySelectorAll(".view").forEach(elemento => {
        elemento.classList.remove("active");
    });

    const pagina = document.getElementById(view);

    if (pagina) {
        pagina.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =========================================================
// CARREGAR LOCAIS
// =========================================================

async function carregarLocais(parametros = "") {

    try {

        const resposta = await fetch(
            "/api/locais" + parametros
        );

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o servidor.");
        }

        locais = await resposta.json();

        mostrarLocais(locais);

    } catch (erro) {

        console.error(erro);

        const grid =
            document.getElementById("results-grid");

        if (grid) {

            grid.innerHTML = `
                <div class="alert">
                    Não foi possível carregar os locais.
                    Verifique se o servidor Python está funcionando.
                </div>
            `;
        }
    }
}


// =========================================================
// MOSTRAR LOCAIS
// =========================================================

function mostrarLocais(lista) {

    const grid =
        document.getElementById("results-grid");

    if (!grid) return;

    grid.innerHTML = "";

    if (lista.length === 0) {

        grid.innerHTML = `
            <div class="alert">
                Nenhum local encontrado.
            </div>
        `;

        return;
    }

    lista.forEach(local => {

        const card = document.createElement("article");

        card.className = "card";

        card.innerHTML = `
            <h3>${escapar(local.nome)}</h3>

            <p>
                <strong>Categoria:</strong>
                ${escapar(local.categoria)}
            </p>

            <p>
                ${escapar(local.endereco || "")}
            </p>

            <div class="tags">

                ${local.rampa ? '<span class="tag">♿ Rampa</span>' : ""}

                ${local.banheiro ? '<span class="tag">🚻 Banheiro acessível</span>' : ""}

                ${local.vaga ? '<span class="tag">🅿️ Vaga</span>' : ""}

            </div>

            <button
                class="btn"
                onclick="abrirDetalhes(${local.id})"
            >
                Ver detalhes
            </button>
        `;

        grid.appendChild(card);
    });
}


// =========================================================
// PESQUISA
// =========================================================

function filterLocais(texto) {

    texto = texto.trim();

    const input =
        document.getElementById("searchInput");

    if (input) {
        input.value = texto;
    }

    nav("search");

    const parametros =
        texto
            ? "?q=" + encodeURIComponent(texto)
            : "";

    carregarLocais(parametros);
}


// =========================================================
// FILTRO POR CATEGORIA
// =========================================================

function filterCat(categoria) {

    nav("search");

    carregarLocais(
        "?categoria=" +
        encodeURIComponent(categoria)
    );
}


// =========================================================
// FILTROS DE ACESSIBILIDADE
// =========================================================

function filterCheck() {

    const input =
        document.getElementById("searchInput");

    const texto =
        input ? input.value.trim() : "";

    const rampa =
        document.getElementById("chkRampa")?.checked;

    const banheiro =
        document.getElementById("chkBanheiro")?.checked;

    const vaga =
        document.getElementById("chkVaga")?.checked;

    const parametros = new URLSearchParams();

    if (texto) {
        parametros.set("q", texto);
    }

    if (rampa) {
        parametros.set("rampa", "1");
    }

    if (banheiro) {
        parametros.set("banheiro", "1");
    }

    if (vaga) {
        parametros.set("vaga", "1");
    }

    carregarLocais(
        "?" + parametros.toString()
    );
}


// =========================================================
// LIMPAR FILTROS
// =========================================================

function resetFilters() {

    const input =
        document.getElementById("searchInput");

    if (input) {
        input.value = "";
    }

    ["chkRampa", "chkBanheiro", "chkVaga"]
        .forEach(id => {

            const elemento =
                document.getElementById(id);

            if (elemento) {
                elemento.checked = false;
            }
        });

    carregarLocais();
}


// =========================================================
// DETALHES
// =========================================================

function abrirDetalhes(id) {

    const local =
        locais.find(item => item.id === id);

    if (!local) return;

    localAtual = local;

    nav("details");

    const titulo =
        document.getElementById("det-title");

    const endereco =
        document.getElementById("det-address");

    const tags =
        document.getElementById("det-tags");

    if (titulo) {
        titulo.textContent = local.nome;
    }

    if (endereco) {
        endereco.textContent =
            local.endereco || "Endereço não informado";
    }

    if (tags) {

        tags.innerHTML = "";

        if (local.rampa) {
            tags.innerHTML +=
                '<span class="tag">♿ Rampa</span>';
        }

        if (local.banheiro) {
            tags.innerHTML +=
                '<span class="tag">🚻 Banheiro acessível</span>';
        }

        if (local.vaga) {
            tags.innerHTML +=
                '<span class="tag">🅿️ Vaga acessível</span>';
        }
    }

    configurarBotoes(local);

    mostrarAvaliacoes(local);
}


// =========================================================
// MAPA E WHATSAPP
// =========================================================

function configurarBotoes(local) {

    const mapa =
        document.getElementById("btnMap");

    const whatsapp =
        document.getElementById("btnZap");

    if (mapa) {

        mapa.onclick = function() {

            const endereco =
                encodeURIComponent(
                    local.endereco || local.nome + " Miranda MS"
                );

            window.open(
                "https://www.google.com/maps/search/?api=1&query=" +
                endereco,
                "_blank"
            );
        };
    }

    if (whatsapp) {

        whatsapp.onclick = function() {

            if (!local.whatsapp) {
                alert("WhatsApp não informado.");
                return;
            }

            const numero =
                local.whatsapp.replace(/\D/g, "");

            window.open(
                "https://wa.me/" + numero,
                "_blank"
            );
        };
    }
}


// =========================================================
// AVALIAÇÕES
// =========================================================

function mostrarAvaliacoes(local) {

    const lista =
        document.getElementById("review-list");

    if (!lista) return;

    lista.innerHTML = "";

    if (
        !local.avaliacoes ||
        local.avaliacoes.length === 0
    ) {

        lista.innerHTML = `
            <p>
                Ainda não existem avaliações para este local.
            </p>
        `;

        return;
    }

    local.avaliacoes.forEach(avaliacao => {

        const div =
            document.createElement("div");

        div.className = "review";

        div.innerHTML = `
            <strong>
                ${escapar(avaliacao.nome)}
            </strong>

            <p>
                ${escapar(avaliacao.mensagem)}
            </p>

            <small>
                ${"★".repeat(avaliacao.nota)}
                ${"☆".repeat(5 - avaliacao.nota)}
            </small>
        `;

        lista.appendChild(div);
    });
}


// =========================================================
// ADICIONAR AVALIAÇÃO
// =========================================================

async function addReview() {

    if (!localAtual) {
        alert("Nenhum local selecionado.");
        return;
    }

    const nome =
        document.getElementById("userName")?.value.trim();

    const mensagem =
        document.getElementById("userMsg")?.value.trim();

    if (!nome || !mensagem) {

        alert(
            "Preencha seu nome e sua avaliação."
        );

        return;
    }

    try {

        const resposta = await fetch(
            "/api/avaliacoes",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    local_id: localAtual.id,
                    nome: nome,
                    mensagem: mensagem,
                    nota: 5
                })
            }
        );

        const dados =
            await resposta.json();

        if (!resposta.ok || !dados.sucesso) {

            alert(
                dados.erro ||
                "Não foi possível enviar a avaliação."
            );

            return;
        }

        alert("Avaliação publicada!");

        document.getElementById("userName").value = "";
        document.getElementById("userMsg").value = "";

        await carregarLocais();

        const atualizado =
            locais.find(
                item => item.id === localAtual.id
            );

        if (atualizado) {

            localAtual = atualizado;

            mostrarAvaliacoes(localAtual);
        }

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível conectar ao servidor."
        );
    }
}


// =========================================================
// ALTO CONTRASTE
// =========================================================

function toggleContrast() {

    document.body.classList.toggle("hc");

    const ativo =
        document.body.classList.contains("hc");

    localStorage.setItem(
        "altoContraste",
        ativo ? "1" : "0"
    );
}


// =========================================================
// COOKIES / PREFERÊNCIAS
// =========================================================

function acceptCookies() {

    localStorage.setItem(
        "cookiesAceitos",
        "1"
    );

    const banner =
        document.getElementById("cookie-banner");

    if (banner) {
        banner.style.display = "none";
    }
}


// =========================================================
// ESCAPAR HTML
// =========================================================

function escapar(valor) {

    const elemento =
        document.createElement("div");

    elemento.textContent =
        valor ?? "";

    return elemento.innerHTML;
}


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // Alto contraste salvo
        if (
            localStorage.getItem("altoContraste") === "1"
        ) {
            document.body.classList.add("hc");
        }

        // Cookie
        if (
            localStorage.getItem("cookiesAceitos") === "1"
        ) {

            const banner =
                document.getElementById("cookie-banner");

            if (banner) {
                banner.style.display = "none";
            }
        }

        // Carrega locais
        carregarLocais();
    }
);
