import React, { useState } from 'react';
import styles from './DetalhesProdutos.module.css';

export default function DetalhesProdutos({ produto, setPaginaAtual }) {
  const [tamanho, setTamanho] = useState('M');

  const prod = produto || {
    titulo: 'Calça Baggy Wide Leg com Corrente',
    categoria: 'CALÇAS',
    avaliacao: '4.8',
    avaliacoesQtd: 128,
    precoOriginal: '159,90',
    precoMinimo: '129,90',
    imagem: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500'
  };

  const fornecedores = [
    { id: 1, nome: 'Confecção do Sul', melhorPreco: true, cidade: 'Porto Alegre, RS', avaliacao: '4.9', prazo: '3-5 dias', preco: '129,90', frete: 'Grátis' },
    { id: 2, nome: 'Têxtil SP', melhorPreco: false, cidade: 'São Paulo, SP', avaliacao: '4.7', prazo: '2-4 dias', preco: '144,90', frete: 'R$ 12,00' },
    { id: 3, nome: 'Têxtil Norte', melhorPreco: false, cidade: 'Fortaleza, CE', avaliacao: '4.8', prazo: '5-7 dias', preco: '155,00', frete: 'R$ 15,00' }
  ];

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => setPaginaAtual('home')}>
        ← Voltar para Roupas
      </button>

      <div className={styles.mainGrid}>
        <div className={styles.imageSection}>
          <img src={prod.imagem} alt={prod.titulo} className={styles.mainImage} />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.category}>{prod.categoria} — STREETWEAR</span>
          <h1>{prod.titulo}</h1>
          <div className={styles.rating}>★ {prod.avaliacao} ({prod.avaliacoesQtd} avaliações)</div>

          <div className={styles.priceContainer}>
            <h2>R$ {prod.precoMinimo}</h2>
            <span className={styles.oldPrice}>R$ {prod.precoOriginal}</span>
            <p className={styles.sellerCount}>Vendido por <strong>Confecção do Sul</strong> e outros 4 fornecedores</p>
          </div>

          <p className={styles.description}>
            Modelagem oversized com tecido resistente de alta qualidade. Costuras reforçadas e acabamento premium.
          </p>

          <div className={styles.sizeSelector}>
            <label>Tamanho: <strong>{tamanho}</strong></label>
            <div className={styles.sizes}>
              {['P', 'M', 'G', 'GG'].map((t) => (
                <button key={t} className={tamanho === t ? styles.selectedSize : ''} onClick={() => setTamanho(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.buyNowBtn}>🛒 Comprar Agora</button>
            <button className={styles.addCartBtn}>Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>

      <section className={styles.suppliersSection}>
        <h3>COMPARAÇÃO DE PREÇOS</h3>
        <h2>{fornecedores.length + 2} fornecedores disponíveis para este produto</h2>

        <div className={styles.suppliersList}>
          {fornecedores.map((f) => (
            <div key={f.id} className={styles.supplierCard}>
              <div>
                <strong>{f.nome}</strong> {f.melhorPreco && <span className={styles.bestPriceTag}>MELHOR PREÇO</span>}
                <p>📍 {f.cidade} • ★ {f.avaliacao} • 🚚 {f.prazo}</p>
              </div>
              <div className={styles.supplierPrice}>
                <span className={styles.price}>R$ {f.preco}</span>
                <p>Frete: {f.frete}</p>
                <button className={styles.selectSupplierBtn}>{f.melhorPreco ? 'Selecionado' : 'Selecionar'}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}