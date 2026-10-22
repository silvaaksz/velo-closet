import React, { useState } from 'react';
import styles from './DetalhesProdutos.module.css';
<<<<<<< HEAD

export default function DetalhesProdutos({ produto, setPaginaAtual, adicionarAoCarrinho }) {
  // Inicializa o fornecedor selecionado com o primeiro da lista ou o principal
  const listaFornecedores = produto.fornecedores && produto.fornecedores.length > 0 
    ? produto.fornecedores 
    : [{ id: 999, nome: produto.fabricante, cidade: produto.local, avaliacao: '4.9', prazo: '3-5 dias', preco: produto.precoMinimo, frete: 'Grátis', melhorPreco: true }];

  const [fornecedorSelecionado, setFornecedorSelecionado] = useState(listaFornecedores[0]);
  const [tamanho, setTamanho] = useState('M');

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => setPaginaAtual('produtos')}>
        ← Voltar para o Catálogo
      </button>

      <div className={styles.gridMain}>
        {/* Imagem do Produto */}
        <div className={styles.imageBox}>
          <img src={produto.imagem} alt={produto.titulo} className={styles.productImg} />
        </div>

        {/* Detalhes Principais */}
        <div className={styles.infoBox}>
          <span className={styles.categoriaTag}>{produto.categoria}</span>
          <h2>{produto.titulo}</h2>
          <p className={styles.descricao}>{produto.descricao}</p>

          <div className={styles.tamanhoBox}>
            <label>Selecione o Tamanho:</label>
            <div className={styles.tamanhosBtns}>
              {['P', 'M', 'G', 'GG'].map((t) => (
                <button
                  key={t}
                  className={`${styles.btnTamanho} ${tamanho === t ? styles.tamanhoAtivo : ''}`}
                  onClick={() => setTamanho(t)}
                >
=======
import baggyImg from '../../../assets/baggy.jpg'; // Importa a imagem real

export default function DetalhesProdutos({ setPaginaAtual }) {
  const [tamanho, setTamanho] = useState('M');

  const prod = {
    titulo: 'Calça Baggy Wide Leg com Corrente',
    categoria: 'CALÇAS',
    avaliacao: '4.8',
    avaliacoesQtd: 128,
    precoOriginal: '159,90',
    precoMinimo: '129,90',
    imagem: baggyImg // Usa a imagem local do assets
  };

  const fornecedores = [
    { id: 1, nome: 'Confecção do Sul', melhorPreco: true, cidade: 'Porto Alegre, RS', avaliacao: '4.9', prazo: '3-5 dias', preco: '129,90', frete: 'Grátis' },
    { id: 2, nome: 'Têxtil SP', melhorPreco: false, cidade: 'São Paulo, SP', avaliacao: '4.7', prazo: '2-4 dias', preco: '144,90', frete: 'R$ 12,00' },
    { id: 3, nome: 'Têxtil Norte', melhorPreco: false, cidade: 'Fortaleza, CE', avaliacao: '4.8', prazo: '5-7 dias', preco: '155,00', frete: 'R$ 15,00' }
  ];

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => setPaginaAtual('produtos')}>
        ← Voltar para Produtos
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
            <p className={styles.sellerCount}>Vendido por <strong>Confecção do Sul</strong> e outros 2 fornecedores</p>
          </div>

          <p className={styles.description}>
            Modelagem oversized com tecido resistente de alta qualidade. Costuras reforçadas e acabamento premium.
          </p>

          <div className={styles.sizeSelector}>
            <label>Tamanho: <strong>{tamanho}</strong></label>
            <div className={styles.sizes}>
              {['P', 'M', 'G', 'GG'].map((t) => (
                <button key={t} className={tamanho === t ? styles.selectedSize : ''} onClick={() => setTamanho(t)}>
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
                  {t}
                </button>
              ))}
            </div>
          </div>

<<<<<<< HEAD
          <div className={styles.precoDestaque}>
            <span>Preço Selecionado:</span>
            <h3>R$ {fornecedorSelecionado.preco.toFixed(2).replace('.', ',')}</h3>
            <p className={styles.freteInfo}>Frete: {fornecedorSelecionado.frete} ({fornecedorSelecionado.cidade})</p>
          </div>

          <button 
            className={styles.btnAdicionar}
            onClick={() => adicionarAoCarrinho(produto, tamanho, fornecedorSelecionado)}
          >
            🛒 Adicionar ao Carrinho ({fornecedorSelecionado.nome})
          </button>
        </div>
      </div>

      {/* Lista de Confecções / Fornecedores Disponíveis */}
      <div className={styles.secaoFornecedores}>
        <h3>Comparar Ofertas de Confecções Parceiras</h3>
        <p>Escolha a melhor opção de preço, localização ou prazo de entrega para o seu pedido:</p>

        <div className={styles.listaFornecedores}>
          {listaFornecedores.map((f) => (
            <div 
              key={f.id} 
              className={`${styles.cardFornecedor} ${fornecedorSelecionado.id === f.id ? styles.fornecedorSelecionado : ''}`}
              onClick={() => setFornecedorSelecionado(f)}
            >
              <div className={styles.fornecedorHeader}>
                <strong>{f.nome}</strong>
                {f.melhorPreco && <span className={styles.badgePreco}>Melhor Preço</span>}
              </div>
              <p>📍 {f.cidade} • ⭐ {f.avaliacao}</p>
              <p>🚚 Entrega: {f.prazo} ({f.frete})</p>
              <div className={styles.fornecedorPreco}>
                <span>R$ {f.preco.toFixed(2).replace('.', ',')}</span>
                <button className={styles.btnEscolher}>
                  {fornecedorSelecionado.id === f.id ? '✓ Selecionado' : 'Selecionar'}
                </button>
=======
          <div className={styles.actions}>
            <button className={styles.buyNowBtn}>🛒 Comprar Agora</button>
            <button className={styles.addCartBtn}>Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>

      <section className={styles.suppliersSection}>
        <h3>COMPARAÇÃO DE PREÇOS</h3>
        <h2>{fornecedores.length} fornecedores disponíveis para este produto</h2>

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
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
              </div>
            </div>
          ))}
        </div>
<<<<<<< HEAD
      </div>
=======
      </section>
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
    </div>
  );
}