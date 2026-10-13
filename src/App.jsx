import React, { useState } from 'react';

// Importação dos componentes e páginas do projeto
import Navbar from './components/Navbar/Navbar';
import Home from './components/Navbar/Pages/Home';
import Produtos from './components/Navbar/Pages/Produtos';
import Login from './components/Navbar/Pages/Login';
import PainelFornecedor from './components/Navbar/Pages/PainelFornecedor';
import DetalhesProdutos from './components/Navbar/Pages/DetalhesProdutos';
import Footer from './components/Navbar/Footer/Footer';
import FormasPagamento from './components/Navbar/Pages/FormasPagamento';

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Navbar principal com os botões de navegação */}
      <Navbar setPaginaAtual={setPaginaAtual} />

      {/* Conteúdo dinâmico alternado pelo estado paginaAtual */}
      <main style={{ flex: 1 }}>
        {paginaAtual === 'home' && <Home setPaginaAtual={setPaginaAtual} />}
        {paginaAtual === 'produtos' && <Produtos setPaginaAtual={setPaginaAtual} />}
        {paginaAtual === 'login' && <Login setPaginaAtual={setPaginaAtual} />}
        {paginaAtual === 'fornecedor' && <PainelFornecedor />}
        {paginaAtual === 'pagamento' && <FormasPagamento setPaginaAtual={setPaginaAtual} />}
        {paginaAtual === 'detalhes' && <DetalhesProdutos setPaginaAtual={setPaginaAtual} />}
      </main>

      {/* Rodapé com links funcionais */}
      <Footer setPaginaAtual={setPaginaAtual} />
    </div>
  );
}