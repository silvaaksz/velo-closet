import React, { useState } from 'react';
import styles from './PainelFornecedor.module.css';

export default function PainelAdmin({ usuariosCadastrados, disputasSac, setDisputasSac }) {
  const [homologados, setHomologados] = useState({ 'fornecedor@silva.com': 'Homologado' });

  const alterarStatus = (email) => {
    const atual = homologados[email] || 'Pendente';
    const novo = atual === 'Homologado' ? 'Bloqueado' : 'Homologado';
    setHomologados({ ...homologados, [email]: novo });
  };

  const resolverDisputa = (id) => {
    setDisputasSac(disputasSac.map(d => d.id === id ? { ...d, status: 'Resolvido com Reembolso' } : d));
    alert('Disputa encerrada pelo Administrador.');
  };

  return (
    <div className={styles.container}>
      <h1>Painel Administrativo</h1>

      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px', border: '1px solid #e2e8f0' }}>
        <h3>Homologação e Controlo de Fabricantes</h3>
        {usuariosCadastrados.filter(u => u.tipo === 'fornecedor').map((f, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span>{f.nome} ({f.email}) - <strong>{homologados[f.email] || 'Pendente'}</strong></span>
            <button onClick={() => alterarStatus(f.email)} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
              Alterar Status
            </button>
          </div>
        ))}
      </div>

      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <h3>Mediação de Disputas / SAC</h3>
        {disputasSac.map((d) => (
          <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span>Pedido: {d.pedido} | Motivo: {d.motivo} | <strong>{d.status}</strong></span>
            <button onClick={() => resolverDisputa(d.id)} style={{ background: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
              Emitir Parecer Final
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}