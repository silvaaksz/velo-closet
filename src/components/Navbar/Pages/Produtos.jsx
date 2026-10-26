import React, { useState } from 'react';
import styles from './Produtos.module.css';

// Agora os produtos vêm do App.jsx (mesma fonte do painel do fornecedor),
// então qualquer edição de preço ou estoque aparece aqui na hora.
export default function Produtos({ produtos = [], abrirDetalhes, verDetalhesProduto }) {
  const [termoBusca, setTermoBusca] = useState('');

  const aoClicar = (p) => {
    if (abrirDetalhes) abrirDetalhes(p);
    else if (verDetalhesProduto) verDetalhesProduto(p);
  };

  // Filtra os produtos pelo título ou pelo nome do fabricante/loja
  const produtosFiltrados = produtos.filter((p) => {
    const termo = termoBusca.toLowerCase();
    const titulo = (p.titulo || '').toLowerCase();
    const fabricante = (p.fabricante || '').toLowerCase();
    const nasLojas = (p.fornecedores || []).some((f) => (f.nome || '').toLowerCase().includes(termo));
    return titulo.includes(termo) || fabricante.includes(termo) || nasLojas;
  });

  return (
    <div style={{ padding: '30px 40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '26px', color: '#1e293b', margin: 0 }}>Catálogo de Produtos</h1>

        {/* Barra de Pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar peça ou loja (ex: Fashion Girl)..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '300px', fontSize: '14px' }}
        />
      </div>

      {produtosFiltrados.length === 0 ? (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '16px' }}>Nenhum produto encontrado no catálogo.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {produtosFiltrados.map((p) => (
            <div
              key={p.id}
              onClick={() => aoClicar(p)}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: p.estoque > 0 ? 1 : 0.6
              }}
            >
              <div>
                <img
                  src={p.imagem}
                  alt={p.titulo}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <div style={{ padding: '15px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#1e293b' }}>{p.titulo}</h3>
                  <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#64748b' }}>
                    {(p.fornecedores || []).length > 1 ? (
                      <strong style={{ color: '#2563eb' }}>Compare {p.fornecedores.length} lojas</strong>
                    ) : (
                      <>Vendido por: <strong>{p.fabricante || 'Confecção Parceira'}</strong></>
                    )}
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
                    📍 {p.local || 'Brasil'}
                  </p>
                  <p style={{ margin: '6px 0 0 0', fontSize: '12px', fontWeight: 600, color: p.estoque > 0 ? '#475569' : '#dc2626' }}>
                    {p.estoque > 0 ? `${p.estoque} em estoque` : 'Esgotado'}
                  </p>
                </div>
              </div>

              <div style={{ padding: '0 15px 15px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#16a34a' }}>
                  {(p.fornecedores || []).length > 1 && (
                    <small style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748b' }}>a partir de</small>
                  )}
                  R$ {Number(p.precoMinimo || 0).toFixed(2)}
                </span>
                <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '600' }}>Ver Detalhes →</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}