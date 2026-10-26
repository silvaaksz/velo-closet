import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const sqliteVerbose = sqlite3.verbose();
const app = express();
app.use(cors()); // antes do express.json, para que até as respostas de erro tenham CORS
app.use(express.json({ limit: '5mb' })); // fotos dos produtos chegam em base64

const db = new sqliteVerbose.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite com sucesso!');
  }
});

// Colunas que o site usa. Se o banco antigo não tiver alguma, ela é adicionada sozinha.
const COLUNAS = {
  titulo: 'TEXT',
  categoria: 'TEXT',
  precoMinimo: 'REAL',
  fabricante: 'TEXT',
  fornecedor_email: 'TEXT',
  estoque: 'INTEGER',
  descricao: 'TEXT',
  imagem: 'TEXT',
  ean: 'TEXT'
};

const PRODUTOS_EXEMPLO = [
  ['Calça Jeans Balloon Masculina', 'CALÇAS', 89.9, 'Confecção Silva', 'fornecedor@silva.com', 45, 'Modelagem oversized com tecido resistente de alta qualidade.', null, '7891029384756'],
  ['Cropped Canelado Manga Longa', 'BLUSAS', 34.9, 'Ateliê Moda Leve', null, 30, 'Cropped canelado super confortável para o dia a dia.', null, '7899876543210']
];

function criarProdutosExemplo() {
  // Só cria os produtos de exemplo se a tabela estiver vazia
  db.get('SELECT COUNT(*) AS n FROM produtos', [], (err, row) => {
    if (err || !row || row.n > 0) return;
    PRODUTOS_EXEMPLO.forEach((p) =>
      db.run(
        'INSERT INTO produtos (titulo, categoria, precoMinimo, fabricante, fornecedor_email, estoque, descricao, imagem, ean) VALUES (?,?,?,?,?,?,?,?,?)',
        p,
        (e) => e && console.error('Erro ao criar produto de exemplo:', e.message)
      )
    );
  });
}

function prepararBanco() {
  db.run(
    `CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      categoria TEXT,
      precoMinimo REAL,
      fabricante TEXT,
      fornecedor_email TEXT,
      estoque INTEGER,
      descricao TEXT,
      imagem TEXT
    )`,
    (err) => {
      if (err) return console.error('Erro ao criar a tabela produtos:', err.message);

      db.all('PRAGMA table_info(produtos)', [], (err2, colunas) => {
        if (err2) return console.error('Erro ao ler a tabela produtos:', err2.message);

        const existentes = colunas.map((c) => c.name);
        const faltando = Object.entries(COLUNAS).filter(([nome]) => !existentes.includes(nome));

        const finalizar = () => {
          // Bancos antigos podem ter "preco" em vez de "precoMinimo": aproveita o valor
          if (existentes.includes('preco')) {
            db.run('UPDATE produtos SET precoMinimo = preco WHERE precoMinimo IS NULL', () => criarProdutosExemplo());
          } else {
            criarProdutosExemplo();
          }
        };

        if (faltando.length === 0) return finalizar();

        let pendentes = faltando.length;
        faltando.forEach(([nome, tipo]) => {
          db.run(`ALTER TABLE produtos ADD COLUMN ${nome} ${tipo}`, (e) => {
            if (e) console.error(`Erro ao adicionar a coluna ${nome}:`, e.message);
            else console.log(`Coluna "${nome}" adicionada à tabela produtos.`);
            pendentes -= 1;
            if (pendentes === 0) finalizar();
          });
        });
      });
    }
  );
}

prepararBanco();

// Listar produtos
app.get('/api/produtos', (req, res) => {
  db.all('SELECT * FROM produtos ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'success', data: rows });
  });
});

// EAN só com números (vazio vira null)
const limparEan = (v) => {
  const d = String(v || '').replace(/\D/g, '');
  return d || null;
};

// Criar produto
app.post('/api/produtos', (req, res) => {
  const { titulo, categoria, precoMinimo, fabricante, fornecedor_email, estoque, descricao, imagem, ean } = req.body;

  if (!titulo || !Number.isFinite(Number(precoMinimo))) {
    return res.status(400).json({ error: 'Título e preço são obrigatórios.' });
  }

  const sql =
    'INSERT INTO produtos (titulo, categoria, precoMinimo, fabricante, fornecedor_email, estoque, descricao, imagem, ean) VALUES (?,?,?,?,?,?,?,?,?)';
  const params = [titulo, categoria, precoMinimo, fabricante, fornecedor_email, estoque, descricao, imagem || null, limparEan(ean)];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'success', id: this.lastID });
  });
});

// Editar produto (só o dono): título, categoria, descrição, foto, preço e estoque
app.put('/api/produtos/:id', (req, res) => {
  const { titulo, categoria, descricao, imagem, precoMinimo, estoque, fornecedor_email, fabricante, ean } = req.body;
  const preco = parseFloat(precoMinimo);
  const qtd = parseInt(estoque, 10);

  if (!titulo || !String(titulo).trim()) {
    return res.status(400).json({ error: 'O título não pode ficar vazio.' });
  }
  if (!Number.isFinite(preco) || preco <= 0 || !Number.isInteger(qtd) || qtd < 0) {
    return res.status(400).json({ error: 'Preço ou estoque inválido.' });
  }

  // imagem null/ausente = mantém a foto atual
  const sql = `UPDATE produtos
               SET titulo = ?, categoria = ?, descricao = ?, imagem = COALESCE(?, imagem),
                   precoMinimo = ?, estoque = ?, ean = ?
               WHERE id = ? AND (fornecedor_email = ? OR fabricante = ?)`;

  const params = [
    String(titulo).trim(), (categoria || '').toUpperCase(), descricao || '', imagem || null,
    preco, qtd, limparEan(ean), req.params.id, fornecedor_email || '', fabricante || ''
  ];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(403).json({ error: 'Produto não encontrado ou não pertence a este fornecedor.' });
      return;
    }
    res.json({ message: 'success' });
  });
});

// Erros inesperados (ex.: foto grande demais) voltam como JSON legível
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'A foto é grande demais. Escolha uma imagem menor.' });
  }
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor API rodando na porta ${PORT}`);
});