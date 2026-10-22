import React from 'react';
import styles from './Navbar.module.css';

<<<<<<< HEAD
export default function Navbar({ setPaginaAtual, qtdCarrinho, usuarioLogado }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => setPaginaAtual('home')} style={{ cursor: 'pointer' }}>
          <strong>VELO-CLOSET</strong>
        </div>

=======
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
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
        <div className={styles.searchBox}>
          <input type="text" placeholder="O que você está procurando hoje? Compare preços de milhares de fabricantes." />
          <button onClick={() => setPaginaAtual('produtos')}>Buscar</button>
        </div>

<<<<<<< HEAD
        <div className={styles.actions}>
          <button className={styles.btnLink} onClick={() => setPaginaAtual('login')}>
            {usuarioLogado ? `Olá, ${usuarioLogado.nome}` : 'Área do Cliente'}
          </button>
          
          <button className={styles.btnCart} onClick={() => setPaginaAtual('carrinho')}>
            🛒 Carrinho <span className={styles.badge}>{qtdCarrinho}</span>
=======
        {/* Botões do Topo */}
        <div className={styles.actions}>
          <button className={styles.btnLink} onClick={() => setPaginaAtual('login')}>
            Área do Cliente
          </button>
          
          <button className={styles.btnCart} onClick={() => setPaginaAtual('produtos')}>
            🛒 Carrinho <span className={styles.badge}>2</span>
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
          </button>

          <button className={styles.btnFabricante} onClick={() => setPaginaAtual('fornecedor')}>
            Sou Fabricante
          </button>
        </div>
      </div>
    </header>
  );
}