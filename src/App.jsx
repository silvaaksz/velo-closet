import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Importação dos componentes e páginas do projeto
import Navbar from './components/Navbar/Navbar';
import Home from './components/Navbar/Pages/Home';
import Produtos from './components/Navbar/Pages/Produtos';
import Login from './components/Navbar/Pages/Login';
import Cadastro from './components/Navbar/Pages/Cadastro';
import PainelFornecedor from './components/Navbar/Pages/PainelFornecedor';
import FornecedorPlanos from './components/Navbar/Pages/FornecedorPlanos';
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

const API = 'http://localhost:5000';

// fetch que explica o problema quando o servidor está desligado
const chamarApi = async (url, options) => {
  try {
    return await fetch(url, options);
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Confira se ele está rodando (node server.js) e tente de novo.');
  }
};

// Páginas que o App sabe mostrar (se o Navbar mandar outro nome, aparece um aviso em vez de tela em branco)
const PAGINAS_CONHECIDAS = [
  'home', 'produtos', 'detalhes', 'login', 'cadastro', 'carrinho',
  'fornecedor', 'painelAdmin', 'pagamento', 'rastreio', 'devolucao'
];

const imagemPorCategoria = {
  'CALÇAS': baggyImg,
  'BLUSAS': cropedImg,
  'JAQUETAS': jaquetaImg,
  'VESTIDOS': vestidoImg
};

// Converte uma linha do banco no formato que as páginas já esperam
const normalizarProduto = (row) => {
  const preco = Number(row.precoMinimo) || 0;
  const categoria = (row.categoria || '').toUpperCase();
  return {
    id: row.id,
    ean: row.ean || '',
    titulo: row.titulo,
    categoria,
    local: row.local || 'Brasil',
    fabricante: row.fabricante || 'Confecção Parceira',
    fornecedor_email: row.fornecedor_email || null,
    estoque: Number.isFinite(Number(row.estoque)) ? Number(row.estoque) : 0,
    precoMinimo: preco,
    imagem: row.imagem || imagemPorCategoria[categoria] || baggyImg,
    descricao: row.descricao || '',
    fornecedores: [
      {
        id: row.id * 10 + 1,
        nome: row.fabricante || 'Confecção Parceira',
        cidade: row.local || 'Brasil',
        avaliacao: '5.0',
        prazo: '3-5 dias',
        preco,
        frete: 'Grátis',
        melhorPreco: true
      }
    ]
  };
};

// ---------- Comparação de preços: junta ofertas do MESMO produto ----------
const semAcento = (t) =>
  String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();

// Mesmo EAN = mesmo produto. Sem EAN, usa o mesmo nome + categoria.
const chaveProduto = (o) => {
  const ean = String(o.ean || '').replace(/\D/g, '');
  return ean ? `ean:${ean}` : `nome:${semAcento(o.titulo)}|${o.categoria}`;
};

const cidadeDaOferta = (o, usuarios) => {
  const dono = usuarios.find((u) => (u.email || '').toLowerCase() === (o.fornecedor_email || '').toLowerCase());
  const end = dono?.endereco;
  return end?.cidade ? `${end.cidade}${end.uf ? ' - ' + end.uf : ''}` : 'Brasil';
};

// Recebe uma linha por fornecedor e devolve um produto por item, com a lista de lojas
const agruparProdutos = (ofertas, usuarios) => {
  const grupos = new Map();
  ofertas.forEach((o) => {
    const chave = chaveProduto(o);
    if (!grupos.has(chave)) grupos.set(chave, []);
    grupos.get(chave).push(o);
  });

  return Array.from(grupos.entries())
    .map(([chave, lista]) => {
      const base = [...lista].sort((a, b) => a.id - b.id)[0]; // cadastro mais antigo define título, foto e descrição

      const fornecedores = lista
        .map((o) => ({
          id: o.id,
          produtoId: o.id,
          nome: o.fabricante,
          cidade: cidadeDaOferta(o, usuarios),
          preco: o.precoMinimo,
          estoque: o.estoque,
          melhorPreco: false
        }))
        .sort((a, b) => a.preco - b.preco);

      const melhor = fornecedores.find((f) => f.estoque > 0);
      if (melhor) melhor.melhorPreco = true;
      const destaque = melhor || fornecedores[0];

      return {
        ...base,
        chave,
        precoMinimo: destaque.preco,
        estoque: fornecedores.reduce((soma, f) => soma + f.estoque, 0),
        fabricante: destaque.nome,
        local: destaque.cidade,
        fornecedores
      };
    })
    .sort((a, b) => b.id - a.id);
};

