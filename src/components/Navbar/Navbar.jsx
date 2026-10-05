import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ setPaginaAtual, qtdCarrinho }) {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo} onClick={() => setPaginaAtual('home')}>
          <span>VELO-CLOSET</span>
        </div>

        <div className={styles.searchBox}>
          <input type="text" placeholder="O que você está procurando hoje? Compare preços de milhares de fabricantes..." />
          <button className={styles.searchBtn}>Buscar</button>
        </div>

        <div className={styles.navActions}>
          <button onClick={() => setPaginaAtual('login')} className={styles.textBtn}>Área do Cliente</button>
          <button onClick={() => setPaginaAtual('carrinho')} className={styles.cartBtn}>
            🛒 Carrinho {qtdCarrinho > 0 && <span className={styles.badge}>{qtdCarrinho}</span>}
          </button>
          <button onClick={() => setPaginaAtual('fornecedor')} className={styles.sellerBtn}>Sou Fabricante</button>
        </div>
      </div>
    </header>
  );
}