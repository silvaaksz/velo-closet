import React, { useState } from 'react';

<<<<<<< HEAD
=======
// Importação dos componentes e páginas do projeto
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
import Navbar from './components/Navbar/Navbar';
import Home from './components/Navbar/Pages/Home';
import Produtos from './components/Navbar/Pages/Produtos';
import Login from './components/Navbar/Pages/Login';
<<<<<<< HEAD
import Cadastro from './components/Navbar/Pages/Cadastro';
import PainelFornecedor from './components/Navbar/Pages/PainelFornecedor';
import PainelAdmin from './components/Navbar/Pages/PainelAdmin';
import DetalhesProdutos from './components/Navbar/Pages/DetalhesProdutos';
import Carrinho from './components/Navbar/Pages/Carrinho';
import FormasPagamento from './components/Navbar/Pages/FormasPagamento';
import RastreioDevolucao from './components/Navbar/Pages/RastreioDevolucao';
import Footer from './components/Navbar/Footer/Footer';

// Imagens default importadas do assets
import baggyImg from './assets/baggy.jpg';
import cropedImg from './assets/croped.jpg';
import jaquetaImg from './assets/jaqueta.jpg';
import vestidoImg from './assets/vestido.jpg';

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carrinho, setCarrinho] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Lista de utilizadores cadastrados (UC01 / UC02)
  const [usuariosCadastrados, setUsuariosCadastrados] = useState([
    { nome: 'Admin Master', email: 'admin@velocloset.com.br', senha: '123', tipo: 'admin' },
    { nome: 'Confecção Silva', email: 'fornecedor@silva.com', senha: '123', tipo: 'fornecedor', cnpj: '12.345.678/0001-90' },
    { nome: 'Cliente Teste', email: 'cliente@teste.com', senha: '123', tipo: 'cliente' }
  ]);

  // Lista de produtos com múltiplos fornecedores e Código Global EAN (UC08, UC09, UC10)
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      ean: '7891029384756',
      titulo: 'Calça Jeans Balloon Masculina',
      categoria: 'CALÇAS',
      local: 'Fortaleza - CE',
      fabricante: 'Confecção Silva & Cia',
      estoque: 45,
      precoMinimo: 89.9,
      imagem: baggyImg,
      descricao: 'Modelagem oversized com tecido resistente de alta qualidade.',
      fornecedores: [
        { id: 101, nome: 'Confecção Silva & Cia', cidade: 'Fortaleza, CE', avaliacao: '4.9', prazo: '3-5 dias', preco: 89.9, frete: 'Grátis', melhorPreco: true },
        { id: 102, nome: 'Têxtil SP Jeans', cidade: 'São Paulo, SP', avaliacao: '4.7', prazo: '2-4 dias', preco: 105.0, frete: 'R$ 12,00', melhorPreco: false }
      ]
    },
    {
      id: 2,
      ean: '7899876543210',
      titulo: 'Cropped Canelado Manga Longa',
      categoria: 'BLUSAS',
      local: 'São Paulo - SP',
      fabricante: 'Ateliê Moda Leve',
      estoque: 30,
      precoMinimo: 34.9,
      imagem: cropedImg,
      descricao: 'Cropped canelado super confortável para o dia a dia.',
      fornecedores: [
        { id: 201, nome: 'Ateliê Moda Leve', cidade: 'São Paulo, SP', avaliacao: '4.8', prazo: '2-3 dias', preco: 34.9, frete: 'R$ 8,00', melhorPreco: true },
        { id: 202, nome: 'Confecção Malhas Sul', cidade: 'Brusque, SC', avaliacao: '4.9', prazo: '3-5 dias', preco: 39.9, frete: 'Grátis', melhorPreco: false }
      ]
    },
    {
      id: 3,
      ean: '7894561230147',
      titulo: 'Vestido Midi Florido',
      categoria: 'VESTIDOS',
      local: 'Goiânia - GO',
      fabricante: 'Confecção Sol Nascente',
      estoque: 20,
      precoMinimo: 129.9,
      imagem: vestidoImg,
      descricao: 'Vestido florido em linho puro, leve e elegante.',
      fornecedores: [
        { id: 301, nome: 'Confecção Sol Nascente', cidade: 'Goiânia, GO', avaliacao: '4.9', prazo: '4-6 dias', preco: 129.9, frete: 'Grátis', melhorPreco: true }
      ]
    },
    {
      id: 4,
      ean: '7897894561230',
      titulo: 'Jaqueta Jeans UNISEX',
      categoria: 'JAQUETAS',
      local: 'Caruaru - PE',
      fabricante: 'Estilo & Corte',
      estoque: 15,
      precoMinimo: 149.9,
      imagem: jaquetaImg,
      descricao: 'Jaqueta jeans unissex com corte moderno e botões reforçados.',
      fornecedores: [
        { id: 401, nome: 'Estilo & Corte', cidade: 'Caruaru, PE', avaliacao: '4.8', prazo: '3-5 dias', preco: 149.9, frete: 'R$ 15,00', melhorPreco: true },
        { id: 402, nome: 'Jeanswear Paulistana', cidade: 'São Paulo, SP', avaliacao: '4.9', prazo: '2-3 dias', preco: 159.9, frete: 'Grátis', melhorPreco: false }
      ]
    }
  ]);

  const [pedidosHistorico, setPedidosHistorico] = useState([]);
  const [disputasSac, setDisputasSac] = useState([
    { id: 101, cliente: 'Cliente Teste', pedido: 'VC987654BR', motivo: 'Atraso na entrega', status: 'Em Mediação pelo Admin' }
  ]);

  // Função UC01 (Cadastrar-se)//
  const registrarUsuario = (novoUser) => {
    const existe = usuariosCadastrados.find((u) => u.email === novoUser.email);
    if (existe) {
      alert('E-mail ou Documento já cadastrado na plataforma!');
      return false;
    }
    setUsuariosCadastrados([...usuariosCadastrados, novoUser]);
    alert('Conta criada com sucesso!');
    setPaginaAtual('login');
    return true;
  };

  // Função UC02 (Fazer Login)//
  const realizarLogin = (email, senha) => {
    const user = usuariosCadastrados.find((u) => u.email === email && u.senha === senha);
    if (!user) {
      alert('Credenciais inválidas ou utilizador não cadastrado.');
      return;
    }
    setUsuarioLogado(user);
    alert(`Bem-vindo(a), ${user.nome}!`);
    if (user.tipo === 'admin') setPaginaAtual('painelAdmin');
    else if (user.tipo === 'fornecedor') setPaginaAtual('fornecedor');
    else setPaginaAtual('home');
  };

  // Função UC03 (Gerenciar Carrinho)//
  const adicionarAoCarrinho = (produto, tamanho = 'M', fornecedorSel = null) => {
    const fornecedor = fornecedorSel || produto.fornecedores[0];
    const item = {
      idCarrinho: Date.now(),
      id: produto.id,
      titulo: produto.titulo,
      preco: fornecedor.preco,
      fornecedor: fornecedor.nome,
      imagem: produto.imagem,
      tamanho,
      quantidade: 1
    };
    setCarrinho((prev) => [...prev, item]);
    alert(`"${produto.titulo}" adicionado ao carrinho.`);
  };

  const removerDoCarrinho = (idCarrinho) => {
    setCarrinho((prev) => prev.filter((item) => item.idCarrinho !== idCarrinho));
  };

  // Função UC08 & UC09 (Gerenciar Catálogo)//
  const adicionarNovoProduto = (novoProd) => {
    const produtoFormatado = {
      id: Date.now(),
      ean: novoProd.ean || '789' + Math.floor(1000000000 + Math.random() * 900000000),
      titulo: novoProd.titulo,
      categoria: novoProd.categoria.toUpperCase(),
      local: novoProd.local,
      fabricante: novoProd.fabricante,
      estoque: parseInt(novoProd.estoque) || 10,
      precoMinimo: parseFloat(novoProd.preco),
      imagem: novoProd.imagem || baggyImg,
      descricao: novoProd.descricao,
      fornecedores: [
        {
          id: Date.now() + 1,
          nome: novoProd.fabricante,
          cidade: novoProd.local,
          avaliacao: '5.0',
          prazo: '3-5 dias',
          preco: parseFloat(novoProd.preco),
          frete: 'Grátis',
          melhorPreco: true
        }
      ]
    };
    setProdutos((prev) => [produtoFormatado, ...prev]);
    alert('Produto cadastrado e vinculado ao Código Global com sucesso!');
    setPaginaAtual('produtos');
  };

  const abrirDetalhes = (prod) => {
    setProdutoSelecionado(prod);
    setPaginaAtual('detalhes');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Navbar 
        setPaginaAtual={setPaginaAtual} 
        qtdCarrinho={carrinho.length} 
        usuarioLogado={usuarioLogado} 
        setUsuarioLogado={setUsuarioLogado}
      />

      <main style={{ flex: 1 }}>
        {paginaAtual === 'home' && <Home setPaginaAtual={setPaginaAtual} />}
        
        {paginaAtual === 'produtos' && (
          <Produtos 
            produtos={produtos} 
            abrirDetalhes={abrirDetalhes} 
            adicionarAoCarrinho={adicionarAoCarrinho} 
          />
        )}

        {paginaAtual === 'detalhes' && (
          <DetalhesProdutos 
            produto={produtoSelecionado || produtos[0]} 
            setPaginaAtual={setPaginaAtual} 
            adicionarAoCarrinho={adicionarAoCarrinho} 
          />
        )}

        {paginaAtual === 'login' && (
          <Login 
            setPaginaAtual={setPaginaAtual} 
            realizarLogin={realizarLogin} 
          />
        )}

        {paginaAtual === 'cadastro' && (
          <Cadastro 
            setPaginaAtual={setPaginaAtual} 
            registrarUsuario={registrarUsuario} 
          />
        )}

        {paginaAtual === 'carrinho' && (
          <Carrinho 
            carrinho={carrinho} 
            removerDoCarrinho={removerDoCarrinho} 
            setPaginaAtual={setPaginaAtual} 
            setCarrinho={setCarrinho}
            setPedidosHistorico={setPedidosHistorico}
            usuarioLogado={usuarioLogado}
          />
        )}

        {paginaAtual === 'fornecedor' && (
          <PainelFornecedor 
            adicionarNovoProduto={adicionarNovoProduto}
            produtos={produtos}
            setProdutos={setProdutos}
          />
        )}

        {paginaAtual === 'painelAdmin' && (
          <PainelAdmin 
            usuariosCadastrados={usuariosCadastrados}
            disputasSac={disputasSac}
            setDisputasSac={setDisputasSac}
          />
        )}

        {paginaAtual === 'pagamento' && <FormasPagamento setPaginaAtual={setPaginaAtual} />}

        {(paginaAtual === 'rastreio' || paginaAtual === 'devolucao') && (
          <RastreioDevolucao 
            abaInicial={paginaAtual} 
            setPaginaAtual={setPaginaAtual}
            pedidosHistorico={pedidosHistorico}
            setDisputasSac={setDisputasSac}
          />
        )}
      </main>

=======
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
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
      <Footer setPaginaAtual={setPaginaAtual} />
    </div>
  );
}