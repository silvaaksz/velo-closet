import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Navbar/Pages/Home';
import Produtos from './components/Navbar/Pages/Produtos';
import Footer from './components/Footer/Footer';

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Navbar setPaginaAtual={setPaginaAtual} />

      <main style={{ flex: 1 }}>
        {paginaAtual === 'home' && <Home setPaginaAtual={setPaginaAtual} />}
        {paginaAtual === 'produtos' && <Produtos />}
      </main>

      <Footer setPaginaAtual={setPaginaAtual} />
    </div>
  );
}