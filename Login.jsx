import React, { useState } from 'react';
import styles from './Login.module.css';

// Props que o App.jsx realmente envia: realizarLogin e setPaginaAtual
export default function Login({ realizarLogin, setPaginaAtual }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErro(''); // limpa o erro anterior ao tentar de novo

    const resultado = realizarLogin(email.trim(), senha);
    if (resultado && !resultado.ok) {
      setErro(resultado.erro);
    }
  };

  // Digitar em qualquer campo limpa o erro
  const aoDigitar = (setter) => (e) => {
    if (erro) setErro('');
    setter(e.target.value);
  };

  return (
    <div className={styles.container} style={{ padding: '40px 20px', maxWidth: '450px', margin: '0 auto' }}>
      <div className={styles.loginBox} style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2>Área do Cliente</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Faça login ou crie a sua conta para gerir os pedidos.</p>

        {erro && (
          <div
            role="alert"
            style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px' }}
          >
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.formLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={aoDigitar(setEmail)}
              required
              style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Senha</label>
            <input
              type="password"
              placeholder="********"
              value={senha}
              onChange={aoDigitar(setSenha)}
              required
              style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Entrar na Conta
          </button>
        </form>

        <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

        <button
          type="button"
          onClick={() => setPaginaAtual('cadastro')}
          style={{ width: '100%', padding: '12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', color: '#333' }}
        >
          Não tem uma conta? Criar Conta Agora
        </button>
      </div>
    </div>
  );
}