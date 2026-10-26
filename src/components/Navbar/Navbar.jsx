import React from 'react';

export default function Navbar({ paginaAtual, setPaginaAtual, usuarioLogado, setUsuarioLogado, qtdCarrinho }) {
  // Cada tipo de usuário vai para a tela que o App.jsx realmente tem
  const irParaAreaDoUsuario = () => {
    if (!usuarioLogado) {
      setPaginaAtual('login');
    } else if (usuarioLogado.tipo === 'fornecedor') {
      setPaginaAtual('fornecedor');
    } else if (usuarioLogado.tipo === 'admin') {
      setPaginaAtual('painelAdmin');
    } else {
      setPaginaAtual('rastreio'); // área do cliente: acompanhar pedidos
    }
  };

  const sair = () => {
    setUsuarioLogado(null);
    setPaginaAtual('home');
  };

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Segoe UI, sans-serif' }}>

      {/* Logo Velo Closet - Redireciona para a Home */}
      <div
        onClick={() => setPaginaAtual('home')}
        style={{ fontSize: '22px', fontWeight: 'bold', color: '#2563eb', cursor: 'pointer', letterSpacing: '1px' }}
      >
        VELO-CLOSET
      </div>

      {/* Campo de Busca */}
      <div style={{ display: 'flex', gap: '10px', flex: 1, maxWidth: '450px', margin: '0 20px' }}>
        <input
          type="text"
          placeholder="O que você está procurando hoje?"
          style={{ width: '100%', padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
        />
        <button style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
          Buscar
        </button>
      </div>

      {/* Botões de Navegação */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>

        {/* Área do Cliente / Login */}
        <button
          onClick={irParaAreaDoUsuario}
          style={{ padding: '8px 16px', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
        >
          {usuarioLogado ? `Olá, ${usuarioLogado.nome.split(' ')[0]}` : 'Área do Cliente'}
        </button>

        {usuarioLogado && (
          <button
            onClick={sair}
            style={{ padding: '8px 16px', background: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
          >
            Sair
          </button>
        )}

        {/* Carrinho */}
        <button
          onClick={() => setPaginaAtual('carrinho')}
          style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          Carrinho ({qtdCarrinho || 0})
        </button>

        {/* Sou Fabricante: sem login mostra planos/cadastro; logado como fornecedor abre o painel */}
        <button
          onClick={() => setPaginaAtual('fornecedor')}
          style={{ padding: '8px 16px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
        >
          Sou Fabricante
        </button>

      </div>
    </nav>
  );
}