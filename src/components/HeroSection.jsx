import { ShoppingBag } from "lucide-react";

export function HeroSection({ onShopClick }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-white">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #1D4ED8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute top-0 right-1/4 w-96 h-80 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #1D4ED8, transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-semibold tracking-wide uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
              +12.400 confecções cadastradas no Brasil
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground leading-none mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}
          >
            A roupa que você quer,{" "}
            <span className="text-primary">direto de quem fabrica,</span>{" "}
            pelo menor preço.
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
            A primeira plataforma que compara ofertas de pequenas confecções de todo o Brasil para você economizar{" "}
            <strong className="text-foreground">tempo e dinheiro</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onShopClick}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}
            >
              <ShoppingBag size={18} />
              Ir às Compras
            </button>
            <button className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/70 border border-border text-foreground font-semibold text-lg px-6 py-4 rounded-lg transition-colors">
              Ver como funciona
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-border">
            {[
              { value: "R$ 4,2M", label: "economizados por compradores" },
              { value: "98,7%", label: "pedidos entregues no prazo" },
              { value: "4.9★", label: "avaliação na App Store" },
            ].map((s) => (
              <div key={s.label}>
                <span className="block text-2xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {s.value}
                </span>
                <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}