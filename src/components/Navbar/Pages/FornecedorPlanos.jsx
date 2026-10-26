import React, { useState } from 'react';

// Planos atualizados com preços e benefícios reais do Velo Closet
const PLANOS = [
  {
    id: 'bronze',
    nome: 'Bronze',
    preco: 'R$ 49,90/mês',
    cor: '#b45309',
    itens: [
      'Até 10 produtos cadastrados',
      'Exibição na busca padrão',
      'Suporte via e-mail'
    ]
  },
  {
    id: 'prata',
    nome: 'Prata',
    preco: 'R$ 99,90/mês',
    cor: '#64748b',
    itens: [
      'Até 50 produtos cadastrados',
      'Destaque médio nas pesquisas',
      'Relatórios básicos de vendas',
      'Suporte prioritário via chat e e-mail'
    ]
  },
  {
    id: 'ouro',
    nome: 'Ouro',
    preco: 'R$ 199,90/mês',
    cor: '#ca8a04',
    itens: [
      'Produtos ilimitados no catálogo',
      'Selo de Fabricante Verificado',
      'Topo das buscas e banners de destaque',
      'Relatórios avançados e métricas em tempo real',
      'Suporte dedicado 24/7 via WhatsApp'
    ]
  }
];

const inputStyle = {
  width: '100%',
  padding: '11px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '15px',
  boxSizing: 'border-box'
};
const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: '500', color: '#475569', fontSize: '14px' };

const soDigitos = (v) => v.replace(/\D/g, '');

