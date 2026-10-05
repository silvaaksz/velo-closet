import React from 'react';
import styles from './Footer.module.css';

export default function Footer({ setPaginaAtual }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* COLUNA 1: LOGO E CONTATOS */}
        <div className={styles.colunaLogo}>
          <div className={styles.logoBadge}>
            <div className={styles.iconBox}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className={styles.logoTexto}>VELO-CLOSET</span>
          </div>
          
          <p className={styles.descricao}>
            Conectando compradores a pequenas confecções de todo o Brasil.
          </p>

          <div className={styles.contato}>
            <p className={styles.contatoItem}>
              <span>✉</span> contato@velocloset.com.br
            </p>
            <p className={styles.contatoItem}>
              <span>📞</span> (11) 99999-9999
            </p>
          </div>
        </div>

        {/* COLUNA 2: COMPRADORES */}
        <div className={styles.colunaLinks}>
          <h4>COMPRADORES</h4>
          <ul>
            <li><a href="#como-comprar">Como comprar</a></li>
            <li><a href="#formas-pagamento">Formas de pagamento</a></li>
            <li><a href="#rastrear">Rastrear pedido</a></li>
            <li><a href="#devolucoes">Devoluções</a></li>
          </ul>
        </div>

        {/* COLUNA 3: FABRICANTES */}
        <div className={styles.colunaLinks}>
          <h4>FABRICANTES</h4>
          <ul>
            <li>
              <button 
                className={styles.btnLink} 
                onClick={() => setPaginaAtual && setPaginaAtual('fornecedor')}
              >
                Cadastrar empresa
              </button>
            </li>
            <li><a href="#painel">Painel do fornecedor</a></li>
            <li><a href="#regras">Regras da plataforma</a></li>
            <li><a href="#comissoes">Comissões</a></li>
          </ul>
        </div>

        {/* COLUNA 4: EMPRESA */}
        <div className={styles.colunaLinks}>
          <h4>EMPRESA</h4>
          <ul>
            <li><a href="#sobre">Sobre a Velo-Closet</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#carreiras">Carreiras</a></li>
            <li><a href="#imprensa">Imprensa</a></li>
          </ul>
        </div>
      </div>

      {/* BARRA INFERIOR DE DIREITOS E TERMOS */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>© 2025 Velo-Closet Tecnologia Ltda. — CNPJ 00.000.000/0001-00</p>
          <div className={styles.legalLinks}>
            <a href="#privacidade">Privacidade</a>
            <a href="#termos">Termos</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}