import React, { useState } from 'react';
import styles from './DetalhesProdutos.module.css';

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
                  {t}
                </button>
              ))}
            </div>
          </div>

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}