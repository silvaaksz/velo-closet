import { Factory, CheckCircle, ArrowRight } from "lucide-react";

export function B2BBanner() {
  return (
    <section className="py-16 md:py-20 border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className="relative rounded-2xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8"
          style={{ background: "linear-gradient(135deg, #EFF3FF 0%, #DBEAFE 60%, #EFF6FF 100%)", border: "1px solid rgba(29,78,216,0.15)" }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl" />
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #1D4ED8, transparent)" }} />

          <div className="flex-1 relative">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-4">
              <Factory size={12} className="text-primary" />
              <span className="text-primary text-xs font-semibold tracking-wide uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>Para fabricantes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
              Produz e quer vender mais?{" "}
              <span className="text-primary">Cadastre sua confecção</span>{" "}
              no nosso marketplace.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Nós cuidamos da tecnologia — vitrine, pagamentos, rastreamento e suporte ao comprador. Você foca no que sabe fazer:{" "}
              <strong className="text-foreground">produzir e enviar</strong>.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              {["Zero mensalidade no 1º ano", "Painel de vendas em tempo real", "Logística integrada"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" /> {item}
                </div>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-black text-lg px-8 py-3.5 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}>
              Cadastrar Minha Empresa <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0 w-full md:w-auto">
            {[
              { value: "12.4K+", label: "Confecções ativas" },
              { value: "R$2,8M", label: "Pagos aos fabricantes" },
              { value: "89K+", label: "Compradores na plataforma" },
              { value: "4.8★", label: "Satisfação dos fornecedores" },
            ].map((s) => (
              <div key={s.label} className="bg-white/70 border border-primary/10 rounded-xl p-4 text-center">
                <span className="block text-2xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{s.value}</span>
                <span className="text-[11px] text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}