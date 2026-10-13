import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ setPaginaAtual }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.colunaLogo}>
          <div className={styles.logoBadge} onClick={() => setPaginaAtual('home')} style={{ cursor: 'pointer' }}>
            <span className={styles.iconBox}>🛍️</span>
            <span className={styles.logoTexto}>VELO-CLOSET</span>
          </div>
          <p className={styles.descricao}>
            Conectando compradores a pequenas confecções de todo o Brasil.
          </p>
          <div className={styles.contato}>
            <p className={styles.contatoItem}>✉ contato@velocloset.com.br</p>
            <p className={styles.contatoItem}>📞 (11) 99999-9999</p>
          </div>
        </div>

        <div className={styles.colunaLinks}>
          <h4>COMPRADORES</h4>
          <ul>
            <li><button className={styles.btnLink} onClick={() => setPaginaAtual('produtos')}>Como comprar</button></li>
            <li><button className={styles.btnLink} onClick={() => setPaginaAtual('produtos')}>Formas de pagamento</button></li>
            <li><button className={styles.btnLink} onClick={() => setPaginaAtual('produtos')}>Rastrear pedido</button></li>
            <li><button className={styles.btnLink} onClick={() => setPaginaAtual('produtos')}>Devoluções</button></li>
          </ul>
        </div>

        <div className={styles.colunaLinks}>
          <h4>FABRICANTES</h4>
          <ul>
            <li>
              <button className={styles.btnLink} onClick={() => setPaginaAtual('fornecedor')}>
                Cadastrar empresa
              </button>
            </li>
<li><button className={styles.btnLink} onClick={() => setPaginaAtual('pagamento')}>Formas de pagamento</button></li>            <li><button className={styles.btnLink} onClick={() => setPaginaAtual('home')}>Regras da plataforma</button></li>
            <li><button className={styles.btnLink} onClick={() => setPaginaAtual('home')}>Comissões</button></li>
          </ul>
        </div>

        <div className={styles.colunaLinks}>
          <h4>EMPRESA</h4>
          <ul>
            <li><button className={styles.btnLink} onClick={() => setPaginaAtual('home')}>Sobre a Velo-Closet</button></li>
            <li><button className={styles.btnLink} onClick={() => setPaginaAtual('home')}>Blog</button></li>
            <li><button className={styles.btnLink} onClick={() => setPaginaAtual('home')}>Carreiras</button></li>
            <li><button className={styles.btnLink} onClick={() => setPaginaAtual('home')}>Imprensa</button></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>© 2025 Velo-Closet Tecnologia Ltda. — CNPJ 00.000.000/0001-00</p>
          <div className={styles.legalLinks}>
            <span>Privacidade</span>
            <span>Termos</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}