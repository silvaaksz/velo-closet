import { ShoppingBag, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <ShoppingBag size={13} className="text-white" />
              </div>
              <span className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}>
                VELO<span className="text-primary">-CLOSET</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Conectando compradores a pequenas confecções de todo o Brasil.
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:contato@velocloset.com.br" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
                <Mail size={12} /> contato@velocloset.com.br
              </a>
              <a href="tel:+5511999999999" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: "'DM Mono', monospace" }}>
                <Phone size={12} /> (11) 99999-9999
              </a>
            </div>
          </div>

          {[
            { title: "Compradores", links: ["Como comprar", "Formas de pagamento", "Rastrear pedido", "Devoluções"] },
            { title: "Fabricantes", links: ["Cadastrar empresa", "Painel do fornecedor", "Regras da plataforma", "Comissões"] },
            { title: "Empresa", links: ["Sobre a Velo-Closet", "Blog", "Carreiras", "Imprensa"] },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em" }}>{col.title}</h5>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}