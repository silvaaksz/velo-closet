// Cria o banco (se precisar) e carrega dados/backup.sql nele.
// Rode na raiz do projeto, depois do git pull:  node importar-dados.js
// Atenção: registros com o mesmo id são SOBRESCRITOS pelos do backup.
import sqlite3 from 'sqlite3';
import fs from 'fs';

if (!fs.existsSync('./dados/backup.sql')) {
  console.error('Não achei dados/backup.sql. Faça o git pull primeiro.');
  process.exit(1);
}

const db = new (sqlite3.verbose().Database)('./database.sqlite');
const exec = (sql) =>
  new Promise((resolve, reject) => db.exec(sql, (err) => (err ? reject(err) : resolve())));
const all = (sql) =>
  new Promise((resolve, reject) =>
    db.all(sql, (err, rows) => (err ? reject(err) : resolve(rows)))
  );

// Mesmas colunas que o server.js adiciona ao iniciar
const NOVAS = {
  empresa: {
    cep: 'VARCHAR(8)', cidade: 'VARCHAR(100)', estado: 'CHAR(2)',
    latitude: 'REAL', longitude: 'REAL',
  },
  produto: { descricao: 'TEXT' },
  item_pedido: { tamanho: 'VARCHAR(10)' },
};

try {
  await exec(fs.readFileSync('./velocloset.sql', 'utf8')); // garante as tabelas
  for (const [tabela, colunas] of Object.entries(NOVAS)) {
    const existentes = (await all(`PRAGMA table_info(${tabela})`)).map((c) => c.name);
    for (const [nome, tipo] of Object.entries(colunas)) {
      if (!existentes.includes(nome)) await exec(`ALTER TABLE ${tabela} ADD COLUMN ${nome} ${tipo}`);
    }
  }
  await exec(fs.readFileSync('./dados/backup.sql', 'utf8'));
  console.log('Dados carregados no database.sqlite com sucesso!');
} catch (err) {
  console.error('Erro ao importar:', err.message);
} finally {
  db.close();
}