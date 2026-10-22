import React, { useState } from 'react';
import styles from './RastreioDevolucao.module.css';

export default function RastreioDevolucao({ abaInicial = 'rastreio', setPaginaAtual }) {
  const [abaAtiva, setAbaAtiva] = useState(abaInicial);
  const [codigo, setCodigo] = useState('');
  const [resultadoRastreio, setResultadoRastreio] = useState(null);

  const [formDevolucao, setFormDevolucao] = useState({ pedido: '', motivo: '', detalhe: '' });
  const [devolucaoEnviada, setDevolucaoEnviada] = useState(false);

  const buscarRastreio = (e) => {
    e.preventDefault();
    if (!codigo) return alert('Digite um código de rastreamento.');
    
    setResultadoRastreio({
      status: 'Em Trânsito',
      origem: 'Confecção Silva & Cia (Fortaleza, CE)',
      destino: 'Endereço do Cliente (São Paulo, SP)',
      etapas: [
        { data: '14/10/2026 - 10:30', texto: 'Objeto saiu para entrega ao destinatário' },
        { data: '13/10/2026 - 16:20', texto: 'Em trânsito para o Centro de Distribuição regional' },
        { data: '12/10/2026 - 09:00', texto: 'Pedido postado e confirmado pela confecção' }
      ]
    });
  };

  const solicitarDevolucao = (e) => {
    e.preventDefault();
    if (!formDevolucao.pedido || !formDevolucao.motivo) return alert('Preencha os campos obrigatórios.');
    setDevolucaoEnviada(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabsHeader}>
        <button 
          className={`${styles.tabBtn} ${abaAtiva === 'rastreio' ? styles.tabAtiva : ''}`}
          onClick={() => setAbaAtiva('rastreio')}
        >
          Rastrear Pedido
        </button>
        <button 
          className={`${styles.tabBtn} ${abaAtiva === 'devolucao' ? styles.tabAtiva : ''}`}
          onClick={() => setAbaAtiva('devolucao')}
        >
          Troca e Devolução
        </button>
      </div>

      {abaAtiva === 'rastreio' ? (
        <div className={styles.boxContent}>
          <h2>Rastreamento de Pedido</h2>
          <p>Acompanhe o status do envio diretamente da confecção parceira até o seu endereço.</p>

          <form onSubmit={buscarRastreio} className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Digite o código de rastreamento (ex: VC123456BR)" 
              value={codigo} 
              onChange={(e) => setCodigo(e.target.value)} 
              required 
            />
            <button type="submit">Consultar</button>
          </form>

          {resultadoRastreio && (
            <div className={styles.timelineBox}>
              <div className={styles.statusBadge}>{resultadoRastreio.status}</div>
              <p><strong>Origem:</strong> {resultadoRastreio.origem}</p>
              <p><strong>Destino:</strong> {resultadoRastreio.destino}</p>
              
              <ul className={styles.timeline}>
                {resultadoRastreio.etapas.map((etapa, idx) => (
                  <li key={idx}>
                    <span className={styles.data}>{etapa.data}</span>
                    <span className={styles.texto}>{etapa.texto}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.boxContent}>
          <h2>Solicitação de Troca ou Devolução</h2>
          <p>Conforme a política da plataforma, você tem até 7 dias após o recebimento para solicitar o reembolso ou troca.</p>

          {devolucaoEnviada ? (
            <div className={styles.successDevolucao}>
              <h3>Solicitação Registrada com Sucesso</h3>
              <p>A etiqueta de postagem reversa foi enviada para o seu e-mail cadastrado.</p>
              <button className={styles.btnHome} onClick={() => setPaginaAtual('home')}>
                Voltar à Página Inicial
              </button>
            </div>
          ) : (
            <form onSubmit={solicitarDevolucao} className={styles.formDevolucao}>
              <label>Código do Pedido ou CPF do Comprador *</label>
              <input 
                type="text" 
                placeholder="Ex: VC123456BR" 
                value={formDevolucao.pedido} 
                onChange={(e) => setFormDevolucao({ ...formDevolucao, pedido: e.target.value })} 
                required 
              />

              <label>Motivo da Solicitação *</label>
              <select 
                value={formDevolucao.motivo} 
                onChange={(e) => setFormDevolucao({ ...formDevolucao, motivo: e.target.value })} 
                required
              >
                <option value="">Selecione o motivo...</option>
                <option value="tamanho">Tamanho incorreto</option>
                <option value="defeito">Defeito de fabricação</option>
                <option value="diferente">Produto diferente do anúncio</option>
                <option value="arrependimento">Arrependimento da compra</option>
              </select>

              <label>Detalhes Adicionais</label>
              <textarea 
                rows="3" 
                placeholder="Descreva o ocorrido..." 
                value={formDevolucao.detalhe} 
                onChange={(e) => setFormDevolucao({ ...formDevolucao, detalhe: e.target.value })} 
              />

              <button type="submit" className={styles.btnSubmit}>
                Gerar Etiqueta de Logística Reversa
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}