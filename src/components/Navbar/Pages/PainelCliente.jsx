import React, { useState } from 'react';

export default function PainelCliente({ usuario, setUsuarioLogado, mudarPagina }) {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');

  const handleSalvar = (e) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim()) {
      alert('Preencha todos os campos.');
      return;
    }
    if (setUsuarioLogado) {
      setUsuarioLogado({ ...usuario, nome, email });
    }
    alert('Perfil atualizado com sucesso!');
    setEditando(false);
  };

  return (
    <div style={{ padding: '30px 40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #2563eb, #1e40af)', color: '#fff', padding: '25px 30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(37, 99, 235, 0.2)' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Minha Conta (Painel do Cliente)</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Bem-vindo(a), {usuario?.nome || nome || 'Comprador'}!</p>
      </div>

      <div style={{ background: '#fff', padding: '25px 30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>Meus Dados</h2>

        {!editando ? (
          <div>
            <p style={{ margin: '10px 0', color: '#475569' }}><strong>Nome:</strong> {usuario?.nome || nome || 'Não informado'}</p>
            <p style={{ margin: '10px 0', color: '#475569' }}><strong>E-mail:</strong> {usuario?.email || email || 'Não informado'}</p>
            <p style={{ margin: '10px 0', color: '#475569' }}><strong>Tipo de Conta:</strong> Consumidor</p>
            
            <button 
              type="button"
              onClick={() => setEditando(true)}
              style={{ marginTop: '15px', padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
            >
              Editar Perfil
            </button>
          </div>
        ) : (
          <form onSubmit={handleSalvar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '5px' }}>Nome</label>
              <input 
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#475569', marginBottom: '5px' }}>E-mail</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                required 
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                type="submit" 
                style={{ padding: '10px 20px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                Salvar Alterações
              </button>
              <button 
                type="button" 
                onClick={() => setEditando(false)}
                style={{ padding: '10px 20px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>

      <div style={{ background: '#fff', padding: '25px 30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>Ações Rápidas</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          
          <button 
            type="button"
            onClick={() => { if (mudarPagina) mudarPagina('rastreio'); }}
            style={{ padding: '12px 20px', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Rastrear Pedidos
          </button>

          <button 
            type="button"
            onClick={() => { if (mudarPagina) mudarPagina('rastreio'); }}
            style={{ padding: '12px 20px', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Solicitar Devolução / SAC
          </button>

          <button 
            type="button"
            onClick={() => { if (mudarPagina) mudarPagina('produtos'); }} 
            style={{ padding: '12px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            Ir para o Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}