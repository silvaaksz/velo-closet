import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {
  const [isCadastro, setIsCadastro] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <h2>{isCadastro ? 'Criar Nova Conta' : 'Acessar Conta'}</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          {isCadastro && (
            <div className={styles.inputGroup}>
              <label>Nome Completo</label>
              <input type="text" placeholder="Seu nome" />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" />
          </div>

          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input type="password" placeholder="••••••••" />
          </div>

          {isCadastro && (
            <div className={styles.inputGroup}>
              <label>Perfil de Conta</label>
              <select>
                <option>Cliente / Comprador</option>
                <option>Fornecedor / Fabricante</option>
              </select>
            </div>
          )}

          <button className={styles.submitBtn}>
            {isCadastro ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isCadastro ? 'Já tem uma conta?' : 'Ainda não tem conta?'}{' '}
          <span onClick={() => setIsCadastro(!isCadastro)}>
            {isCadastro ? 'Entrar' : 'Cadastre-se'}
          </span>
        </p>
      </div>
    </div>
  );
}