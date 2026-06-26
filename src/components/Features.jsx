export function Features() {
  const features = [
    { icon: "⚡", title: "Comparação em Tempo Real", desc: "Encontre a mesma peça vendida por diferentes confecções e escolha a melhor oferta — atualizado a cada 5 minutos.", stat: "Até 41% mais barato" },
    { icon: "🏭", title: "Direto da Confecção", desc: "Apoie o pequeno empreendedor e compre sem intermediários. Cada pedido vai direto da linha de produção para você.", stat: "+12.400 confecções" },
    { icon: "🛡️", title: "Compra 100% Segura", desc: "Pagamento garantido pelo marketplace e rastreamento de ponta a ponta — seu dinheiro só é liberado após a entrega confirmada.", stat: "Garantia de 30 dias" },
  ];

  return (
    <section className="py-16 md:py-20 border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-12">
          <span className="text-muted-foreground text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>Por que a Velo-Closet?</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
            Benefícios que você sente no bolso
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-muted/40 border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-primary/25 hover:shadow-sm transition-all group">
              <div className="w-10 h-10 rounded-lg bg-white border border-border flex items-center justify-center group-hover:border-primary/20 transition-colors text-lg">{f.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{f.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-border">
                <span className="text-xs font-semibold text-primary" style={{ fontFamily: "'DM Mono', monospace" }}>{f.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}