const mascaraCnpj = (v) => {
  const d = soDigitos(v).slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

const mascaraCep = (v) => soDigitos(v).slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2');

export default function FornecedorPlanos({ realizarLogin, registrarUsuario }) {
  const [aba, setAba] = useState('conta'); // 'conta' | 'cadastro'
  const [planoId, setPlanoId] = useState('');
  const [erro, setErro] = useState('');

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  // Cadastro da empresa
  const [empresa, setEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({ logradouro: '', bairro: '', cidade: '', uf: '' });
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [buscandoCep, setBuscandoCep] = useState(false);

  const limpar = (setter, tratar = (v) => v) => (e) => {
    if (erro) setErro('');
    setter(tratar(e.target.value));
  };

  const trocarAba = (nova) => {
    setErro('');
    setAba(nova);
  };

  const buscarCep = async (valor) => {
    const digitos = soDigitos(valor);
    if (digitos.length !== 8) return;
    setBuscandoCep(true);
    setErro('');
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digitos}/json/`);
      const dados = await res.json();
      if (dados.erro) {
        setErro('CEP não encontrado. Confira o número digitado.');
        setEndereco({ logradouro: '', bairro: '', cidade: '', uf: '' });
      } else {
        setEndereco({
          logradouro: dados.logradouro || '',
          bairro: dados.bairro || '',
          cidade: dados.localidade || '',
          uf: dados.uf || ''
        });
      }
    } catch {
      setErro('Não foi possível consultar o CEP agora. Preencha o endereço manualmente.');
    } finally {
      setBuscandoCep(false);
    }
  };

  const aoDigitarCep = (e) => {
    if (erro) setErro('');
    const valor = mascaraCep(e.target.value);
    setCep(valor);
    buscarCep(valor);
  };

  const campoEndereco = (campo) => (e) => {
    if (erro) setErro('');
    setEndereco((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const entrar = (e) => {
    e.preventDefault();
    setErro('');
    const resultado = realizarLogin(loginEmail.trim(), loginSenha);
    if (resultado && !resultado.ok) setErro(resultado.erro);
  };

  const cadastrarEmpresa = (e) => {
    e.preventDefault();
    setErro('');

    if (!planoId) return setErro('Escolha um dos planos acima antes de cadastrar a empresa.');
    if (!empresa.trim()) return setErro('Informe o nome da empresa.');
    if (!cnpj.trim()) return setErro('Informe o CNPJ.');
    if (senha.length < 6) return setErro('A senha precisa ter no mínimo 6 caracteres.');
    if (soDigitos(cep).length !== 8) return setErro('Informe um CEP válido com 8 números.');
    if (!endereco.logradouro.trim() || !endereco.cidade.trim() || !endereco.uf.trim()) {
      return setErro('Preencha rua, cidade e estado (o CEP preenche sozinho quando é encontrado).');
    }
    if (!numero.trim()) return setErro('Informe o número do endereço.');

    const resultado = registrarUsuario({
      nome: empresa.trim(),
      email: email.trim(),
      senha,
      tipo: 'fornecedor',
      cnpj,
      plano: planoId,
      endereco: { ...endereco, cep, numero: numero.trim(), complemento: complemento.trim() }
    });
    if (resultado && !resultado.ok) setErro(resultado.erro);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ color: '#1e293b', textAlign: 'center', marginBottom: '6px' }}>Venda no Velo Closet</h1>
      <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '30px' }}>
        Escolha o plano da sua empresa e comece a cadastrar seus produtos.
      </p>

      {/* Planos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '35px' }}>
        {PLANOS.map((p) => {
          const selecionado = planoId === p.id;
          return (
            <div
              key={p.id}
              style={{
                background: '#fff',
                border: selecionado ? `3px solid ${p.cor}` : '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h2 style={{ margin: 0, color: p.cor }}>{p.nome}</h2>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: '10px 0 16px' }}>{p.preco}</p>
              <ul style={{ paddingLeft: '18px', color: '#475569', flex: 1, margin: '0 0 18px' }}>
                {p.itens.map((item) => (
                  <li key={item} style={{ marginBottom: '8px' }}>{item}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setErro('');
                  setPlanoId(p.id);
                  setAba('cadastro');
                }}
                style={{ padding: '12px', background: selecionado ? p.cor : '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {selecionado ? 'Plano escolhido ✓' : `Escolher ${p.nome}`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Acesso */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => trocarAba('conta')}
            style={{ flex: 1, minWidth: '180px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 'bold', cursor: 'pointer', background: aba === 'conta' ? '#2563eb' : '#f1f5f9', color: aba === 'conta' ? '#fff' : '#334155' }}
          >
            Já tenho minha conta
          </button>
          <button
            type="button"
            onClick={() => trocarAba('cadastro')}
            style={{ flex: 1, minWidth: '180px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 'bold', cursor: 'pointer', background: aba === 'cadastro' ? '#2563eb' : '#f1f5f9', color: aba === 'cadastro' ? '#fff' : '#334155' }}
          >
            Cadastrar minha empresa
          </button>
        </div>

        {erro && (
          <div role="alert" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' }}>
            {erro}
          </div>
        )}

        {aba === 'conta' ? (
          <form onSubmit={entrar} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '420px' }}>
            <div>
              <label style={labelStyle}>E-mail</label>
              <input type="email" value={loginEmail} onChange={limpar(setLoginEmail)} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Senha</label>
              <input type="password" value={loginSenha} onChange={limpar(setLoginSenha)} style={inputStyle} required />
            </div>
            <button type="submit" style={{ padding: '12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Entrar no painel
            </button>
          </form>
        ) : (
          <form onSubmit={cadastrarEmpresa} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ margin: 0, color: '#475569', fontSize: '14px' }}>
              Plano escolhido:{' '}
              <strong>{planoId ? PLANOS.find((p) => p.id === planoId).nome : 'nenhum (escolha um plano acima)'}</strong>
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ flex: 2, minWidth: '220px' }}>
                <label style={labelStyle}>Nome da empresa</label>
                <input type="text" value={empresa} onChange={limpar(setEmpresa)} style={inputStyle} required />
              </div>
              <div style={{ flex: 1, minWidth: '190px' }}>
                <label style={labelStyle}>CNPJ</label>
                <input type="text" placeholder="00.000.000/0000-00" value={cnpj} onChange={limpar(setCnpj, mascaraCnpj)} style={inputStyle} required />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <label style={labelStyle}>E-mail de acesso</label>
                <input type="email" value={email} onChange={limpar(setEmail)} style={inputStyle} required />
              </div>
              <div style={{ flex: 1, minWidth: '220px' }}>
                <label style={labelStyle}>Senha (mínimo 6 caracteres)</label>
                <input type="password" value={senha} onChange={limpar(setSenha)} style={inputStyle} required />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={labelStyle}>CEP {buscandoCep && '(buscando...)'}</label>
                <input type="text" placeholder="00000-000" value={cep} onChange={aoDigitarCep} style={inputStyle} required />
              </div>
              <div style={{ flex: 3, minWidth: '240px' }}>
                <label style={labelStyle}>Rua</label>
                <input type="text" value={endereco.logradouro} onChange={campoEndereco('logradouro')} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '110px' }}>
                <label style={labelStyle}>Número</label>
                <input type="text" value={numero} onChange={limpar(setNumero)} style={inputStyle} />
              </div>
              <div style={{ flex: 2, minWidth: '160px' }}>
                <label style={labelStyle}>Complemento</label>
                <input type="text" value={complemento} onChange={limpar(setComplemento)} style={inputStyle} />
              </div>
              <div style={{ flex: 2, minWidth: '160px' }}>
                <label style={labelStyle}>Bairro</label>
                <input type="text" value={endereco.bairro} onChange={campoEndereco('bairro')} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ flex: 3, minWidth: '200px' }}>
                <label style={labelStyle}>Cidade</label>
                <input type="text" value={endereco.cidade} onChange={campoEndereco('cidade')} style={inputStyle} />
              </div>
              <div style={{ flex: 1, minWidth: '80px' }}>
                <label style={labelStyle}>UF</label>
                <input type="text" maxLength={2} value={endereco.uf} onChange={campoEndereco('uf')} style={inputStyle} />
              </div>
            </div>

            <button type="submit" style={{ padding: '14px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '6px' }}>
              Cadastrar empresa e entrar no painel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}