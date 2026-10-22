import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Cadastro({ setPaginaAtual, registrarUsuario }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('cliente');
  const [documento, setDocumento] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !email || !senha || !documento) {
      alert('Preencha todos os campos obrigatórios para continuar.');
      return;
    }
    registrarUsuario({ nome, email, senha, tipo, documento });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Criar Conta</h2>
        <p>Registe-se na plataforma como consumidor ou fornecedor.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Tipo de Conta</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="cliente">Consumidor (Cliente)</option>
              <option value="fornecedor">Fornecedor (Vendedor)</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Nome Completo / Empresa</label>
            <input 
              type="text" 
              placeholder="O seu nome" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required 
            />
          </div>

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
            <label>{tipo === 'fornecedor' ? 'CNPJ' : 'CPF'}</label>
            <input 
              type="text" 
              placeholder={tipo === 'fornecedor' ? '00.000.000/0001-00' : '000.000.000-00'} 
              value={documento} 
              onChange={(e) => setDocumento(e.target.value)} 
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

          <button type="submit" className={styles.btnLogin}>Registar Conta</button>
          
          <button 
            type="button" 
            className={styles.btnCriarConta} 
            onClick={() => setPaginaAtual('login')}
            style={{ marginTop: '10px' }}
          >
            Já tem uma conta? Fazer Login
          </button>
        </form>
      </div>
    </div>
  );
}