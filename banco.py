"""
BANCO DE DADOS - GUIA ACESSO LIVRE
Miranda/MS

Camada responsável pelo SQLite do projeto.
Não depende de bibliotecas externas.
"""

import sqlite3
from pathlib import Path
from datetime import datetime


# ============================================================
# CONFIGURAÇÃO
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "sistema.db"


# ============================================================
# CONEXÃO
# ============================================================

def conectar():
    conexao = sqlite3.connect(DB_PATH)
    conexao.row_factory = sqlite3.Row

    conexao.execute("PRAGMA foreign_keys = ON")
    conexao.execute("PRAGMA journal_mode = WAL")

    return conexao


# ============================================================
# ESTRUTURA DO BANCO
# ============================================================

SCHEMA = """

CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT DEFAULT '',
    ativo INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS recursos_acessibilidade (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT DEFAULT '',
    icone TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS locais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT DEFAULT '',
    endereco TEXT DEFAULT '',
    bairro TEXT DEFAULT '',
    cidade TEXT DEFAULT 'Miranda',
    estado TEXT DEFAULT 'MS',
    telefone TEXT DEFAULT '',
    whatsapp TEXT DEFAULT '',
    latitude REAL,
    longitude REAL,
    categoria_id INTEGER,
    imagem TEXT DEFAULT '',
    site TEXT DEFAULT '',
    ativo INTEGER DEFAULT 1,
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS local_recursos (
    local_id INTEGER NOT NULL,
    recurso_id INTEGER NOT NULL,

    PRIMARY KEY (local_id, recurso_id),

    FOREIGN KEY (local_id)
        REFERENCES locais(id)
        ON DELETE CASCADE,

    FOREIGN KEY (recurso_id)
        REFERENCES recursos_acessibilidade(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    local_id INTEGER NOT NULL,
    nome_usuario TEXT NOT NULL,
    nota INTEGER NOT NULL,
    comentario TEXT DEFAULT '',
    aprovado INTEGER DEFAULT 0,
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (local_id)
        REFERENCES locais(id)
        ON DELETE CASCADE,

    CHECK (nota >= 1 AND nota <= 5)
);

CREATE TABLE IF NOT EXISTS favoritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    local_id INTEGER NOT NULL,
    usuario TEXT NOT NULL,
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(local_id, usuario),

    FOREIGN KEY (local_id)
        REFERENCES locais(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS relatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    local_id INTEGER NOT NULL,
    nome_usuario TEXT DEFAULT '',
    tipo TEXT NOT NULL,
    mensagem TEXT NOT NULL,
    resolvido INTEGER DEFAULT 0,
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (local_id)
        REFERENCES locais(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS horarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    local_id INTEGER NOT NULL,
    dia_semana INTEGER NOT NULL,
    abre TEXT DEFAULT '',
    fecha TEXT DEFAULT '',
    fechado INTEGER DEFAULT 0,

    UNIQUE(local_id, dia_semana),

    FOREIGN KEY (local_id)
        REFERENCES locais(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fotos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    local_id INTEGER NOT NULL,
    caminho TEXT NOT NULL,
    legenda TEXT DEFAULT '',
    principal INTEGER DEFAULT 0,
    criado_em TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (local_id)
        REFERENCES locais(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_locais_nome
ON locais(nome);

CREATE INDEX IF NOT EXISTS idx_locais_categoria
ON locais(categoria_id);

CREATE INDEX IF NOT EXISTS idx_avaliacoes_local
ON avaliacoes(local_id);

CREATE INDEX IF NOT EXISTS idx_recursos_local
ON local_recursos(local_id);

CREATE INDEX IF NOT EXISTS idx_favoritos_usuario
ON favoritos(usuario);

CREATE INDEX IF NOT EXISTS idx_relatos_local
ON relatos(local_id);

"""


# ============================================================
# DADOS PADRÃO
# ============================================================

CATEGORIAS_PADRAO = [
    ("Gastronomia", "Restaurantes, lanchonetes e alimentação."),
    ("História", "Locais históricos e patrimônio."),
    ("Cultura", "Cultura, eventos e atividades culturais."),
    ("Ecoturismo", "Natureza, trilhas e atividades ao ar livre."),
    ("Hospedagem", "Hotéis, pousadas e locais para hospedagem.")
]


