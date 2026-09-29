// Base de Dados de Locais Reais em Miranda/MS com Foco em Acessibilidade
const locais = [
    {
        id: "estacao-ferroviaria",
        nome: "Estação Ferroviária de Miranda (Museu)",
        cat: "História",
        img: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=500&q=80",
        tags: ["Rampa", "Banheiro PCD", "Vaga PCD", "Piso Tátil"],
        end: "Rua Elias Rezek, s/n - Centro, Miranda - MS",
        tel: "(67) 3242-1100",
        alert: "⚠️ Rampa de acesso na lateral do museu. Recomenda-se acompanhante no trecho do pátio de paralelepípedos.",
        desc: "Prédio histórico tombado da ferrovia do Pantanal. Possui acervo sobre a história do trem, artesanato Terena e espaço para exposições culturais."
    },
    {
        id: "usina-santo-antonio",
        nome: "Ruínas da Usina Açucareira Santo Antônio",
        cat: "História",
        img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
        tags: ["Vaga PCD"],
        end: "BR-262, Km 560 - Zona Rural, Miranda - MS",
        tel: "N/A",
        alert: "⚠️ Local histórico ao ar livre em ruínas. Possui terreno plano de terra batida e grama.",
        desc: "Patrimônio Cultural Nacional tombado em 2007. Marco da era industrial açucareira da década de 1930 no Pantanal."
    },
    {
        id: "refugio-caiman",
        nome: "Refúgio Ecológico Caiman",
        cat: "Ecoturismo",
        img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
        tags: ["Rampa", "Banheiro PCD", "Vaga PCD", "Quarto Adaptado"],
        end: "Estrada Agachi, s/n - Zona Rural, Miranda - MS",
        tel: "(67) 3242-1450",
        alert: "✅ Instalações adaptadas na sede principal e pousadas com suítes acessíveis para cadeirantes.",
        desc: "Referência mundial em ecoturismo e conservação da Onça-Pintada (Projeto Onçafari). Oferece safáris fotográficos e hospedagem de alto padrão."
    },
    {
        id: "fazenda-san-francisco",
        nome: "Fazenda San Francisco Agro Ecoturismo",
        cat: "Ecoturismo",
        img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80",
        tags: ["Rampa", "Banheiro PCD", "Vaga PCD"],
        end: "BR-262, Km 583 - Pantanal de Miranda - MS",
        tel: "(67) 3242-1080",
        alert: "✅ Passeio de Chalana possui acesso plano e deck adaptado no Corixo São Domingos.",
        desc: "Oferece Day Use completo com Safári Fotográfico, Passeio de Chalana, Focagem Noturna e Almoço Pantaneiro na trempe."
    },
    {
        id: "pousada-pioneiro",
        nome: "Pousada Pioneiro & Noite Pantaneira",
        cat: "Gastronomia",
        img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
        tags: ["Rampa", "Banheiro PCD", "Vaga PCD"],
        end: "BR-262, Km 504 - Miranda - MS",
        tel: "(67) 3242-1471",
        alert: "✅ Salão de refeições 100% no nível térreo e ambiente adaptado para cadeirantes.",
        desc: "Famosa pela celebração da Noite Pantaneira com Comida de Comitiva, apresentações culturais Terena, música de viola e causos do Pantanal."
    },
    {
        id: "aldeia-passarinho",
        nome: "Centro Cultural Terena - Aldeia Passarinho",
        cat: "Cultura",
        img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500&q=80",
        tags: ["Rampa", "Banheiro PCD"],
        end: "Território Indígena Terena, próximo ao Centro - Miranda - MS",
        tel: "(67) 3242-1200",
        alert: "✅ Galpão de artesanato com piso plano sem degraus de acesso.",
        desc: "Espaço cultural da etnia Terena focado no artesanato em cerâmica, tecelagem e resgate da memória indígena de Miranda."
    },
    {
        id: "rio-salobra",
        nome: "Encontro dos Rios Miranda e Salobra (Projeto Salobra)",
        cat: "Ecoturismo",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80",
        tags: ["Rampa", "Banheiro PCD"],
        end: "Distrito de Salobra, Miranda - MS",
        tel: "(67) 99988-1234",
        alert: "⚠️ Deck de embarque com rampa suave. Requer auxílio dos monitores no embarque dos barcos.",
        desc: "Passeios de barco no rio de águas cristalinas Salobra, observação de aves, peixes e fauna ribeirinha do Pantanal."
    },
    {
        id: "restaurante-pantanal",
        nome: "Restaurante & Peixaria Pantanal",
        cat: "Gastronomia",
        img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
        tags: ["Rampa", "Banheiro PCD", "Vaga PCD"],
        end: "Av. Bodoquena, 450 - Centro, Miranda - MS",
        tel: "(67) 3242-2020",
        alert: "✅ Entrada com rampa suave e portas amplas com ambiente climatizado.",
        desc: "Especializado na culinária regional pantaneira: peixes de água doce (pacu, pintado), caldo de piranha e moquecas."
    },
    {
        id: "hotel-chale",
        nome: "Hotel Chalé Miranda",
        cat: "Hospedagem",
        img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80",
        tags: ["Rampa", "Banheiro PCD", "Vaga PCD", "Quarto Adaptado"],
        end: "Av. Barão do Rio Branco, 890 - Centro, Miranda - MS",
        tel: "(67) 3242-1322",
        alert: "✅ Possui apartamentos térreos com portas largas e barras de apoio no banheiro.",
        desc: "Hospedagem urbana confortável no centro de Miranda, com piscina, café da manhã regional e estacionamento privativo."
    },
    {
        id: "fazenda-baia-grande",
        nome: "Fazenda Baía Grande (Turismo Rural)",
        cat: "Hospedagem",
        img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80",
        tags: ["Rampa", "Banheiro PCD", "Vaga PCD"],
        end: "BR-262, Zona Rural - Miranda - MS",
        tel: "(67) 99987-5544",
        alert: "✅ Sede principal adaptada e passeios de contemplação acessíveis.",
        desc: "Fazenda pantaneira autêntica que oferece vivência rural, passeios de contemplação, observação de vida silvestre e gastronomia típica."
    },
    {
        id: "posto-caninde",
        nome: "Restaurante e Posto Canindé (Rota 21)",
        cat: "Gastronomia",
        img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80",
        tags: ["Rampa", "Banheiro PCD", "Vaga PCD"],
        end: "BR-262, Km 502 - Miranda - MS",
        tel: "(67) 3242-1500",
        alert: "✅ Ponto de apoio na rodovia com banheiros totalmente adaptados e amplo estacionamento.",
        desc: "Ponto tradicional de parada na BR-262 entre Campo Grande e Corumbá, oferecendo buffet variado, lanchonete e loja de conveniência."
    },
    {
        id: "igreja-matriz-carmo",
        nome: "Igreja Matriz Nossa Senhora do Carmo",
        cat: "História",
        img: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=500&q=80",
        tags: ["Rampa", "Vaga PCD"],
        end: "Praça Agenor Carrilho - Centro, Miranda - MS",
        tel: "(67) 3242-1155",
        alert: "✅ Rampa de acesso disponível na entrada lateral da igreja.",
        desc: "Igreja histórica localizada no coração de Miranda, em frente à praça principal da cidade, palco de celebrações religiosas e culturais."
    }
];

