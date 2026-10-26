PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS empresa (
    id_empresa INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL UNIQUE,
    nome_empresa VARCHAR(100) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_categoria VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS produto (
    id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
    id_empresa INTEGER NOT NULL,
    id_categoria INTEGER NOT NULL,
    titulo VARCHAR(150),
    imagem VARCHAR(500),
    tamanho VARCHAR(20),
    preco DECIMAL(10,2) NOT NULL,
    estoque INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE IF NOT EXISTS avaliacao (
    id_avaliacao INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    id_empresa INTEGER NOT NULL,
    nota INTEGER NOT NULL CHECK (nota BETWEEN 1 AND 5),
    comentario VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE IF NOT EXISTS pedido (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'Aguardando Pagamento',
    valor_total DECIMAL(10,2) NOT NULL,
    codigo_rastreio VARCHAR(20) UNIQUE,
    cep VARCHAR(8),
    rua VARCHAR(150),
    numero VARCHAR(20),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado CHAR(2),
    latitude REAL,
    longitude REAL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS pagamento (
    id_pagamento INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER NOT NULL UNIQUE,
    metodo VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pendente',
    data_pagamento DATETIME,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS item_pedido (
    id_item INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    preco_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);

-- Dados de teste (só entram se o banco estiver vazio)
INSERT OR IGNORE INTO categoria (id_categoria, nome_categoria) VALUES (1, 'Camisetas'), (2, 'Calças');
INSERT OR IGNORE INTO usuario (id_usuario, nome, email, senha) VALUES (1, 'Fornecedor Teste', 'fornecedor@teste.com', '123456');
INSERT OR IGNORE INTO empresa (id_empresa, id_usuario, nome_empresa, cnpj, email) VALUES (1, 1, 'Confecção Silva & Cia', '00.000.000/0001-00', 'contato@silva.com');
INSERT OR IGNORE INTO produto (id_produto, id_empresa, id_categoria, titulo, tamanho, preco, estoque) VALUES
  (1, 1, 1, 'Camiseta Básica', 'M', 49.90, 100),
  (2, 1, 2, 'Calça Jeans', '42', 129.90, 50);