RECURSOS_PADRAO = [
    ("Rampa de Acesso", "Entrada acessível para pessoas com mobilidade reduzida.", "♿"),
    ("Banheiro PCD", "Banheiro adaptado para pessoas com deficiência.", "🚻"),
    ("Vaga PCD", "Vaga de estacionamento reservada.", "🅿️"),
    ("Quarto Adaptado", "Quarto adaptado para acessibilidade.", "🛏️"),
    ("Piso Tátil", "Piso tátil para orientação.", "🟨"),
    ("Porta Ampla", "Portas com largura adequada para acessibilidade.", "🚪"),
    ("Barras de Apoio", "Barras de apoio instaladas.", "➖"),
    ("Atendimento Prioritário", "Atendimento prioritário disponível.", "⭐")
]


DIAS_SEMANA = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]


# ============================================================
# FUNÇÕES AUXILIARES
# ============================================================

def _dict(registro):
    if registro is None:
        return None

    return dict(registro)


def _dicts(registros):
    return [dict(registro) for registro in registros]


# ============================================================
# INICIALIZAÇÃO
# ============================================================

def inicializar_banco():

    with conectar() as conexao:

        conexao.executescript(SCHEMA)

        for nome, descricao in CATEGORIAS_PADRAO:

            conexao.execute(
                """
                INSERT OR IGNORE INTO categorias
                (nome, descricao)
                VALUES (?, ?)
                """,
                (nome, descricao)
            )

        for nome, descricao, icone in RECURSOS_PADRAO:

            conexao.execute(
                """
                INSERT OR IGNORE INTO recursos_acessibilidade
                (nome, descricao, icone)
                VALUES (?, ?, ?)
                """,
                (nome, descricao, icone)
            )

        conexao.commit()


# ============================================================
# CATEGORIAS
# ============================================================

def obter_categorias():

    with conectar() as conexao:

        resultado = conexao.execute(
            """
            SELECT
                id,
                nome,
                descricao
            FROM categorias
            WHERE ativo = 1
            ORDER BY nome
            """
        ).fetchall()

        return _dicts(resultado)


# ============================================================
# RECURSOS
# ============================================================

def obter_recursos():

    with conectar() as conexao:

        resultado = conexao.execute(
            """
            SELECT
                id,
                nome,
                descricao,
                icone
            FROM recursos_acessibilidade
            ORDER BY nome
            """
        ).fetchall()

        return _dicts(resultado)


# ============================================================
# BUSCAR LOCAL
# ============================================================

def obter_local(local_id):

    with conectar() as conexao:

        local = conexao.execute(
            """
            SELECT
                l.*,
                c.nome AS categoria_nome
            FROM locais l
            LEFT JOIN categorias c
                ON c.id = l.categoria_id
            WHERE l.id = ?
              AND l.ativo = 1
            """,
            (local_id,)
        ).fetchone()

        if local is None:
            return None

        local = _dict(local)

        recursos = conexao.execute(
            """
            SELECT
                r.id,
                r.nome,
                r.descricao,
                r.icone
            FROM recursos_acessibilidade r
            INNER JOIN local_recursos lr
                ON lr.recurso_id = r.id
            WHERE lr.local_id = ?
            ORDER BY r.nome
            """,
            (local_id,)
        ).fetchall()

        local["recursos"] = _dicts(recursos)

        avaliacoes = conexao.execute(
            """
            SELECT
                id,
                nome_usuario,
                nota,
                comentario,
                criado_em
            FROM avaliacoes
            WHERE local_id = ?
              AND aprovado = 1
            ORDER BY criado_em DESC
            """,
            (local_id,)
        ).fetchall()

        local["avaliacoes"] = _dicts(avaliacoes)

        horarios = conexao.execute(
            """
            SELECT
                dia_semana,
                abre,
                fecha,
                fechado
            FROM horarios
            WHERE local_id = ?
            ORDER BY dia_semana
            """,
            (local_id,)
        ).fetchall()

        local["horarios"] = _dicts(horarios)

        fotos = conexao.execute(
            """
            SELECT
                id,
                caminho,
                legenda,
                principal
            FROM fotos
            WHERE local_id = ?
            ORDER BY principal DESC, id
            """,
            (local_id,)
        ).fetchall()

        local["fotos"] = _dicts(fotos)

        return local


# ============================================================
# PESQUISA
# ============================================================

