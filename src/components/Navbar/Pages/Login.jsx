import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ setPaginaAtual, realizarLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert('Por favor, preencha o e-mail e a senha.');
      return;
    }
    realizarLogin(email, senha);
  };

  const handleEsqueciSenha = () => {
    if (!email) {
      alert('Digite o seu e-mail no campo acima primeiro para recuperar a senha.');
      return;
    }
    alert(`Instruções de recuperação de palavra-passe foram enviadas para o e-mail: ${email}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Área do Cliente</h2>
        <p>Faça login ou crie a sua conta para gerir os pedidos.</p>
        
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
            <div className={styles.labelRow}>
              <label>Senha</label>
              <button type="button" className={styles.linkEsqueci} onClick={handleEsqueciSenha}>
                Esqueci a senha?
              </button>
            </div>
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

        <div className={styles.divider}>
          <span>ou</span>
        </div>

        <button className={styles.btnCriarConta} onClick={() => setPaginaAtual('cadastro')}>
          Não tem uma conta? Criar Conta Agora
        </button>
      </div>
    </div>
  );
}