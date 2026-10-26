import React, { useState, useEffect } from 'react';
import styles from './PainelFornecedor.module.css';

export default function PainelAdmin() {
  const [fabricantes, setFabricantes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [homologados, setHomologados] = useState({});

  // Carregar dados do servidor ao abrir o painel
  useEffect(() => {
    // Como exemplo, podes buscar produtos/empresas cadastradas
    fetch('http://localhost:5000/api/produtos')
      .then(res => res.json())
      .then(data => {
        if (data.message === 'success') {
          // Extrair fabricantes únicos dos produtos
          const mapEmpresas = {};
          data.data.forEach(p => {
            if (p.id_empresa) {
              mapEmpresas[p.id_empresa] = {
                id: p.id_empresa,
                nome: p.fabricante,
                local: p.local
              };
            }
          });
          setFabricantes(Object.values(mapEmpresas));
        }
      })
      .catch(err => console.error('Erro ao carregar dados para o admin:', err));
  }, []);

  const alterarStatus = (idEmpresa) => {
    const atual = homologados[idEmpresa] || 'Homologado';
    const novo = atual === 'Homologado' ? 'Bloqueado' : 'Homologado';
    setHomologados({ ...homologados, [idEmpresa]: novo });
  };

  return (
    <div className={styles.container} style={{ padding: '30px' }}>
      <h1>Painel Administrativo da Plataforma</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Gestão de confecções parceiras e controlo do ecossistema.</p>

      {/* Secção de Fabricantes */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3>Homologação e Controlo de Fabricantes ({fabricantes.length})</h3>
        {fabricantes.length === 0 ? (
          <p style={{ color: '#666', marginTop: '10px' }}>Ainda não há fabricantes com produtos cadastrados.</p>
        ) : (
          fabricantes.map((f) => {
            const statusAtual = homologados[f.id] || 'Homologado';
            return (
              <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                <div>
                  <strong>{f.nome}</strong> <span style={{ fontSize: '13px', color: '#666' }}>({f.local})</span>
                  <div style={{ fontSize: '14px', marginTop: '4px' }}>
                    Estado: <span style={{ color: statusAtual === 'Homologado' ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>{statusAtual}</span>
                  </div>
                </div>
                <button 
                  onClick={() => alterarStatus(f.id)} 
                  style={{ background: statusAtual === 'Homologado' ? '#ef4444' : '#10b981', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {statusAtual === 'Homologado' ? 'Bloquear Loja' : 'Homologar'}
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Secção de Suporte / Logística Reversa */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3>Mediação de Disputas & Logística Reversa</h3>
        <p style={{ color: '#666', marginTop: '5px' }}>As solicitações de troca ou devolução feitas pelos clientes aparecerão aqui para emissão de etiquetas e parecer final.</p>
        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '6px', textAlign: 'center', color: '#666', marginTop: '15px' }}>
          Nenhuma disputa pendente no momento.
        </div>
      </div>
    </div>
  );
}