def pesquisar_locais(
    texto="",
    categoria=None,
    recursos=None,
    limite=100
):

    recursos = recursos or []

    sql = """
        SELECT DISTINCT
            l.id,
            l.nome,
            l.descricao,
            l.endereco,
            l.bairro,
            l.cidade,
            l.estado,
            l.telefone,
            l.whatsapp,
            l.latitude,
            l.longitude,
            l.imagem,
            l.site,
            c.nome AS categoria_nome,

            COALESCE(
                AVG(
                    CASE
                        WHEN a.aprovado = 1
                        THEN a.nota
                    END
                ),
                0
            ) AS media_avaliacao,

            COUNT(
                DISTINCT CASE
                    WHEN a.aprovado = 1
                    THEN a.id
                END
            ) AS total_avaliacoes

        FROM locais l

        LEFT JOIN categorias c
            ON c.id = l.categoria_id

        LEFT JOIN avaliacoes a
            ON a.local_id = l.id
    """

    parametros = []

    if recursos:

        sql += """
            INNER JOIN local_recursos lr
                ON lr.local_id = l.id

            INNER JOIN recursos_acessibilidade ra
                ON ra.id = lr.recurso_id
        """

    sql += """
        WHERE l.ativo = 1
    """

    if texto:

        termo = f"%{texto.strip()}%"

        sql += """
            AND (
                l.nome LIKE ?
                OR l.descricao LIKE ?
                OR l.endereco LIKE ?
                OR l.bairro LIKE ?
                OR l.cidade LIKE ?
                OR c.nome LIKE ?
            )
        """

        parametros.extend([
            termo,
            termo,
            termo,
            termo,
            termo,
            termo
        ])

    if categoria:

        sql += """
            AND (
                c.nome = ?
                OR CAST(c.id AS TEXT) = ?
            )
        """

        parametros.extend([
            categoria,
            str(categoria)
        ])

    if recursos:

        placeholders = ",".join("?" for _ in recursos)

        sql += f"""
            AND ra.id IN ({placeholders})
        """

        parametros.extend(recursos)

        sql += """
            GROUP BY l.id
            HAVING COUNT(DISTINCT ra.id) = ?
        """

        parametros.append(len(recursos))

    else:

        sql += """
            GROUP BY l.id
        """

    sql += """
        ORDER BY
            l.nome COLLATE NOCASE ASC
        LIMIT ?
    """

    parametros.append(limite)

    with conectar() as conexao:

        resultado = conexao.execute(
            sql,
            parametros
        ).fetchall()

        return _dicts(resultado)


# ============================================================
# CADASTRAR LOCAL
# ============================================================

def cadastrar_local(dados):

    agora = datetime.now().isoformat(
        timespec="seconds"
    )

    with conectar() as conexao:

        cursor = conexao.execute(
            """
            INSERT INTO locais (
                nome,
                descricao,
                endereco,
                bairro,
                cidade,
                estado,
                telefone,
                whatsapp,
                latitude,
                longitude,
                categoria_id,
                imagem,
                site,
                ativo,
                criado_em,
                atualizado_em
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
            """,
            (
                dados.get("nome", ""),
                dados.get("descricao", ""),
                dados.get("endereco", ""),
                dados.get("bairro", ""),
                dados.get("cidade", "Miranda"),
                dados.get("estado", "MS"),
                dados.get("telefone", ""),
                dados.get("whatsapp", ""),
                dados.get("latitude"),
                dados.get("longitude"),
                dados.get("categoria_id"),
                dados.get("imagem", ""),
                dados.get("site", ""),
                agora,
                agora
            )
        )

        conexao.commit()

        return cursor.lastrowid


# ============================================================
# ATUALIZAR LOCAL
# ============================================================

def atualizar_local(local_id, dados):

    agora = datetime.now().isoformat(
        timespec="seconds"
    )

    with conectar() as conexao:

        conexao.execute(
            """
            UPDATE locais
            SET
                nome = ?,
                descricao = ?,
                endereco = ?,
                bairro = ?,
                cidade = ?,
                estado = ?,
                telefone = ?,
                whatsapp = ?,
                latitude = ?,
                longitude = ?,
                categoria_id = ?,
                imagem = ?,
                site = ?,
                atualizado_em = ?
            WHERE id = ?
            """,
            (
                dados.get("nome", ""),
                dados.get("descricao", ""),
                dados.get("endereco", ""),
                dados.get("bairro", ""),
                dados.get("cidade", "Miranda"),
                dados.get("estado", "MS"),
                dados.get("telefone", ""),
                dados.get("whatsapp", ""),
                dados.get("latitude"),
                dados.get("longitude"),
                dados.get("categoria_id"),
                dados.get("imagem", ""),
                dados.get("site", ""),
                agora,
                local_id
            )
        )

        conexao.commit()

        return True


