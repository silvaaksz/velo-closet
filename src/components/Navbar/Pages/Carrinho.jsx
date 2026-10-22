import React, { useState } from 'react';
import styles from './Carrinho.module.css';

export default function Carrinho({ carrinho, removerDoCarrinho, setPaginaAtual, setCarrinho, setPedidosHistorico }) {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [freteCalculado, setFreteCalculado] = useState(null);
  const [metodoPagamento, setMetodoPagamento] = useState('pix');
  const [pedidoConcluido, setPedidoConcluido] = useState(false);
  const [codigoRastreio, setCodigoRastreio] = useState('');

  const totalProdutos = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const valorFrete = freteCalculado ? freteCalculado.valor : 0;
  const desconto = metodoPagamento === 'pix' ? totalProdutos * 0.05 : 0;
  const totalFinal = totalProdutos + valorFrete - desconto;

  // Função para consultar o CEP real usando a API gratuita ViaCEP
  const consultarCepReal = async (e) => {
    e.preventDefault();
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      alert('Por favor, insira um CEP válido com 8 dígitos.');
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado. Verifique o número digitado.');
        setEndereco(null);
        setFreteCalculado(null);
        return;
      }

      // Endereço real encontrado via API
      setEndereco({
        rua: data.logradouro || 'Endereço não especificado',
        bairro: data.bairro || 'Zona Urbana',
        cidade: data.localidade,
        estado: data.uf
      });

      // Simula um valor de frete proporcional ou fixo
      setFreteCalculado({ valor: 22.90, prazo: '3 a 5 dias úteis' });
    } catch (error) {
      alert('Erro ao consultar o CEP. Verifique sua conexão com a internet.');
    }
  };

  const finalizarCompra = () => {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }
    if (!freteCalculado || !endereco) {
      alert('Por favor, informe e consulte o seu CEP antes de finalizar.');
      return;
    }

    const codRastreio = 'VC' + Math.floor(100000 + Math.random() * 900000) + 'BR';
    setCodigoRastreio(codRastreio);

    const novoPedido = {
      codigo: codRastreio,
      itens: [...carrinho],
      total: totalFinal,
      status: 'Entregue',
      data: new Date().toLocaleDateString()
    };

    setPedidosHistorico((prev) => [novoPedido, ...prev]);
    setPedidoConcluido(true);
    setCarrinho([]);
  };

  if (pedidoConcluido) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <h2>Pedido Realizado com Sucesso</h2>
          <p>O seu pedido foi processado e encaminhado às confecções parceiras.</p>
          <div className={styles.codigoBox}>
            <span>Código de Rastreamento:</span>
            <strong>{codigoRastreio}</strong>
          </div>
          {endereco && (
            <p className={styles.enderecoTexto}>
              <strong>Endereço de Entrega:</strong> {endereco.rua}, {endereco.bairro} - {endereco.cidade}/{endereco.estado}
            </p>
          )}

          <div className={styles.btnGroupSuccess}>
            <button className={styles.btnRastrear} onClick={() => setPaginaAtual('rastreio')}>
              Rastrear Pedido (UC07)
            </button>
            <button className={styles.btnHome} onClick={() => setPaginaAtual('home')}>
              Voltar à Página Inicial
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Carrinho de Compras</h2>

      {carrinho.length === 0 ? (
        <div className={styles.empty}>
          <p>O seu carrinho está vazio no momento.</p>
          <button className={styles.btnExplore} onClick={() => setPaginaAtual('produtos')}>
            Explorar Produtos
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {/* Coluna da Esquerda: Produtos */}
          <div className={styles.leftColumn}>
            <div className={styles.itemsList}>
              {carrinho.map((item) => (
                <div key={item.idCarrinho} className={styles.itemCard}>
                  <img src={item.imagem} alt={item.titulo} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <h3>{item.titulo}</h3>
                    <p>Fabricante: <strong>{item.fornecedor}</strong></p>
                    <p>Tamanho: <strong>{item.tamanho}</strong></p>
                    <span className={styles.itemPreco}>
                      R$ {item.preco.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <button 
                    className={styles.btnRemove} 
                    onClick={() => removerDoCarrinho(item.idCarrinho)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna da Direita: Frete, Endereço e Pagamento juntos */}
          <div className={styles.summaryCard}>
            <h3>Resumo e Pagamento</h3>

            {/* Seção de CEP */}
            <div className={styles.secaoBloco}>
              <label>Consultar Frete e Endereço (CEP)</label>
              <form onSubmit={consultarCepReal} className={styles.formCep}>
                <input 
                  type="text" 
                  placeholder="Ex: 01001-000" 
                  value={cep} 
                  onChange={(e) => setCep(e.target.value)}
                  maxLength="9" 
                  required 
                />
                <button type="submit">OK</button>
              </form>

              {endereco && freteCalculado && (
                <div className={styles.enderecoResultado}>
                  <p><strong>Local:</strong> {endereco.rua}, {endereco.bairro} - {endereco.cidade}/{endereco.estado}</p>
                  <p><strong>Prazo:</strong> {freteCalculado.prazo}</p>
                </div>
              )}
            </div>

            <hr />

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>R$ {totalProdutos.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Frete</span>
              <span>{freteCalculado ? `R$ ${valorFrete.toFixed(2).replace('.', ',')}` : 'A calcular'}</span>
            </div>

            {metodoPagamento === 'pix' && (
              <div className={styles.summaryRowDiscount}>
                <span>Desconto PIX (5%)</span>
                <span>- R$ {desconto.toFixed(2).replace('.', ',')}</span>
              </div>
            )}

            <hr />

            <div className={styles.summaryRowTotal}>
              <span>Total Final</span>
              <span>R$ {totalFinal.toFixed(2).replace('.', ',')}</span>
            </div>

            <h4 style={{ marginTop: '15px' }}>Forma de Pagamento</h4>
            <div className={styles.paymentOptions}>
              <label>
                <input 
                  type="radio" 
                  name="pagamento" 
                  value="pix" 
                  checked={metodoPagamento === 'pix'} 
                  onChange={() => setMetodoPagamento('pix')} 
                />
                PIX (5% de desconto automático)
              </label>

              <label>
                <input 
                  type="radio" 
                  name="pagamento" 
                  value="cartao" 
                  checked={metodoPagamento === 'cartao'} 
                  onChange={() => setMetodoPagamento('cartao')} 
                />
                Cartão de Crédito (até 6x)
              </label>
            </div>

            <button className={styles.btnFinalize} onClick={finalizarCompra}>
              Concluir Pagamento e Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}