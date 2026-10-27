// Gera dados/backup.sql com a ESTRUTURA e os DADOS de TODAS as tabelas do
// database.sqlite (contas, produtos, fotos, pedidos...).
// Rode na raiz do projeto, no computador que TEM os dados:  node exportar-dados.js
import sqlite3 from 'sqlite3';
import fs from 'fs';

if (!fs.existsSync('./database.sqlite')) {
  console.error('Não achei database.sqlite nesta pasta. Entre na raiz do projeto (onde está o server.js).');
  process.exit(1);
}
console.log(`Lendo database.sqlite (${Math.round(fs.statSync('./database.sqlite').size / 1024)} KB)`);

const db = new (sqlite3.verbose().Database)('./database.sqlite');
const all = (sql) =>
  new Promise((resolve, reject) =>
    db.all(sql, (err, rows) => (err ? reject(err) : resolve(rows)))
  );

const literal = (v) => {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'number') return String(v);
  if (Buffer.isBuffer(v)) return `X'${v.toString('hex')}'`;
  return `'${String(v).replace(/'/g, "''")}'`;
};

let sql = '-- Backup gerado por exportar-dados.js\n\n';

// 1) Estrutura: tabelas primeiro, depois índices, views e gatilhos
const objetos = await all(
  `SELECT type, name, sql FROM sqlite_master
   WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%'
   ORDER BY CASE type WHEN 'table' THEN 0 ELSE 1 END, rowid`
);
for (const o of objetos) sql += `${o.sql};\n`;
sql += '\n';

// 2) Dados de todas as tabelas (as senhas NÃO são alteradas)
const resumo = [];
let senhasEmTextoPuro = false;
for (const { name } of objetos.filter((o) => o.type === 'table')) {
  const linhas = await all(`SELECT * FROM "${name}"`);
  for (const linha of linhas) {
    if (typeof linha.senha === 'string' && linha.senha && !linha.senha.startsWith('$2')) {
      senhasEmTextoPuro = true;
    }
    const colunas = Object.keys(linha);
    sql += `INSERT INTO "${name}" (${colunas.map((c) => `"${c}"`).join(', ')}) VALUES (${colunas
      .map((c) => literal(linha[c]))
      .join(', ')});\n`;
  }
  resumo.push(`  ${name}: ${linhas.length} registro(s)`);
}

fs.mkdirSync('./dados', { recursive: true });
fs.writeFileSync('./dados/backup.sql', sql);

console.log('Pronto! Registros por tabela:');
console.log(resumo.join('\n'));
console.log(`dados/backup.sql: ${Math.round(Buffer.byteLength(sql) / 1024)} KB`);
if (senhasEmTextoPuro) {
  console.log('\nATENÇÃO: há senhas em texto puro neste banco. Só envie o backup para um repositório PRIVADO.');
}
db.close();