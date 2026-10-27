import React from 'react';
import styles from './FormasPagamento.module.css';

export default function FormasPagamento({ setPaginaAtual }) {
  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => setPaginaAtual('home')}>
        ← Voltar para a Página Inicial
      </button>

      <h2>Formas de Pagamento e Segurança</h2>
      <p>Na Velo-Closet, todas as transações entre compradores e confecções locais são 100% protegidas.</p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.icon}>📱</span>
          <h3>PIX com Aprovação Instantânea</h3>
          <p>Pague com Pix e aproveite a confirmação imediata do seu pedido junto ao fabricante. Ganhe 5% de desconto automático.</p>
        </div>

        <div className={styles.card}>
          <span className={styles.icon}>💳</span>
          <h3>Cartão de Crédito</h3>
          <p>Parcele as suas compras de vestuário em até 6x sem juros através das principais bandeiras do mercado.</p>
        </div>

        <div className={styles.card}>
          <span className={styles.icon}>🔒</span>
          <h3>Garantia Velo-Closet (Escrow)</h3>
          <p>O seu dinheiro fica retido de forma segura na plataforma. A confecção só recebe o valor após você receber e aprovar o produto em casa.</p>
        </div>
      </div>
    </div>
  );
}