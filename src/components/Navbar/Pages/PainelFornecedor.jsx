import React from 'react';
import styles from './PainelFornecedor.module.css';

export default function PainelFornecedor() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Painel do Fabricante</h1>
        <button className={styles.btnNew}>+ Cadastrar Novo Produto</button>
      </header>

      <div className={styles.gridStats}>
        <div className={styles.statCard}>
          <span>Vendas no Mês</span>
          <h2>R$ 14.250,00</h2>
        </div>
        <div className={styles.statCard}>
          <span>Pedidos Pendentes</span>
          <h2>18</h2>
        </div>
        <div className={styles.statCard}>
          <span>Avaliação Média</span>
          <h2>4.9 ★</h2>
        </div>
      </div>
    </div>
  );
}