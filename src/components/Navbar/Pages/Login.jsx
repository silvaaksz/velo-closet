import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ setPaginaAtual }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && senha) {
      // Redireciona de volta para a home após o login bem-sucedido
      setPaginaAtual('home');
    } else {
      alert('Por favor, preencha o e-mail e a senha.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Área do Cliente</h2>
        <p>Faça login para gerir os seus pedidos e favoritos.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>E-mail</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="********" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required
            />
          </div>

          <button type="submit" className={styles.btnLogin}>Entrar na Conta</button>
        </form>
      </div>
    </div>
  );
}