# ============================================================
# EXCLUIR LOCAL
# ============================================================

def excluir_local(local_id):

    with conectar() as conexao:

        conexao.execute(
            """
            UPDATE locais
            SET
                ativo = 0,
                atualizado_em = ?
            WHERE id = ?
            """,
            (
                datetime.now().isoformat(
                    timespec="seconds"
                ),
                local_id
            )
        )

        conexao.commit()

        return True


# ============================================================
# RECURSOS DE ACESSIBILIDADE
# ============================================================

def definir_recurso_local(
    local_id,
    recurso_id
):

    with conectar() as conexao:

        conexao.execute(
            """
            INSERT OR IGNORE INTO local_recursos
            (local_id, recurso_id)
            VALUES (?, ?)
            """,
            (
                local_id,
                recurso_id
            )
        )

        conexao.commit()


def remover_recurso_local(
    local_id,
    recurso_id
):

    with conectar() as conexao:

        conexao.execute(
            """
            DELETE FROM local_recursos
            WHERE local_id = ?
              AND recurso_id = ?
            """,
            (
                local_id,
                recurso_id
            )
        )

        conexao.commit()


# ============================================================
# AVALIAÇÕES
# ============================================================

def adicionar_avaliacao(
    local_id,
    nome_usuario,
    nota,
    comentario=""
):

    nota = int(nota)

    if nota < 1 or nota > 5:
        raise ValueError(
            "A nota precisa estar entre 1 e 5."
        )

    with conectar() as conexao:

        cursor = conexao.execute(
            """
            INSERT INTO avaliacoes (
                local_id,
                nome_usuario,
                nota,
                comentario,
                aprovado
            )
            VALUES (?, ?, ?, ?, 0)
            """,
            (
                local_id,
                nome_usuario.strip(),
                nota,
                comentario.strip()
            )
        )

        conexao.commit()

        return cursor.lastrowid


def moderar_avaliacao(
    avaliacao_id,
    aprovado=True
):

    with conectar() as conexao:

        conexao.execute(
            """
            UPDATE avaliacoes
            SET aprovado = ?
            WHERE id = ?
            """,
            (
                1 if aprovado else 0,
                avaliacao_id
            )
        )

        conexao.commit()


# ============================================================
# AQUI TERMINA A PARTE 1
# ============================================================

# ============================================================
# FAVORITOS
# ============================================================

def alternar_favorito(
    local_id,
    usuario
):

    with conectar() as conexao:

        favorito = conexao.execute(
            """
            SELECT id
            FROM favoritos
            WHERE local_id = ?
              AND usuario = ?
            """,
            (
                local_id,
                usuario
            )
        ).fetchone()

        if favorito:

            conexao.execute(
                """
                DELETE FROM favoritos
                WHERE id = ?
                """,
                (favorito["id"],)
            )

            conexao.commit()

            return False

        conexao.execute(
            """
            INSERT INTO favoritos
            (local_id, usuario)
            VALUES (?, ?)
            """,
            (
                local_id,
                usuario
            )
        )

        conexao.commit()

        return True


def listar_favoritos(usuario):

    with conectar() as conexao:

        resultado = conexao.execute(
            """
            SELECT
                l.*,
                c.nome AS categoria_nome
            FROM favoritos f

            INNER JOIN locais l
                ON l.id = f.local_id

            LEFT JOIN categorias c
                ON c.id = l.categoria_id

            WHERE f.usuario = ?
              AND l.ativo = 1

            ORDER BY f.criado_em DESC
            """,
            (usuario,)
        ).fetchall()

        return _dicts(resultado)


# ============================================================
# RELATOS
# ============================================================