// useState que guarda o valor no navegador e sobrevive ao F5
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* armazenamento indisponível: segue sem persistir */
    }
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Estes dados agora sobrevivem ao F5
  const [usuarioLogado, setUsuarioLogado] = usePersistentState('vc_usuarioLogado', null);
  const [carrinho, setCarrinho] = usePersistentState('vc_carrinho', []);
  const [pedidosHistorico, setPedidosHistorico] = usePersistentState('vc_pedidos', []);
  const [disputasSac, setDisputasSac] = usePersistentState('vc_disputas', []);
  const [usuariosCadastrados, setUsuariosCadastrados] = usePersistentState('vc_usuarios', [
    { nome: 'Admin Master', email: 'admin@velocloset.com.br', senha: '123', tipo: 'admin' },
    { nome: 'Confecção Silva', email: 'fornecedor@silva.com', senha: '123', tipo: 'fornecedor', cnpj: '12.345.678/0001-90' },
    { nome: 'Cliente Teste', email: 'cliente@teste.com', senha: '123', tipo: 'cliente' }
  ]);

  // Ofertas: uma linha por produto de cada fornecedor, vinda do servidor
  const [ofertas, setOfertas] = useState([]);

  // Produtos do catálogo: ofertas do mesmo produto agrupadas para comparar preços
  const produtos = useMemo(() => agruparProdutos(ofertas, usuariosCadastrados), [ofertas, usuariosCadastrados]);

  const carregarProdutos = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/produtos`);
      const json = await res.json();
      if (json.message === 'success') {
        setOfertas((json.data || []).map(normalizarProduto));
      }
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  }, []);

  // Carrega ao abrir o app (inclusive depois do F5)
  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  // Recarrega sempre que o cliente abre o catálogo ou o fornecedor abre o painel
  useEffect(() => {
    if (paginaAtual === 'produtos' || paginaAtual === 'fornecedor') {
      carregarProdutos();
    }
  }, [paginaAtual, carregarProdutos]);

  const registrarUsuario = (novoUser) => {
    const emailNormalizado = (novoUser.email || '').trim().toLowerCase();
    const existe = usuariosCadastrados.find((u) => u.email.toLowerCase() === emailNormalizado);
    if (existe) {
      return { ok: false, erro: 'Este e-mail já está cadastrado na plataforma.' };
    }
    const userFinal = { ...novoUser, email: emailNormalizado };
    setUsuariosCadastrados([...usuariosCadastrados, userFinal]);

    if (userFinal.tipo === 'fornecedor') {
      // Empresa cadastrada já entra direto no painel
      setUsuarioLogado(userFinal);
      alert('Empresa cadastrada com sucesso! Bem-vindo(a) ao painel.');
      setPaginaAtual('fornecedor');
    } else {
      alert('Conta criada com sucesso! Faça login para continuar.');
      setPaginaAtual('login');
    }
    return { ok: true };
  };

  const realizarLogin = (email, senha) => {
    const user = usuariosCadastrados.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha);
    if (!user) {
      return { ok: false, erro: 'E-mail ou senha incorretos, ou conta não cadastrada.' };
    }
    setUsuarioLogado(user);
    if (user.tipo === 'admin') setPaginaAtual('painelAdmin');
    else if (user.tipo === 'fornecedor') setPaginaAtual('fornecedor');
    else setPaginaAtual('home');
    return { ok: true };
  };

  const adicionarAoCarrinho = (produto, tamanho = 'M', fornecedorSel = null) => {
    const estoqueDisponivel = fornecedorSel ? fornecedorSel.estoque : produto.estoque;
    if (estoqueDisponivel <= 0) {
      alert('Produto esgotado.');
      return;
    }
    const fornecedor = fornecedorSel || { preco: produto.precoMinimo, nome: produto.fabricante };
    const item = {
      idCarrinho: Date.now(),
      id: fornecedorSel?.produtoId ?? produto.id,
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

  // Salva no servidor e recarrega a lista. Lança erro para o painel mostrar a mensagem.
  const adicionarNovoProduto = async (novoProd) => {
    const estoqueNum = parseInt(novoProd.estoque, 10);
    const res = await chamarApi(`${API}/api/produtos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: novoProd.titulo,
        categoria: (novoProd.categoria || '').toUpperCase(),
        ean: novoProd.ean || null,
        precoMinimo: parseFloat(novoProd.preco),
        fabricante: novoProd.fabricante,
        fornecedor_email: usuarioLogado?.email || null,
        estoque: Number.isNaN(estoqueNum) ? 0 : estoqueNum,
        descricao: novoProd.descricao,
        imagem: novoProd.imagem || null
      })
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(json.error || 'Não foi possível cadastrar o produto.');
    }

    await carregarProdutos();
    alert('Produto cadastrado com sucesso!');
    setPaginaAtual('produtos');
  };

  // Editar preço/estoque: salva no servidor e atualiza o estado na hora
  const editarProduto = async (id, dados) => {
    const produto = ofertas.find((p) => p.id === id);
    const res = await chamarApi(`${API}/api/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: dados.titulo,
        categoria: dados.categoria,
        ean: dados.ean || null,
        descricao: dados.descricao,
        imagem: dados.imagem || null, // null = mantém a foto atual
        precoMinimo: dados.precoMinimo,
        estoque: dados.estoque,
        fornecedor_email: usuarioLogado?.email || null,
        fabricante: produto?.fabricante || usuarioLogado?.nome || null
      })
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(json.error || 'Não foi possível salvar a alteração.');
    }

    // Atualiza na hora a lista que o catálogo do cliente também lê
    setOfertas((prev) =>
      prev.map((p) =>
        p.id === id
          ? normalizarProduto({
              ...p,
              titulo: dados.titulo.trim(),
              categoria: dados.categoria,
              ean: dados.ean || '',
              descricao: dados.descricao,
              imagem: dados.imagem || p.imagem,
              precoMinimo: parseFloat(dados.precoMinimo),
              estoque: parseInt(dados.estoque, 10)
            })
          : p
      )
    );
  };

  const abrirDetalhes = (prod) => {
    setProdutoSelecionado(prod);
    setPaginaAtual('detalhes');
  };

  // Sempre usa a versão mais recente do produto (reflete edições do fornecedor)
  const produtoDetalhe =
    produtos.find((p) => p.chave === produtoSelecionado?.chave) || produtoSelecionado || produtos[0];

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

        {paginaAtual === 'detalhes' && produtoDetalhe && (
          <DetalhesProdutos
            produto={produtoDetalhe}
            setPaginaAtual={setPaginaAtual}
            adicionarAoCarrinho={adicionarAoCarrinho}
            usuarioLogado={usuarioLogado}
            voltar={() => setPaginaAtual('produtos')}
            irParaLogin={() => setPaginaAtual('login')}
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

        {paginaAtual === 'fornecedor' && usuarioLogado?.tipo !== 'fornecedor' && (
          <FornecedorPlanos
            realizarLogin={realizarLogin}
            registrarUsuario={registrarUsuario}
          />
        )}

        {paginaAtual === 'fornecedor' && usuarioLogado?.tipo === 'fornecedor' && (
          <PainelFornecedor
            adicionarNovoProduto={adicionarNovoProduto}
            editarProduto={editarProduto}
            produtos={ofertas}
            usuarioLogado={usuarioLogado}
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
            key={paginaAtual}
            abaInicial={paginaAtual}
            usuario={usuarioLogado}
            mudarPagina={setPaginaAtual}
            pedidos={pedidosHistorico.filter((p) => !p.cliente || p.cliente === usuarioLogado?.email)}
            setDisputasSac={setDisputasSac}
          />
        )}

        {!PAGINAS_CONHECIDAS.includes(paginaAtual) && (
          <div style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2 style={{ color: '#1e293b' }}>Página ainda não existe</h2>
            <p style={{ color: '#64748b' }}>
              O menu tentou abrir a página <strong>"{String(paginaAtual)}"</strong>, mas o App.jsx não tem
              nenhuma tela com esse nome.
            </p>
            <button
              type="button"
              onClick={() => setPaginaAtual('home')}
              style={{ marginTop: '10px', padding: '10px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Voltar para a Home
            </button>
          </div>
        )}
      </main>

      <Footer setPaginaAtual={setPaginaAtual} />
    </div>
  );
}