import React, { useState } from 'react';
import styles from './Login.module.css';

<<<<<<< HEAD
export default function Login({ setPaginaAtual, realizarLogin }) {
=======
export default function Login({ setPaginaAtual }) {
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
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
=======
    if (email && senha) {
      // Redireciona de volta para a home após o login bem-sucedido
      setPaginaAtual('home');
    } else {
      alert('Por favor, preencha o e-mail e a senha.');
    }
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Área do Cliente</h2>
<<<<<<< HEAD
        <p>Faça login ou crie a sua conta para gerir os pedidos.</p>
=======
        <p>Faça login para gerir os seus pedidos e favoritos.</p>
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
        
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
<<<<<<< HEAD
            <div className={styles.labelRow}>
              <label>Senha</label>
              <button type="button" className={styles.linkEsqueci} onClick={handleEsqueciSenha}>
                Esqueci a senha?
              </button>
            </div>
=======
            <label>Senha</label>
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
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
<<<<<<< HEAD

        <div className={styles.divider}>
          <span>ou</span>
        </div>

        <button className={styles.btnCriarConta} onClick={() => setPaginaAtual('cadastro')}>
          Não tem uma conta? Criar Conta Agora
        </button>
=======
>>>>>>> 76712ebea165153f9c654aaa91688691037f9437
      </div>
    </div>
  );
}