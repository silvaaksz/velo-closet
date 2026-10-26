import React, { useState } from 'react';

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '15px',
  boxSizing: 'border-box'
};

const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: '500', color: '#475569' };

const CATEGORIAS = [
  { valor: 'CALÇAS', nome: 'Calças' },
  { valor: 'BLUSAS', nome: 'Blusas' },
  { valor: 'JAQUETAS', nome: 'Jaquetas' },
  { valor: 'VESTIDOS', nome: 'Vestidos' }
];

// Reduz a foto (máx. 800px) e converte para JPEG, para não pesar no banco
function lerImagem(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Escolha um arquivo de imagem (JPG, PNG ou WEBP).'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Imagem inválida.'));
      img.onload = () => {
        const MAX = 800;
        const escala = Math.min(1, MAX / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * escala);
        canvas.height = Math.round(img.height * escala);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function PainelFornecedor({ adicionarNovoProduto, editarProduto, produtos = [], usuarioLogado }) {
  // Formulário de cadastro
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('CALÇAS');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [ean, setEan] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Edição
  const [editandoId, setEditandoId] = useState(null);
  const [edit, setEdit] = useState({ titulo: '', categoria: 'CALÇAS', ean: '', descricao: '', preco: '', estoque: '', imagem: '', imagemAtual: '' });
  const [salvando, setSalvando] = useState(false);

  // Mensagem de erro: limpa ao digitar, ao tentar de novo e ao sair da tela
  const [erro, setErro] = useState('');

  const meusProdutos = produtos.filter(
    (p) =>
      usuarioLogado &&
      (p.fornecedor_email === usuarioLogado.email || p.fabricante === usuarioLogado.nome)
  );

  const comLimpeza = (setter) => (e) => {
    if (erro) setErro('');
    setter(e.target.value);
  };

  const campoEdit = (campo) => (e) => {
    if (erro) setErro('');
    setEdit((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const escolherFoto = async (e, aplicar) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    setErro('');
    try {
      aplicar(await lerImagem(arquivo));
    } catch (err) {
      setErro(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!titulo.trim() || !preco) {
      setErro('Por favor, preencha o título e o preço do produto.');
      return;
    }

    setEnviando(true);
    try {
      await adicionarNovoProduto({
        titulo: titulo.trim(),
        categoria,
        ean: ean.trim() || null,
        preco,
        estoque: estoque === '' ? 10 : estoque,
        descricao,
        imagem: imagem || null,
        fabricante: usuarioLogado?.nome || 'Confecção Parceira',
        local: 'Brasil'
      });

      setTitulo('');
      setPreco('');
      setEstoque('');
      setDescricao('');
      setImagem('');
      setEan('');
    } catch (err) {
      setErro(err.message || 'Erro ao cadastrar o produto.');
    } finally {
      setEnviando(false);
    }
  };

  const iniciarEdicao = (p) => {
    setErro('');
    setEditandoId(p.id);
    setEdit({
      titulo: p.titulo,
      categoria: p.categoria,
      ean: p.ean || '',
      descricao: p.descricao || '',
      preco: String(p.precoMinimo),
      estoque: String(p.estoque),
      imagem: '', // vazio = manter a foto atual
      imagemAtual: p.imagem
    });
  };

  const cancelarEdicao = () => {
    setErro('');
    setEditandoId(null);
  };

  const salvarEdicao = async (id) => {
    setErro('');

    const precoNum = parseFloat(edit.preco);
    const estoqueNum = parseInt(edit.estoque, 10);
    if (!edit.titulo.trim()) {
      setErro('O título não pode ficar vazio.');
      return;
    }
    if (!Number.isFinite(precoNum) || precoNum <= 0) {
      setErro('Informe um preço válido, maior que zero.');
      return;
    }
    if (!Number.isInteger(estoqueNum) || estoqueNum < 0) {
      setErro('Informe um estoque válido (0 ou mais).');
      return;
    }

    setSalvando(true);
    try {
      await editarProduto(id, {
        titulo: edit.titulo,
        categoria: edit.categoria,
        ean: edit.ean,
        descricao: edit.descricao,
        imagem: edit.imagem || null,
        precoMinimo: precoNum,
        estoque: estoqueNum
      });
      setEditandoId(null);
    } catch (err) {
      setErro(err.message || 'Erro ao salvar a alteração.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '8px' }}>Painel do Fabricante / Fornecedor</h2>
        <p style={{ color: '#64748b', marginBottom: '25px' }}>
          Bem-vindo(a), <strong>{usuarioLogado?.nome || 'Fornecedor Parceiro'}</strong>! Aqui podes gerir o teu catálogo e stock.
        </p>

        {erro && (
          <div
            role="alert"
            style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span>{erro}</span>
            <button
              type="button"
              onClick={() => setErro('')}
              aria-label="Fechar mensagem"
              style={{ background: 'none', border: 'none', color: '#b91c1c', fontSize: '18px', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
        )}

        {/* Cadastro */}
        <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <h3 style={{ color: '#334155', marginBottom: '15px' }}>Cadastrar Novo Produto</h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Título do Produto</label>
              <input
                type="text"
                placeholder="Ex: Calça Jeans Balloon Masculina"
                value={titulo}
                onChange={comLimpeza(setTitulo)}
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Categoria</label>
              <select value={categoria} onChange={comLimpeza(setCategoria)} style={inputStyle}>
                {CATEGORIAS.map((c) => (
                  <option key={c.valor} value={c.valor}>{c.nome}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Código de barras / EAN (opcional)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Ex: 7891029384756"
                value={ean}
                onChange={comLimpeza(setEan)}
                style={inputStyle}
              />
              <small style={{ color: '#64748b' }}>
                Se outra loja vende o mesmo produto, usar o mesmo EAN junta as ofertas para o cliente comparar preços.
                Sem EAN, juntamos pelo nome igual.
              </small>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Preço Mínimo (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="89.90"
                  value={preco}
                  onChange={comLimpeza(setPreco)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Stock Inicial</label>
                <input
                  type="number"
                  placeholder="50"
                  value={estoque}
                  onChange={comLimpeza(setEstoque)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Foto do produto</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => escolherFoto(e, setImagem)}
              />
              {imagem && (
                <img src={imagem} alt="Pré-visualização" style={{ display: 'block', marginTop: '10px', width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              )}
            </div>

            <div>
              <label style={labelStyle}>Descrição</label>
              <textarea
                placeholder="Detalhes sobre o tecido, modelagem, etc."
                value={descricao}
                onChange={comLimpeza(setDescricao)}
                style={{ ...inputStyle, minHeight: '90px' }}
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              style={{ padding: '14px', backgroundColor: enviando ? '#93c5fd' : '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: enviando ? 'default' : 'pointer', marginTop: '10px' }}
            >
              {enviando ? 'Cadastrando...' : 'Cadastrar Produto'}
            </button>
          </form>
        </div>

        {/* Meus produtos */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#334155', marginBottom: '15px' }}>Meus Produtos</h3>

          {meusProdutos.length === 0 ? (
            <p style={{ color: '#64748b' }}>Você ainda não tem produtos cadastrados.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {meusProdutos.map((p) =>
                editandoId === p.id ? (
                  <div
                    key={p.id}
                    style={{ padding: '16px', border: '2px solid #2563eb', borderRadius: '8px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}
                  >
                    <div>
                      <label style={labelStyle}>Título</label>
                      <input type="text" value={edit.titulo} onChange={campoEdit('titulo')} style={inputStyle} />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '140px' }}>
                        <label style={labelStyle}>Categoria</label>
                        <select value={edit.categoria} onChange={campoEdit('categoria')} style={inputStyle}>
                          {CATEGORIAS.map((c) => (
                            <option key={c.valor} value={c.valor}>{c.nome}</option>
                          ))}
                        </select>
                      </div>
                      <div style={{ flex: 1, minWidth: '120px' }}>
                        <label style={labelStyle}>Preço (R$)</label>
                        <input type="number" step="0.01" value={edit.preco} onChange={campoEdit('preco')} style={inputStyle} />
                      </div>
                      <div style={{ flex: 1, minWidth: '100px' }}>
                        <label style={labelStyle}>Estoque</label>
                        <input type="number" value={edit.estoque} onChange={campoEdit('estoque')} style={inputStyle} />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Código de barras / EAN</label>
                      <input type="text" inputMode="numeric" value={edit.ean} onChange={campoEdit('ean')} style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>Descrição</label>
                      <textarea value={edit.descricao} onChange={campoEdit('descricao')} style={{ ...inputStyle, minHeight: '80px' }} />
                    </div>

                    <div>
                      <label style={labelStyle}>Foto</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={edit.imagem || edit.imagemAtual}
                          alt="Foto do produto"
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => escolherFoto(e, (dataUrl) => setEdit((prev) => ({ ...prev, imagem: dataUrl })))}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={() => salvarEdicao(p.id)}
                        disabled={salvando}
                        style={{ padding: '10px 18px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        {salvando ? 'Salvando...' : 'Salvar alterações'}
                      </button>
                      <button
                        type="button"
                        onClick={cancelarEdicao}
                        style={{ padding: '10px 18px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={p.id}
                    style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', flexWrap: 'wrap' }}
                  >
                    <img src={p.imagem} alt={p.titulo} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px' }} />

                    <div style={{ flex: 1, minWidth: '160px' }}>
                      <strong style={{ color: '#1e293b' }}>{p.titulo}</strong>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{p.categoria}</div>
                    </div>

                    <span style={{ fontWeight: 'bold', color: '#16a34a' }}>R$ {Number(p.precoMinimo).toFixed(2)}</span>
                    <span style={{ color: p.estoque > 0 ? '#475569' : '#dc2626' }}>
                      {p.estoque > 0 ? `Estoque: ${p.estoque}` : 'Esgotado'}
                    </span>
                    <button
                      type="button"
                      onClick={() => iniciarEdicao(p)}
                      style={{ padding: '10px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Editar
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}