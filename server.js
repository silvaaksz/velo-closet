<<<<<<< HEAD
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const sqliteVerbose = sqlite3.verbose();
const app = express();
app.use(express.json());
app.use(cors());

// Criação do Banco de Dados SQLite na mesma pasta
const db = new sqliteVerbose.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite com sucesso!');
  }
});

// Criação da tabela de produtos
db.run(`CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT,
  categoria TEXT,
  precoMinimo REAL,
  fabricante TEXT
)`);

// Rota da API para buscar produtos
app.get('/api/produtos', (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "success", data: rows });
  });
});

// Iniciar o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor API rodando na porta ${PORT}`);
=======
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const sqliteVerbose = sqlite3.verbose();
const app = express();
app.use(express.json());
app.use(cors());

// Criação do Banco de Dados SQLite na mesma pasta
const db = new sqliteVerbose.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite com sucesso!');
  }
});

// Criação da tabela de produtos
db.run(`CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT,
  categoria TEXT,
  precoMinimo REAL,
  fabricante TEXT
)`);

// Rota da API para buscar produtos
app.get('/api/produtos', (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "success", data: rows });
  });
});

// Iniciar o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor API rodando na porta ${PORT}`);
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
});