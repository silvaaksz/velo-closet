import React from 'react';
import styles from './Produtos.module.css';

// Importação das tuas imagens da pasta assets
import baggyImg from '../../../assets/baggy.jpg';
import cropedImg from '../../../assets/croped.jpg';
import jaquetaImg from '../../../assets/jaqueta.jpg';
import vestidoImg from '../../../assets/vestido.jpg';

export default function Produtos({ setPaginaAtual }) {
  return (
    <div className={styles.container}>
      <h2>Catálogo de Produtos</h2>
      <p>Compare preços diretamente das pequenas confecções de todo o Brasil.</p>

      <div className={styles.grid}>
        {/* Produto 1 - Calça Baggy */}
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={baggyImg} alt="Calça Jeans Wide Leg" className={styles.productImg} />
          </div>
          <span className={styles.local}>Fortaleza - CE</span>
          <h3>Calça Jeans Wide Leg</h3>
          <p className={styles.fabricante}>Por: <strong>Confecção Silva & Cia</strong></p>
          <p className={styles.preco}>R$ 120,00 <span className={styles.precoDesconto}>R$ 89,90</span></p>
          <button className={styles.btnOfertas} onClick={() => setPaginaAtual('detalhes')}>
            Ver Ofertas
          </button>
        </div>

        {/* Produto 2 - Croped */}
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={cropedImg} alt="Blusa Canelada Manga Curta" className={styles.productImg} />
          </div>
          <span className={styles.local}>São Paulo - SP</span>
          <h3>Blusa Canelada Manga Curta</h3>
          <p className={styles.fabricante}>Por: <strong>Ateliê Moda Leve</strong></p>
          <p className={styles.preco}>R$ 55,00 <span className={styles.precoDesconto}>R$ 34,90</span></p>
          <button className={styles.btnOfertas} onClick={() => setPaginaAtual('detalhes')}>
            Ver Ofertas
          </button>
        </div>

        {/* Produto 3 - Vestido */}
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={vestidoImg} alt="Vestido Midi Linho" className={styles.productImg} />
          </div>
          <span className={styles.local}>Goiânia - GO</span>
          <h3>Vestido Midi Linho</h3>
          <p className={styles.fabricante}>Por: <strong>Confecção Sol Nascente</strong></p>
          <p className={styles.preco}>R$ 180,00 <span className={styles.precoDesconto}>R$ 129,90</span></p>
          <button className={styles.btnOfertas} onClick={() => setPaginaAtual('detalhes')}>
            Ver Ofertas
          </button>
        </div>

        {/* Produto 4 - Jaqueta */}
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img src={jaquetaImg} alt="Jaqueta Jeans" className={styles.productImg} />
          </div>
          <span className={styles.local}>Caruaru - PE</span>
          <h3>Jaqueta Jeans Oversized</h3>
          <p className={styles.fabricante}>Por: <strong>Estilo & Corte</strong></p>
          <p className={styles.preco}>R$ 210,00 <span className={styles.precoDesconto}>R$ 149,90</span></p>
          <button className={styles.btnOfertas} onClick={() => setPaginaAtual('detalhes')}>
            Ver Ofertas
          </button>
        </div>
      </div>
    </div>
  );
}