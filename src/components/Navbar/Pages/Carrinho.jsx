import React, { useState } from 'react';

// Props que o App.jsx realmente envia
export default function Carrinho({ carrinho, removerDoCarrinho, setCarrinho, setPedidosHistorico, usuarioLogado, setPaginaAtual }) {
  const [cep, setCep] = useState('');
  const [valorFrete, setValorFrete] = useState(null);
  const [endereco, setEndereco] = useState(null); // Morada real do ViaCEP
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState('pix');

  const precoDoItem = (item) => Number(item.preco || item.precoMinimo || 0);

  const subtotal = carrinho.reduce((acc, item) => acc + precoDoItem(item), 0);
  const total = subtotal + (valorFrete || 0);

  const voltarAoCatalogo = () => setPaginaAtual('produtos');

  const aoDigitarCep = (e) => {
    const digitos = e.target.value.replace(/\D/g, '').slice(0, 8);
    setCep(digitos.replace(/^(\d{5})(\d)/, '$1-$2'));
  };

  const calcularFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      alert('Digite um CEP válido com 8 dígitos.');
      return;
    }

    setCarregandoCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      if (data.erro) {
        alert('CEP não encontrado.');
        setEndereco(null);
        setValorFrete(null);
        return;
      }

      setEndereco(data);
      setValorFrete(19.9);
    } catch (err) {
      alert('Erro ao calcular o frete.');
    } finally {
      setCarregandoCep(false);
    }
  };

  const handleFinalizarCompra = () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }
    if (!usuarioLogado) {
      alert('Faça login para concluir o pedido.');
      setPaginaAtual('login');
      return;
    }
    if (valorFrete === null || !endereco) {
      alert('Calcule o frete com o seu CEP antes de concluir o pedido.');
      return;
    }

    const novoPedido = {
      codigo: `VC${Math.floor(100000 + Math.random() * 900000)}BR`,
      data: new Date().toISOString(),
      total,
      status: 'Em Trânsito (Separação do Fabricante)',
      formaPagamento: formaPagamento.toUpperCase(),
      enderecoEntrega: `${endereco.logradouro}, ${endereco.bairro} - ${endereco.localidade}/${endereco.uf}`,
      cliente: usuarioLogado.email,
      itens: carrinho.map((item) => ({
        titulo: item.titulo || item.nome,
        quantidade: item.quantidade || 1,
        tamanho: item.tamanho || 'P',
        loja: item.fornecedor || item.fabricante || 'Confecção Parceira',
        preco: precoDoItem(item)
      }))
    };

    setPedidosHistorico((prev) => [novoPedido, ...prev]);
    setCarrinho([]);
    alert('Pedido concluído com sucesso! Redirecionando para o rastreamento...');
    setPaginaAtual('rastreio');
  };

  return (
    <div style={{ padding: '30px 40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '20px' }}>Seu Carrinho de Compras</h1>

      {carrinho.length === 0 ? (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b' }}>Seu carrinho está vazio no momento.</p>
          <button
            type="button"
            onClick={voltarAoCatalogo}
            style={{ marginTop: '15px', padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Explorar Produtos
          </button>
        </div>
      ) : (
        <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>

          {/* Lista de Itens */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
            {carrinho.map((item) => (
              <div key={item.idCarrinho} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
                {item.imagem && (
                  <img src={item.imagem} alt={item.titulo} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px' }} />
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#1e293b' }}>{item.titulo || item.nome}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    Tamanho: <strong>{item.tamanho || 'P'}</strong> | Fabricante: {item.fornecedor || item.fabricante || 'Parceiro'}
                  </p>
                </div>
                <span style={{ fontWeight: 'bold', color: '#16a34a' }}>R$ {precoDoItem(item).toFixed(2)}</span>
                <button
                  type="button"
                  onClick={() => removerDoCarrinho(item.idCarrinho)}
                  aria-label={`Remover ${item.titulo} do carrinho`}
                  style={{ background: 'none', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer' }}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          {/* Frete e Endereço */}
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#334155', fontSize: '14px' }}>
              Calcular Frete e Prazos por CEP
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={aoDigitarCep}
                maxLength={9}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
              <button
                type="button"
                onClick={calcularFrete}
                disabled={carregandoCep}
                style={{ padding: '10px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {carregandoCep ? 'Calculando...' : 'Calcular'}
              </button>
            </div>

            {endereco && (
              <div style={{ marginTop: '12px', padding: '10px 12px', background: '#fff', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', color: '#334155' }}>
                <strong>Endereço de Entrega:</strong> {endereco.logradouro}, {endereco.bairro} - {endereco.localidade}/{endereco.uf}
              </div>
            )}

            {valorFrete !== null && (
              <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#16a34a', fontWeight: 'bold' }}>
                ✓ Frete Entrega Padrão: R$ {valorFrete.toFixed(2)} (Prazo: 3 a 5 dias úteis)
              </p>
            )}
          </div>

          {/* Formas de Pagamento */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '10px', color: '#334155', fontSize: '14px' }}>
              Forma de Pagamento
            </label>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[
                { id: 'pix', nome: 'Pix (Aprovação Instantânea)' },
                { id: 'cartao', nome: 'Cartão de Crédito' }
              ].map((opcao) => (
                <button
                  key={opcao.id}
                  type="button"
                  onClick={() => setFormaPagamento(opcao.id)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: formaPagamento === opcao.id ? '2px solid #2563eb' : '1px solid #cbd5e1',
                    background: formaPagamento === opcao.id ? '#eff6ff' : '#fff',
                    color: formaPagamento === opcao.id ? '#2563eb' : '#334155',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {opcao.nome}
                </button>
              ))}
            </div>
          </div>

          {/* Totais */}
          <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '15px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#64748b', fontSize: '14px' }}>
              <span>Subtotal:</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#64748b', fontSize: '14px' }}>
              <span>Frete:</span>
              <span>{valorFrete ? `R$ ${valorFrete.toFixed(2)}` : 'A calcular'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>
              <span>Total do Pedido:</span>
              <span style={{ color: '#16a34a' }}>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Ações */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              type="button"
              onClick={voltarAoCatalogo}
              style={{ flex: 1, padding: '12px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Continuar Comprando
            </button>
            <button
              type="button"
              onClick={handleFinalizarCompra}
              style={{ flex: 1, padding: '12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Concluir Pedido
            </button>
          </div>

        </div>
      )}
    </div>
  );
}