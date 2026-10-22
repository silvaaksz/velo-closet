import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ setPaginaAtual, qtdCarrinho, usuarioLogado }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => setPaginaAtual('home')} style={{ cursor: 'pointer' }}>
          <strong>VELO-CLOSET</strong>
        </div>

        <div className={styles.searchBox}>
          <input type="text" placeholder="O que você está procurando hoje? Compare preços de milhares de fabricantes." />
          <button onClick={() => setPaginaAtual('produtos')}>Buscar</button>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnLink} onClick={() => setPaginaAtual('login')}>
            {usuarioLogado ? `Olá, ${usuarioLogado.nome}` : 'Área do Cliente'}
          </button>
          
          <button className={styles.btnCart} onClick={() => setPaginaAtual('carrinho')}>
            🛒 Carrinho <span className={styles.badge}>{qtdCarrinho}</span>
          </button>

          <button className={styles.btnFabricante} onClick={() => setPaginaAtual('fornecedor')}>
            Sou Fabricante
          </button>
        </div>
      </div>
    </header>
  );
}