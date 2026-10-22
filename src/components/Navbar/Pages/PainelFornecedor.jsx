import React, { useState } from 'react';
import styles from './PainelFornecedor.module.css';

export default function PainelFornecedor({ adicionarNovoProduto }) {
  const [fornecedorAutenticado, setFornecedorAutenticado] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [planoSelecionado, setPlanoSelecionado] = useState('PRATA');

  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({
    titulo: '',
    categoria: 'CALÇAS',
    local: '',
    fabricante: '',
    preco: '',
    descricao: ''
  });

  const handleLoginFornecedor = (e) => {
    e.preventDefault();
    if (!cnpj || !senha) {
      return alert('Por favor, informe o CNPJ e a senha.');
    }
    setFornecedorAutenticado(true);
  };

  const handleSubmitProduto = (e) => {
    e.preventDefault();
    if (!form.titulo || !form.preco || !form.fabricante || !form.local) {
      return alert('Preencha todos os campos obrigatórios!');
    }
    adicionarNovoProduto(form);
    setForm({ titulo: '', categoria: 'CALÇAS', local: '', fabricante: '', preco: '', descricao: '' });
    setMostrarForm(false);
  };

  if (!fornecedorAutenticado) {
    return (
      <div className={styles.container}>
        <div className={styles.bannerHeader}>
          <h1>Portal do Fabricante & Confecção</h1>
          <p>Conecte a sua fábrica diretamente a milhares de compradores e lojistas em todo o Brasil.</p>
        </div>

        <h2 className={styles.secaoTitulo}>Planos de Assinatura B2B</h2>
        
        {/* Os 3 Planos do Usuário */}
        <div className={styles.gridPlanos}>
          {/* Plano Bronze */}
          <div 
            className={`${styles.cardPlano} ${planoSelecionado === 'BRONZE' ? styles.planoAtivo : ''}`}
            onClick={() => setPlanoSelecionado('BRONZE')}
          >
            <h3>Plano Bronze</h3>
            <span className={styles.subtituloPlano}>Gratuito / Entrada</span>
            <div className={styles.precoPlano}>R$ 0<span>/mês</span></div>
            <ul>
              <li>✓ Cadastre até 5 produtos</li>
              <li>✓ Ideal para a confecção testar a plataforma</li>
              <li>✓ Exibição standard no catálogo</li>
              <li>✓ Recebimento de vendas via Pix</li>
            </ul>
          </div>

          {/* Plano Prata */}
          <div 
            className={`${styles.cardPlano} ${styles.cardPro} ${planoSelecionado === 'PRATA' ? styles.planoAtivo : ''}`}
            onClick={() => setPlanoSelecionado('PRATA')}
          >
            <span className={styles.badgePopular}>MAIS RECOMENDADO</span>
            <h3>Plano Prata</h3>
            <span className={styles.subtituloPlano}>Crescimento</span>
            <div className={styles.precoPlano}>R$ 49<span>/mês</span></div>
            <ul>
              <li>✓ Cadastre até 30 produtos</li>
              <li>✓ Acesso ao painel de métricas simples</li>
              <li>✓ Suporte exclusivo via chat</li>
              <li>✓ Taxa de comissão reduzida</li>
            </ul>
          </div>

          {/* Plano Ouro */}
          <div 
            className={`${styles.cardPlano} ${planoSelecionado === 'OURO' ? styles.planoAtivo : ''}`}
            onClick={() => setPlanoSelecionado('OURO')}
          >
            <h3>Plano Ouro</h3>
            <span className={styles.subtituloPlano}>Ilimitado & Destaque</span>
            <div className={styles.precoPlano}>R$ 99<span>/mês</span></div>
            <ul>
              <li>✓ Catálogo ilimitado de produtos</li>
              <li>✓ Produtos em destaque na página inicial</li>
              <li>✓ Relatórios de tendências de vendas</li>
              <li>✓ Prioridade total no suporte</li>
            </ul>
          </div>
        </div>

        <div className={styles.loginBox}>
          <h3>Acesse a sua Conta de Fabricante</h3>
          <p>Se já tem cadastro ou deseja assinar o plano <strong>{planoSelecionado}</strong>, entre abaixo:</p>

          <form onSubmit={handleLoginFornecedor} className={styles.formLogin}>
            <div className={styles.fieldGroup}>
              <label>CNPJ da Confecção / Empresa *</label>
              <input 
                type="text" 
                placeholder="00.000.000/0001-00" 
                value={cnpj} 
                onChange={(e) => setCnpj(e.target.value)} 
                required 
              />
            </div>

            <div className={styles.fieldGroup}>
              <label>Senha de Acesso *</label>
              <input 
                type="password" 
                placeholder="********" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className={styles.btnEntrar}>
              Confirmar Assinatura ({planoSelecionado}) & Entrar no Painel →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Painel do Fabricante</h1>
          <p style={{ color: '#10b981', fontWeight: '600', margin: 0 }}>
            Plano {planoSelecionado} Ativo • CNPJ: {cnpj}
          </p>
        </div>
        <button className={styles.btnNew} onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? 'Cancelar' : '+ Cadastrar Novo Produto'}
        </button>
      </header>

      {mostrarForm && (
        <form onSubmit={handleSubmitProduto} className={styles.formCard}>
          <h3>Cadastrar Peça no Catálogo</h3>
          <div className={styles.formGrid}>
            <div>
              <label>Nome da Peça *</label>
              <input 
                type="text" 
                placeholder="Ex: Calça Cargo Streetwear" 
                value={form.titulo} 
                onChange={(e) => setForm({ ...form, titulo: e.target.value })} 
                required 
              />
            </div>

            <div>
              <label>Nome da sua Confecção *</label>
              <input 
                type="text" 
                placeholder="Ex: Confecção Nordeste Moda" 
                value={form.fabricante} 
                onChange={(e) => setForm({ ...form, fabricante: e.target.value })} 
                required 
              />
            </div>

            <div>
              <label>Cidade e Estado *</label>
              <input 
                type="text" 
                placeholder="Ex: Caruaru - PE" 
                value={form.local} 
                onChange={(e) => setForm({ ...form, local: e.target.value })} 
                required 
              />
            </div>

            <div>
              <label>Preço de Venda (R$) *</label>
              <input 
                type="number" 
                step="0.01" 
                placeholder="Ex: 89.90" 
                value={form.preco} 
                onChange={(e) => setForm({ ...form, preco: e.target.value })} 
                required 
              />
            </div>

            <div>
              <label>Categoria</label>
              <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
                <option value="CALÇAS">CALÇAS</option>
                <option value="BLUSAS">BLUSAS</option>
                <option value="VESTIDOS">VESTIDOS</option>
                <option value="JAQUETAS">JAQUETAS</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <label>Descrição da Peça</label>
            <textarea 
              rows="3" 
              placeholder="Descreva o tecido, modelagem e especificações da peça..." 
              value={form.descricao} 
              onChange={(e) => setForm({ ...form, descricao: e.target.value })} 
            />
          </div>

          <button type="submit" className={styles.btnSave}>
            Publicar Produto no Catálogo
          </button>
        </form>
      )}

      <div className={styles.gridStats}>
        <div className={styles.statCard}>
          <span>Vendas no Mês</span>
          <h2>R$ 14.250,00</h2>
        </div>
        <div className={styles.statCard}>
          <span>Pedidos Pendentes</span>
          <h2>18</h2>
        </div>
        <div className={styles.statCard}>
          <span>Avaliação Média</span>
          <h2>4.9 ★</h2>
        </div>
      </div>
    </div>
  );
}