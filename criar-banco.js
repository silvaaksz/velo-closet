import sqlite3 from 'sqlite3';
import fs from 'fs';

const db = new (sqlite3.verbose().Database)('./database.sqlite');
   const schema = fs.readFileSync('./velocloset.sql', 'utf8');
db.exec(schema, (err) => {
  if (err) console.error('Erro ao criar o banco:', err.message);
  else console.log('Banco database.sqlite criado com sucesso!');
  db.close();
});