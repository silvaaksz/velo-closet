import React from 'react';
import styles from './Home.module.css';

export default function Home({ setPaginaAtual }) {
  const passos = [
    { 
      id: '01', 
      titulo: 'Busque o produto', 
      desc: 'Digite o que você precisa. Nossa plataforma compara diversas confecções que produzem o modelo desejado.' 
    },
    { 
      id: '02', 
      titulo: 'Compare as ofertas', 
      desc: 'Veja preço, prazo de entrega, avaliação da confecção e custo do frete lado a lado.' 
    },
    { 
      id: '03', 
      titulo: 'Compre com segurança', 
      desc: 'Faça o pagamento via plataforma com garantia total. O valor só é repassado após o recebimento.' 
    },
    { 
      id: '04', 
      titulo: 'Receba em casa', 
      desc: 'Acompanhe a produção e o envio em tempo real com rastreamento integrado e suporte dedicado.' 
    }
  ];

  const depoimentos = [
    {
      texto: '"Economizei 36% na minha primeira compra. A comparação de preços entre fornecedores é incrível — não preciso mais garimpar em várias lojas."',
      autor: 'Fernanda Rossi',
      local: '📍 Varejista — São Paulo, SP',
      estrelas: '★★★★★'
    },
    {
      texto: '"Cadastrei meu ateliê há três meses e já triplicamos as vendas fora do Ceará. A plataforma trouxe clientes que eu jamais alcançaria."',
      autor: 'Ricardo Melo',
      local: '📍 Fabricante — Fortaleza, CE',
      estrelas: '★★★★★'
    },
    {
      texto: '"O pagamento garantido pelo marketplace me deu segurança para comprar de confecções que ainda não conhecia. Recomendo demais!"',
      autor: 'Carla Duarte',
      local: '📍 Revendedora — Curitiba, PR',
      estrelas: '★★★★★'
    }
  ];

  const beneficios = [
    {
      titulo: 'Comparação em Tempo Real',
      desc: 'Encontre a mesma peça vendida por diferentes confecções e escolha a melhor oferta — atualizada instantaneamente.',
      tag: 'ATÉ 41% MAIS BARATO'
    },
    {
      titulo: 'Direto da Confecção',
      desc: 'Apoie o pequeno empreendedor e compre sem intermediários. Cada pedido vai direto da linha de produção para você.',
      tag: '+12.400 confecções'
    },
    {
      titulo: 'Compra 100% Segura',
      desc: 'Pagamento garantido pelo marketplace e rastreamento de ponta a ponta — seu dinheiro só é liberado após a entrega confirmada.',
      tag: 'Garantia de 30 dias'
    }
  ];

  return (
    <div className={styles.container}>
      {/* HERO BANNER ALINHADO À ESQUERDA (ESTILO IMAGEM 3) */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            A roupa que você quer, <span className={styles.highlight}>direto de quem fabrica</span>, pelo menor preço.
          </h1>
          <p className={styles.heroDescription}>
            A primeira plataforma que compara ofertas de pequenas confecções de todo o Brasil para você economizar <strong>tempo e dinheiro</strong>.
          </p>

          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} onClick={() => setPaginaAtual('produtos')}>
              Ir às Compras
            </button>
            <a href="#como-funciona" className={styles.btnSecondary}>
              Ver como funciona
            </a>
          </div>

          <div className={styles.metricsBar}>
            <div className={styles.metricItem}>
              <h3>R$ 4,2M</h3>
              <p>economizados por compradores</p>
            </div>
            <div className={styles.metricItem}>
              <h3>98,7%</h3>
              <p>pedidos entregues no prazo</p>
            </div>
            <div className={styles.metricItem}>
              <h3>4,9 ★</h3>
              <p>avaliação na App Store</p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAMADA PARA O CATÁLOGO */}
      <section className={styles.ctaProdutosSection}>
        <div className={styles.ctaCard}>
          <div>
            <span className={styles.subhead}>CATÁLOGO UNIFICADO</span>
            <h2>Milhares de peças direto de pequenas confecções</h2>
            <p>Compare preços de calças, blusas, vestidos e conjuntos em centenas de fornecedores parceiros.</p>
          </div>
          <button className={styles.btnCta} onClick={() => setPaginaAtual('produtos')}>
            Explorar Todos os Produtos →
          </button>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className={styles.howItWorksSection}>
        <span className={styles.sectionSub}>SIMPLES ASSIM</span>
        <h2>Como funciona a plataforma em 4 passos</h2>

        <div className={styles.passosGrid}>
          {passos.map((passo) => (
            <div key={passo.id} className={styles.passoCard}>
              <span className={styles.passoNum}>{passo.id}</span>
              <h3>{passo.titulo}</h3>
              <p>{passo.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER PARA FABRICANTES */}
      <section className={styles.bannerFabricantesSection}>
        <div className={styles.bannerCard}>
          <div className={styles.bannerInfo}>
            <span className={styles.badgeBanner}>🏷️ PARA FABRICANTES</span>
            <h2>Produz e quer vender mais? <span>Cadastre sua confecção</span> no nosso marketplace.</h2>
            <p>
              Nós cuidamos da tecnologia — vitrine, pagamentos, rastreamento e suporte ao comprador. Você foca no que sabe fazer: <strong>produzir e enviar</strong>.
            </p>

            <ul className={styles.bannerFeatures}>
              <li>✓ Zero mensalidade no 1º ano</li>
              <li>✓ Painel de vendas em tempo real</li>
              <li>✓ Logística integrada</li>
            </ul>

            <button className={styles.btnCadastrarEmpresa} onClick={() => setPaginaAtual('fornecedor')}>
              Cadastrar Minha Empresa ➔
            </button>
          </div>

          <div className={styles.bannerStatsGrid}>
            <div className={styles.bannerStat}>
              <h3>12.4K+</h3>
              <p>Confecções ativas</p>
            </div>
            <div className={styles.bannerStat}>
              <h3>R$2,8M</h3>
              <p>Pago aos fabricantes</p>
            </div>
            <div className={styles.bannerStat}>
              <h3>89K+</h3>
              <p>Compradores na plataforma</p>
            </div>
            <div className={styles.bannerStat}>
              <h3>4,8★</h3>
              <p>Satisfação dos fornecedores</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className={styles.beneficiosSection}>
        <span className={styles.sectionSub}>POR QUE A VELO-CLOSET?</span>
        <h2>Benefícios que você sente no bolso</h2>

        <div className={styles.beneficiosGrid}>
          {beneficios.map((b, index) => (
            <div key={index} className={styles.beneficioCard}>
              <h3>{b.titulo}</h3>
              <p>{b.desc}</p>
              <span className={styles.beneficioTag}>{b.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS DE USUÁRIOS */}
      <section className={styles.depoimentosSection}>
        <span className={styles.sectionSub}>QUEM JÁ USA E APROVA</span>
        <h2>Histórias reais, economias reais</h2>

        <div className={styles.depoimentosGrid}>
          {depoimentos.map((d, index) => (
            <div key={index} className={styles.depoimentoCard}>
              <div className={styles.stars}>{d.estrelas}</div>
              <p className={styles.depoimentoTexto}>{d.texto}</p>
              <div className={styles.depoimentoAutor}>
                <strong>{d.autor}</strong>
                <span>{d.local}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}