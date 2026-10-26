import React, { useState } from 'react';

const brl = (v) => Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function DetalhesProdutos({ produto, adicionarAoCarrinho, voltar, usuarioLogado, irParaLogin }) {
  // Hooks sempre ficam antes de qualquer "return" antecipado
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('P');
  const [ofertaEscolhidaId, setOfertaEscolhidaId] = useState(null);

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

  // Lojas que vendem este produto, da mais barata para a mais cara
  const lojas = [...(produto.fornecedores || [])].sort((a, b) => a.preco - b.preco);
  const menorPreco = lojas.find((l) => l.estoque > 0)?.preco ?? lojas[0]?.preco ?? 0;

  // Oferta escolhida pelo cliente; se não escolheu (ou ela esgotou), usa a mais barata disponível
  const escolhida =
    lojas.find((l) => l.id === ofertaEscolhidaId && l.estoque > 0) ||
    lojas.find((l) => l.estoque > 0) ||
    lojas[0];

  const esgotado = !escolhida || escolhida.estoque <= 0;

  const handleComprar = () => {
    if (!usuarioLogado) {
      alert('Você precisa estar cadastrado e logado para comprar!');
      if (irParaLogin) irParaLogin();
      return;
    }
    // O App já avisa "adicionado ao carrinho"
    if (adicionarAoCarrinho) {
      adicionarAoCarrinho(produto, tamanhoSelecionado, escolhida);
    }
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
            Vendido e entregue por: {escolhida?.nome || 'Fabricante'} ({escolhida?.cidade || 'Brasil'})
          </span>
          <h1 style={{ fontSize: '26px', color: '#1e293b', margin: '15px 0 10px 0' }}>{produto.titulo || produto.nome}</h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>{produto.descricao || 'Peça exclusiva cadastrada pela confecção parceira.'}</p>

          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a', margin: '0 0 8px 0' }}>
            {brl(escolhida?.preco)}
          </p>
          <p style={{ margin: '0 0 20px 0', fontSize: '13px', fontWeight: 600, color: esgotado ? '#dc2626' : '#475569' }}>
            {esgotado ? 'Esgotado nesta loja' : `${escolhida.estoque} em estoque nesta loja`}
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
            disabled={esgotado}
            style={{ width: '100%', padding: '14px', background: esgotado ? '#cbd5e1' : '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: esgotado ? 'not-allowed' : 'pointer' }}
          >
            {esgotado ? 'Produto esgotado' : 'Adicionar ao Carrinho'}
          </button>
        </div>
      </div>

      {/* Comparação de preços entre lojas */}
      <div style={{ marginTop: '30px', background: '#fff', padding: '25px 30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '18px', color: '#1e293b', margin: '0 0 4px 0' }}>
          Compare preços entre lojas
        </h2>
        <p style={{ margin: '0 0 18px 0', fontSize: '13px', color: '#64748b' }}>
          {lojas.length > 1
            ? `${lojas.length} lojas vendem este produto. Escolha a que preferir.`
            : 'No momento só uma loja vende este produto.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {lojas.map((loja) => {
            const semEstoque = loja.estoque <= 0;
            const selecionada = escolhida && loja.id === escolhida.id;
            const diferenca = loja.preco - menorPreco;

            return (
              <button
                key={loja.id}
                type="button"
                disabled={semEstoque}
                onClick={() => setOfertaEscolhidaId(loja.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                  textAlign: 'left',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: selecionada ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  background: selecionada ? '#eff6ff' : '#fff',
                  opacity: semEstoque ? 0.55 : 1,
                  cursor: semEstoque ? 'not-allowed' : 'pointer',
                  font: 'inherit'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <strong style={{ color: '#1e293b', fontSize: '15px' }}>{loja.nome}</strong>
                    {loja.melhorPreco && (
                      <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                        Melhor preço
                      </span>
                    )}
                    {selecionada && (
                      <span style={{ background: '#2563eb', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                        Selecionada
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>
                    📍 {loja.cidade} · {semEstoque ? 'Esgotado' : `${loja.estoque} em estoque`}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#16a34a' }}>{brl(loja.preco)}</div>
                  {!semEstoque && diferenca > 0.004 && (
                    <div style={{ fontSize: '12px', color: '#b45309' }}>+ {brl(diferenca)} que o melhor preço</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}