let currentLocationId = null;

// Roteador Dinâmico por Hash na URL
function handleRoute() {
    const hash = window.location.hash || '#home';
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    if (hash.startsWith('#details/')) {
        const id = hash.split('/')[1];
        openDetails(id);
    } else if (hash === '#search') {
        document.getElementById('search').classList.add('active');
        applyFilters(); 
    } else if (hash === '#home') {
        document.getElementById('home').classList.add('active');
    } else {
        document.getElementById('p404').classList.add('active');
    }
    window.scrollTo(0, 0);
}

// Renderiza os Cards de Locais
function renderLocais(lista) {
    const grid = document.getElementById('results-grid');
    const totalCount = document.getElementById('total-count');
    
    if (totalCount) {
        totalCount.textContent = `${lista.length} local(is) encontrado(s)`;
    }

    if (!lista.length) {
        grid.innerHTML = '<p style="padding:2rem; grid-column: 1/-1; text-align:center;">Nenhum local encontrado para os filtros selecionados.</p>';
        return;
    }
    
    let htmlAcumulado = '';
    lista.forEach(l => {
        const tagsHtml = l.tags.map(t => `<span class="tag">${t}</span>`).join('');
        htmlAcumulado += `
            <div class="card" onclick="window.location.hash='#details/${l.id}'" role="button" tabindex="0">
                <img src="${l.img}" alt="Foto de ${l.nome}" loading="lazy">
                <div class="card-info">
                    <span class="badge-cat">${l.cat}</span>
                    <h3>${l.nome}</h3>
                    <p style="font-size:0.85rem; color:#666; margin-top:0.2rem;">📍 ${l.end}</p>
                    <div style="margin-top:0.5rem;">${tagsHtml}</div>
                </div>
            </div>`;
    });
    grid.innerHTML = htmlAcumulado;
}

