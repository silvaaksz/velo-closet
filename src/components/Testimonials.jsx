import { Star, MapPin } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Fernanda Assis",
    role: "Cliente — São Paulo, SP",
    text: "Economizei 36% na minha primeira compra. A comparação de preços entre fornecedoras é incrível — não preciso mais garimpar em várias lojas.",
    rating: 5,
    avatar: "FA",
  },
  {
    name: "Ricardo Melo",
    role: "Fabricante — Fortaleza, CE",
    text: "Cadastrei meu ateliê há três meses e já triplicamos as vendas fora do Ceará. A plataforma trouxe clientes que eu jamais alcançaria.",
    rating: 5,
    avatar: "RM",
  },
  {
    name: "Carla Duarte",
    role: "Revendedora — Curitiba, PR",
    text: "O pagamento garantido pelo marketplace me deu segurança para comprar de confecções que ainda não conhecia. Recomendo demais.",
    rating: 5,
    avatar: "CD",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-20 border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-10">
          <span className="text-muted-foreground text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>Quem já usa a Velo-Closet</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
            Histórias reais, economias reais
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-primary/20 hover:shadow-sm transition-all">
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-foreground text-sm leading-relaxed flex-1 italic" style={{ fontFamily: "'Inter', sans-serif" }}>"{t.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-black text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "15px" }}>{t.name}</div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
                    <MapPin size={9} /> {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}