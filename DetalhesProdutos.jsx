import React, { useState } from 'react';

export default function DetalhesProdutos({ produto, adicionarAoCarrinho, voltar, usuarioLogado, irParaLogin }) {
  if (!produto) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
        <h2>Nenhum produto selecionado.</h2>
        <button 
          type="button"
          onClick={voltar}
          style={{ marginTop: '20px', padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          Voltar ao Catálogo
        </button>
      </div>
    );
  }

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('P');

  const handleComprar = () => {
    if (!usuarioLogado) {
      alert('Você precisa estar cadastrado e logado para comprar!');
      if (irParaLogin) irParaLogin();
      return;
    }

    const itemParaCarrinho = {
      ...produto,
      tamanhoSelecionado: tamanhoSelecionado
    };
    if (adicionarAoCarrinho) {
      adicionarAoCarrinho(itemParaCarrinho, tamanhoSelecionado);
    }
    alert('Produto adicionado ao carrinho com sucesso!');
  };

  return (
    <div style={{ padding: '30px 40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <button 
        type="button"
        onClick={voltar}
        style={{ marginBottom: '20px', padding: '8px 16px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
      >
        ← Voltar ao Catálogo
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div>
          <img 
            src={produto.imagem || 'https://via.placeholder.com/400'} 
            alt={produto.titulo || produto.nome} 
            style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', maxHeight: '400px' }} 
          />
        </div>

        <div>
          <span style={{ fontSize: '12px', background: '#eff6ff', color: '#2563eb', padding: '4px 8px', borderRadius: '4px', fontWeight: '600' }}>
            Vendido e entregue por: {produto.fabricante || 'Fabricante'} ({produto.local || 'Brasil'})
          </span>
          <h1 style={{ fontSize: '26px', color: '#1e293b', margin: '15px 0 10px 0' }}>{produto.titulo || produto.nome}</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>{produto.descricao || 'Peça exclusiva cadastrada pela confecção parceira.'}</p>

          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a', margin: '0 0 20px 0' }}>
            R$ {Number(produto.precoMinimo || produto.preco || 0).toFixed(2)}
          </p>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#334155' }}>Selecione o Tamanho:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['P', 'M', 'G', 'GG'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTamanhoSelecionado(t)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: tamanhoSelecionado === t ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    background: tamanhoSelecionado === t ? '#eff6ff' : '#fff',
                    color: tamanhoSelecionado === t ? '#2563eb' : '#334155',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleComprar}
            style={{ width: '100%', padding: '14px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}