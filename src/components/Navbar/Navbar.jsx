import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ setPaginaAtual }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo que retorna para a Home */}
        <div className={styles.logo} onClick={() => setPaginaAtual('home')} style={{ cursor: 'pointer' }}>
          <span className={styles.icon}>🛍️</span>
          <strong>VELO-CLOSET</strong>
        </div>

        {/* Barra de pesquisa */}
        <div className={styles.searchBox}>
          <input type="text" placeholder="O que você está procurando hoje? Compare preços de milhares de fabricantes." />
          <button onClick={() => setPaginaAtual('produtos')}>Buscar</button>
        </div>

        {/* Botões do Topo */}
        <div className={styles.actions}>
          <button className={styles.btnLink} onClick={() => setPaginaAtual('login')}>
            Área do Cliente
          </button>
          
          <button className={styles.btnCart} onClick={() => setPaginaAtual('produtos')}>
            🛒 Carrinho <span className={styles.badge}>2</span>
          </button>

          <button className={styles.btnFabricante} onClick={() => setPaginaAtual('fornecedor')}>
            Sou Fabricante
          </button>
        </div>
      </div>
    </header>
  );
}