def adicionar_relato(
    local_id,
    tipo,
    mensagem,
    nome_usuario=""
):

    with conectar() as conexao:

        cursor = conexao.execute(
            """
            INSERT INTO relatos (
                local_id,
                nome_usuario,
                tipo,
                mensagem
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                local_id,
                nome_usuario,
                tipo,
                mensagem
            )
        )

        conexao.commit()

        return cursor.lastrowid


def listar_relatos(
    apenas_abertos=True
):

    with conectar() as conexao:

        if apenas_abertos:

            resultado = conexao.execute(
                """
                SELECT
                    r.*,
                    l.nome AS local_nome
                FROM relatos r
                INNER JOIN locais l
                    ON l.id = r.local_id
                WHERE r.resolvido = 0
                ORDER BY r.criado_em DESC
                """
            ).fetchall()

        else:

            resultado = conexao.execute(
                """
                SELECT
                    r.*,
                    l.nome AS local_nome
                FROM relatos r
                INNER JOIN locais l
                    ON l.id = r.local_id
                ORDER BY r.criado_em DESC
                """
            ).fetchall()

        return _dicts(resultado)


def moderar_relato(
    relato_id,
    resolvido=True
):

    with conectar() as conexao:

        conexao.execute(
            """
            UPDATE relatos
            SET resolvido = ?
            WHERE id = ?
            """,
            (
                1 if resolvido else 0,
                relato_id
            )
        )

        conexao.commit()


# ============================================================
# HORÁRIOS
# ============================================================

def salvar_horario(
    local_id,
    dia_semana,
    abre,
    fecha,
    fechado=False
):

    with conectar() as conexao:

        conexao.execute(
            """
            INSERT INTO horarios (
                local_id,
                dia_semana,
                abre,
                fecha,
                fechado
            )
            VALUES (?, ?, ?, ?, ?)

            ON CONFLICT(local_id, dia_semana)
            DO UPDATE SET
                abre = excluded.abre,
                fecha = excluded.fecha,
                fechado = excluded.fechado
            """,
            (
                local_id,
                dia_semana,
                abre,
                fecha,
                1 if fechado else 0
            )
        )

        conexao.commit()


# ============================================================
# FOTOS
# ============================================================

def adicionar_foto(
    local_id,
    caminho,
    legenda="",
    principal=False
):

    with conectar() as conexao:

        cursor = conexao.execute(
            """
            INSERT INTO fotos (
                local_id,
                caminho,
                legenda,
                principal
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                local_id,
                caminho,
                legenda,
                1 if principal else 0
            )
        )

        conexao.commit()

        return cursor.lastrowid


# ============================================================
# ESTATÍSTICAS
# ============================================================

def estatisticas():

    with conectar() as conexao:

        locais = conexao.execute(
            """
            SELECT COUNT(*)
            FROM locais
            WHERE ativo = 1
            """
        ).fetchone()[0]

        categorias = conexao.execute(
            """
            SELECT COUNT(*)
            FROM categorias
            WHERE ativo = 1
            """
        ).fetchone()[0]

        avaliacoes = conexao.execute(
            """
            SELECT COUNT(*)
            FROM avaliacoes
            WHERE aprovado = 1
            """
        ).fetchone()[0]

        relatos = conexao.execute(
            """
            SELECT COUNT(*)
            FROM relatos
            WHERE resolvido = 0
            """
        ).fetchone()[0]

        favoritos = conexao.execute(
            """
            SELECT COUNT(*)
            FROM favoritos
            """
        ).fetchone()[0]

        return {
            "locais": locais,
            "categorias": categorias,
            "avaliacoes": avaliacoes,
            "relatos_abertos": relatos,
            "favoritos": favoritos
        }


# ============================================================
# STATUS DO BANCO
# ============================================================

def status_banco():

    return {
        "arquivo": str(DB_PATH),
        "existe": DB_PATH.exists(),
        "tamanho": DB_PATH.stat().st_size
        if DB_PATH.exists()
        else 0
    }


# ============================================================
# EXECUÇÃO DIRETA
# ============================================================

if __name__ == "__main__":

    inicializar_banco()

    status = status_banco()
    dados = estatisticas()

    print()
    print("=" * 60)
    print("BANCO DE DADOS - GUIA ACESSO LIVRE")
    print("=" * 60)
    print()
    print("Banco inicializado com sucesso.")
    print()
    print(f"Arquivo: {status['arquivo']}")
    print(f"Tamanho: {status['tamanho']} bytes")
    print()
    print(f"Categorias: {dados['categorias']}")
    print(f"Locais: {dados['locais']}")
    print(f"Avaliações aprovadas: {dados['avaliacoes']}")
    print(f"Relatos abertos: {dados['relatos_abertos']}")
    print(f"Favoritos: {dados['favoritos']}")
    print()
    print("=" * 60)
