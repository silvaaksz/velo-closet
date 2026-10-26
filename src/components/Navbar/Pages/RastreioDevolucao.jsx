import React, { useEffect, useRef, useState } from 'react';

const API = 'http://localhost:5000';

const brl = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const estiloAba = (ativa) => ({
  flex: 1,
  padding: '12px',
  borderRadius: '8px',
  border: 'none',
  background: ativa ? '#2563eb' : '#e2e8f0',
  color: ativa ? '#fff' : '#334155',
  fontWeight: 'bold',
  cursor: 'pointer',
});

export default function RastreioDevolucao({ usuario, pedidos, pedidosHistorico = [], mudarPagina, setPaginaAtual, abaInicial }) {
  const listaPedidos = pedidos || pedidosHistorico;
  const funcaoMudarPagina = mudarPagina || setPaginaAtual;

  const [abaAtiva, setAbaAtiva] = useState(abaInicial === 'devolucao' ? 'sac' : 'rastreio');
  const [inputTexto, setInputTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagens, setMensagens] = useState([
    {
      remetente: 'ia',
      texto: `Olá, ${usuario?.nome?.split(' ')[0] || 'Cliente'}! Sou a assistente virtual do Velo Closet. Como posso te ajudar com seu pedido ou devolução hoje?`,
    },
  ]);
  const fimRef = useRef(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, enviando]);

  const handleEnviarMensagem = async (e) => {
    e.preventDefault();
    const texto = inputTexto.trim();
    if (!texto || enviando) return;

    setMensagens((prev) => [...prev, { remetente: 'user', texto }]);
    setInputTexto('');
    setEnviando(true);

    try {
      const r = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensagem: texto,
          pedido: listaPedidos[0] || null,
          usuario,
        }),
      });
      const dados = await r.json();
      if (!r.ok) throw new Error(dados.error || 'Não foi possível falar com a assistente.');
      setMensagens((prev) => [...prev, { remetente: 'ia', texto: dados.resposta }]);
    } catch (err) {
      setTimeout(() => {
        let respostaIa = 'Entendi! Posso te ajudar com o rastreamento, cancelamento ou trocas do seu pedido.';
        const textoMin = texto.toLowerCase();
        const ultimoPedido = listaPedidos[0];

        if (textoMin.includes('rastre') || textoMin.includes('onde') || textoMin.includes('pedido')) {
          if (ultimoPedido) {
            respostaIa = `Seu pedido #${ultimoPedido.codigo} está no status: "${ultimoPedido.status}". Endereço de entrega: ${ultimoPedido.enderecoEntrega || 'Cadastrado'}.`;
          } else {
            respostaIa = 'Você ainda não possui pedidos recentes para rastrear.';
          }
        }
        setMensagens((prev) => [...prev, { remetente: 'ia', texto: respostaIa }]);
        setEnviando(false);
      }, 500);
      return;
    } finally {
      setEnviando(false);
    }
  };

  const pedirAjuda = (ped) => {
    setInputTexto(`Preciso de ajuda com o pedido ${ped.codigo}`);
    setAbaAtiva('sac');
  };

  return (
    <div style={{ padding: '30px 40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <button type="button" onClick={() => setAbaAtiva('rastreio')} style={estiloAba(abaAtiva === 'rastreio')}>
          Rastrear Meus Pedidos
        </button>
        <button type="button" onClick={() => setAbaAtiva('sac')} style={estiloAba(abaAtiva === 'sac')}>
          Chat de Devolução & SAC (IA)
        </button>
      </div>

      {abaAtiva === 'rastreio' && (
        <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px' }}>Meus Pedidos Recentes</h2>

          {listaPedidos.length === 0 ? (
            <p style={{ color: '#64748b' }}>Você ainda não fez nenhum pedido.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {listaPedidos.map((ped) => (
                <div key={ped.codigo} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', gap: '12px' }}>
                    <div>
                      {ped.itens.map((it, idx) => (
                        <div key={idx} style={{ marginBottom: '6px' }}>
                          <strong style={{ fontSize: '16px', color: '#1e293b' }}>
                            {it.quantidade}x {it.titulo}
                            {it.tamanho ? ` (${it.tamanho})` : ''}
                          </strong>
                          <span style={{ display: 'block', fontSize: '13px', color: '#64748b' }}>Vendido por: {it.loja}</span>
                        </div>
                      ))}
                    </div>
                    <span style={{ fontWeight: 'bold', color: '#16a34a', whiteSpace: 'nowrap' }}>{brl(ped.total)}</span>
                  </div>

                  <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
                      <strong>Status:</strong> <span style={{ color: '#2563eb' }}>{ped.status}</span>
                    </p>
                    <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#475569' }}>
                      <strong>Endereço de Entrega:</strong> {ped.enderecoEntrega || 'Endereço Padrão'}
                    </p>
                    <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#475569' }}>
                      <strong>Pagamento:</strong> {ped.formaPagamento || 'PIX'}
                    </p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                      <strong>Código de Rastreio:</strong> {ped.codigo}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => pedirAjuda(ped)}
                    style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Precisa de ajuda ou devolução deste item?
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {abaAtiva === 'sac' && (
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '500px' }}>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', borderRadius: '12px 12px 0 0' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>🤖 Assistente Virtual Velo Closet</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Suporte automatizado para devoluções e rastreamento</p>
          </div>

          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mensagens.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.remetente === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.remetente === 'user' ? '#2563eb' : '#f1f5f9',
                  color: msg.remetente === 'user' ? '#fff' : '#1e293b',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  maxWidth: '75%',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.texto}
              </div>
            ))}
            {enviando && (
              <div style={{ alignSelf: 'flex-start', background: '#f1f5f9', color: '#64748b', padding: '12px 16px', borderRadius: '12px', fontSize: '14px' }}>
                Digitando...
              </div>
            )}
            <div ref={fimRef} />
          </div>

          <form onSubmit={handleEnviarMensagem} style={{ padding: '15px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Digite sua dúvida sobre o pedido ou devolução..."
              value={inputTexto}
              maxLength={1000}
              onChange={(e) => setInputTexto(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
            />
            <button
              type="submit"
              disabled={enviando || !inputTexto.trim()}
              style={{ padding: '10px 20px', background: enviando || !inputTexto.trim() ? '#94a3b8' : '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: enviando ? 'default' : 'pointer' }}
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      {funcaoMudarPagina && (
        <button
          type="button"
          onClick={() => funcaoMudarPagina('produtos')}
          style={{ marginTop: '20px', padding: '8px 16px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          ← Voltar ao Catálogo
        </button>
      )}
    </div>
  );
}