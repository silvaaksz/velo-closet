import { useState } from "react";

const CATEGORIES = ["Todos", "Blusas", "Calças", "Vestidos", "Conjuntos", "Casacos", "Acessórios", "Sale"];

export function CategoryBar() {
  const [active, setActive] = useState("Todos");
  return (
    <div className="border-b border-border overflow-x-auto bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-1 py-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              active === cat ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "13px", letterSpacing: "0.02em" }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}