// Filtros Combinados (Texto + Categoria + Checkboxes de Acessibilidade)
function applyFilters() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const catSelect = document.getElementById('catSelect').value;
    const rampa = document.getElementById('chkRampa').checked;
    const banheiro = document.getElementById('chkBanheiro').checked;
    const vaga = document.getElementById('chkVaga').checked;
    const quarto = document.getElementById('chkQuarto').checked;

    const filtrados = locais.filter(l => {
        const matchText = l.nome.toLowerCase().includes(query) || 
                          l.desc.toLowerCase().includes(query) || 
                          l.end.toLowerCase().includes(query) ||
                          l.cat.toLowerCase().includes(query);
        
        const matchCat = (catSelect === 'Todas') || (l.cat === catSelect);
        const matchRampa = !rampa || l.tags.includes("Rampa");
        const matchBan = !banheiro || l.tags.includes("Banheiro PCD");
        const matchVaga = !vaga || l.tags.includes("Vaga PCD");
        const matchQuarto = !quarto || l.tags.includes("Quarto Adaptado");
        
        return matchText && matchCat && matchRampa && matchBan && matchVaga && matchQuarto;
    });

    renderLocais(filtrados);
}

// Pesquisa disparada na Home
function searchFromHome(event) {
    if (event.key === 'Enter') {
        const val = event.target.value;
        window.location.hash = '#search';
        setTimeout(() => {
            document.getElementById('searchInput').value = val;
            applyFilters();
        }, 50);
    }
}

// Filtro direto ao clicar nas categorias da Home
function filterCat(categoria) {
    window.location.hash = '#search';
    setTimeout(() => {
        resetFilters();
        document.getElementById('catSelect').value = categoria;
        applyFilters();
    }, 50);
}

// Reset de Filtros
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('catSelect').value = 'Todas';
    document.getElementById('chkRampa').checked = false;
    document.getElementById('chkBanheiro').checked = false;
    document.getElementById('chkVaga').checked = false;
    document.getElementById('chkQuarto').checked = false;
    applyFilters();
}

// Exibe Detalhes do Local
function openDetails(id) {
    const local = locais.find(l => l.id === id);
    if (!local) {
        document.getElementById('p404').classList.add('active');
        return;
    }

    currentLocationId = id;
    document.getElementById('details').classList.add('active');
    document.getElementById('det-title').textContent = local.nome;
    document.getElementById('det-cat').textContent = local.cat;
    document.getElementById('det-address').textContent = "📍 " + local.end;
    document.getElementById('det-tel').textContent = "📞 Telefone: " + local.tel;
    document.getElementById('det-desc').textContent = local.desc;
    document.getElementById('det-tags').innerHTML = local.tags.map(t => `<span class="tag">${t}</span>`).join('');
    
    const alertBox = document.getElementById('det-alert');
    if (local.alert) {
        alertBox.style.display = "block";
        alertBox.textContent = local.alert;
    } else {
        alertBox.style.display = "none";
    }

    // Google Maps Link
    document.getElementById('btnMap').onclick = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.nome + " " + local.end)}`, '_blank');
    };

    // WhatsApp Link
    document.getElementById('btnZap').onclick = () => {
        const texto = `Confira as informações de acessibilidade de *${local.nome}* em Miranda-MS no Guia Acesso Livre!`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`, '_blank');
    };
}

// Adiciona Avaliação (Protegido contra XSS)
function addReview() {
    const rawName = document.getElementById('userName').value.trim() || "Anônimo";
    const rawMsg = document.getElementById('userMsg').value.trim();
    
    if (!rawMsg) return alert("Por favor, digite uma mensagem de avaliação.");

    const list = document.getElementById('review-list');
    const card = document.createElement('div');
    card.className = 'review-card';
    
    const strong = document.createElement('strong');
    strong.textContent = rawName + " ";
    
    const time = document.createElement('span');
    time.style.fontSize = "0.75rem";
    time.style.color = "#777";
    time.textContent = "• Agora mesmo";

    const p = document.createElement('p');
    p.textContent = rawMsg;
    p.style.marginTop = "0.3rem";
    
    card.appendChild(strong);
    card.appendChild(time);
    card.appendChild(p);
    
    list.prepend(card);
    
    document.getElementById('userMsg').value = '';
    alert("Avaliação publicada com sucesso!");
}

// Inicialização e Eventos Globais
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', () => {
    handleRoute();
});

