export function HowItWorks() {
  const steps = [
    { number: "01", icon: "🔍", title: "Busque o produto", desc: "Digite o que você precisa. Nossa IA encontra todas as confecções que produzem aquela peça." },
    { number: "02", icon: "📉", title: "Compare as ofertas", desc: "Veja preço, prazo de entrega, avaliação e localização de cada confecção lado a lado." },
    { number: "03", icon: "🛒", title: "Compre com segurança", desc: "Pague pelo marketplace. Seu dinheiro só é liberado após você confirmar o recebimento." },
    { number: "04", icon: "🚚", title: "Receba em casa", desc: "Rastreie cada etapa em tempo real. Suporte dedicado para qualquer imprevisto." },
  ];

  return (
    <section className="py-16 md:py-20 border-t border-border bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-muted-foreground text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>Simples assim</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
            Como funciona em 4 passos
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border" />
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-start gap-4 bg-white border border-border rounded-xl p-5 hover:border-primary/25 transition-colors">
              <div className="flex items-center justify-between w-full">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg">{step.icon}</div>
                <span className="text-3xl font-black text-muted-foreground/20" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{step.number}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}