import React, { useState } from 'react';
import styles from './Login.module.css';

//Cadastro só de CLIENTES. Fornecedores se cadastram na página "Sou Fabricante".//
export default function Cadastro({ registrarUsuario, setPaginaAtual }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const aoDigitar = (setter) => (e) => {
    if (erro) setErro('');
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro(''); // limpa o erro anterior ao tentar de novo

    if (!nome.trim() || !email.trim() || !senha) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (senha.length < 6) {
      setErro('A senha precisa ter no mínimo 6 caracteres.');
      return;
    }

    const resultado = registrarUsuario({
      nome: nome.trim(),
      email: email.trim(),
      senha,
      tipo: 'cliente'
    });
    if (resultado && !resultado.ok) {
      setErro(resultado.erro);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Criar Nova Conta</h2>
        <p>Regista-te para começar a comprar no Velo Closet.</p>

        {erro && (
          <div
            role="alert"
            style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px 14px', borderRadius: '6px', margin: '12px 0', fontSize: '14px' }}
          >
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nome Completo</label>
            <input
              type="text"
              placeholder="O teu nome"
              value={nome}
              onChange={aoDigitar(setNome)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={aoDigitar(setEmail)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Senha (mínimo 6 caracteres)</label>
            <input
              type="password"
              placeholder="********"
              value={senha}
              onChange={aoDigitar(setSenha)}
              required
            />
          </div>

          <button type="submit" className={styles.btnLogin}>Cadastrar Conta</button>

          <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#64748b' }}>
            Já tens uma conta?{' '}
            <span
              onClick={() => setPaginaAtual('login')}
              style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Fazer Login
            </span>
          </p>

          <p style={{ textAlign: 'center', marginTop: '8px', fontSize: '14px', color: '#64748b' }}>
            Quer vender seus produtos?{' '}
            <span
              onClick={() => setPaginaAtual('fornecedor')}
              style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Cadastre sua empresa
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}