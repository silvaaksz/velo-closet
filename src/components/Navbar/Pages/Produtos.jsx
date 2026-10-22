import React from 'react';
import styles from './Produtos.module.css';

export default function Produtos({ produtos, abrirDetalhes, adicionarAoCarrinho }) {
  return (
    <div className={styles.container}>
      <h2>Catálogo de Produtos</h2>
      <p>Compare preços entre diferentes fabricantes e empresas parceiras.</p>

      <div className={styles.grid}>
        {produtos.map((produto) => (
          <div key={produto.id} className={styles.card}>
            <img 
              src={produto.imagem} 
              alt={produto.titulo} 
              className={styles.imagem} 
              onClick={() => abrirDetalhes(produto)}
              style={{ cursor: 'pointer' }}
            />
            <div className={styles.info}>
              <span className={styles.categoria}>{produto.categoria}</span>
              <h3 onClick={() => abrirDetalhes(produto)} style={{ cursor: 'pointer' }}>
                {produto.titulo}
              </h3>
              <p className={styles.precoMin}>
                A partir de: <strong>R$ {produto.precoMinimo.toFixed(2).replace('.', ',')}</strong>
              </p>
              <p className={styles.fornecedoresQtd}>
                {produto.fornecedores.length} fornecedor(es) disponível(eis)
              </p>

              <div className={styles.botoes}>
                <button 
                  className={styles.btnDetalhes} 
                  onClick={() => abrirDetalhes(produto)}
                >
                  Ver Fornecedores
                </button>
                <button 
                  className={styles.btnComprar} 
                  onClick={() => adicionarAoCarrinho(produto)}
                >
                  Comprar Direto
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}