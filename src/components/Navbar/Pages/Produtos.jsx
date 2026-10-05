import React, { useState } from 'react';
import styles from './Produtos.module.css';

export default function Produtos() {
  const [categoria, setCategoria] = useState('todas');

  const listaProdutos = [
    {
      id: 1,
      nome: 'Calça Jeans Wide Leg',
      categoria: 'calcas',
      precoOriginal: 120.00,
      precoPromocional: 89.90,
      confeccao: 'Confecção Silva & Cia',
      local: 'Fortaleza - CE',
      imagem: 'https://via.placeholder.com/250x300?text=Calca+Jeans'
    },
    {
      id: 2,
      nome: 'Blusa Canelada Manga Curta',
      categoria: 'blusas',
      precoOriginal: 55.00,
      precoPromocional: 34.90,
      confeccao: 'Ateliê Moda Leve',
      local: 'São Paulo - SP',
      imagem: 'https://via.placeholder.com/250x300?text=Blusa+Canelada'
    },
    {
      id: 3,
      nome: 'Vestido Midi Linho',
      categoria: 'vestidos',
      precoOriginal: 180.00,
      precoPromocional: 129.90,
      confeccao: 'Confecção Sol Nascente',
      local: 'Goiânia - GO',
      imagem: 'https://via.placeholder.com/250x300?text=Vestido+Midi'
    },
    {
      id: 4,
      nome: 'Conjunto Alfaiataria Feminino',
      categoria: 'conjuntos',
      precoOriginal: 210.00,
      precoPromocional: 149.90,
      confeccao: 'Estilo & Corte',
      local: 'Caruaru - PE',
      imagem: 'https://via.placeholder.com/250x300?text=Conjunto'
    }
  ];

  const produtosFiltrados = listaProdutos.filter((p) => {
    return categoria === 'todas' || p.categoria === categoria;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Catálogo de Produtos</h1>
        <p>Compare preços diretamente das pequenas confecções de todo o Brasil</p>
      </header>

      {/* CATEGORIAS / ABAS */}
      <div className={styles.filtrosBarra}>
        <div className={styles.categorias}>
          <button 
            className={categoria === 'todas' ? styles.ativo : ''} 
            onClick={() => setCategoria('todas')}
          >
            Todos
          </button>
          <button 
            className={categoria === 'calcas' ? styles.ativo : ''} 
            onClick={() => setCategoria('calcas')}
          >
            Calças
          </button>
          <button 
            className={categoria === 'blusas' ? styles.ativo : ''} 
            onClick={() => setCategoria('blusas')}
          >
            Blusas
          </button>
          <button 
            className={categoria === 'vestidos' ? styles.ativo : ''} 
            onClick={() => setCategoria('vestidos')}
          >
            Vestidos
          </button>
          <button 
            className={categoria === 'conjuntos' ? styles.ativo : ''} 
            onClick={() => setCategoria('conjuntos')}
          >
            Conjuntos
          </button>
        </div>
      </div>

      {/* GRID DE PRODUTOS */}
      <div className={styles.gridProdutos}>
        {produtosFiltrados.map((prod) => (
          <div key={prod.id} className={styles.cardProduto}>
            <img src={prod.imagem} alt={prod.nome} className={styles.imgProduto} />
            <div className={styles.cardInfo}>
              <span className={styles.local}>{prod.local}</span>
              <h3>{prod.nome}</h3>
              <p className={styles.confeccao}>Por: <strong>{prod.confeccao}</strong></p>
              
              <div className={styles.precos}>
                <span className={styles.precoDe}>R$ {prod.precoOriginal.toFixed(2)}</span>
                <span className={styles.precoPor}>R$ {prod.precoPromocional.toFixed(2)}</span>
              </div>

              <button className={styles.btnComprar}>Ver Ofertas</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}