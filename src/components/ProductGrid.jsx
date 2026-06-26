import { useState } from "react";
import { TrendingDown, Package, Star, ArrowRight, ShoppingCart, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback"; // Ajuste o caminho se necessário
import pantsImage from "../imports/images.jpg"; // Ajuste o caminho real da sua imagem interna

const CLOTHING_PRODUCTS = [
  {
    id: "calca",
    name: "Calça Baggy Wide Leg com Corrente",
    category: "Calças",
    suppliers: 5,
    price: 129.9,
    originalPrice: 199.9,
    savings: 35,
    rating: 4.9,
    reviews: 284,
    useLocalImage: true,
    image: "",
    badge: "Mais Vendido",
  },
  {
    id: "blusa",
    name: "Blusa Cropped Canelada",
    category: "Blusas",
    suppliers: 6,
    price: 34.9,
    originalPrice: 54.9,
    savings: 36,
    rating: 4.8,
    reviews: 418,
    useLocalImage: false,
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=480&h=360&fit=crop&auto=format",
    badge: "Novidade",
  },
  {
    id: "vestido",
    name: "Vestido Midi Floral",
    category: "Vestidos",
    suppliers: 7,
    price: 119.9,
    originalPrice: 189.9,
    savings: 37,
    rating: 4.8,
    reviews: 311,
    useLocalImage: false,
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=480&h=360&fit=crop&auto=format",
    badge: "Melhor Oferta",
  },
  {
    id: "conjunto",
    name: "Conjunto Alfaiataria Oversized",
    category: "Conjuntos",
    suppliers: 3,
    price: 159.9,
    originalPrice: 219.9,
    savings: 27,
    rating: 4.9,
    reviews: 97,
    useLocalImage: false,
    image: "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=480&h=360&fit=crop&auto=format",
    badge: null,
  },
];

function ProductCard({ product, onNavigate }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary/30 hover:shadow-md transition-all hover:-translate-y-0.5 group">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.useLocalImage ? (
          <ImageWithFallback
            src={pantsImage}
            alt={product.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {product.badge && (
          <div className="absolute top-2 left-2">
            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-primary text-white uppercase tracking-wide" style={{ fontFamily: "'DM Mono', monospace" }}>
              {product.badge}
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md bg-emerald-500/90 text-white">
            <TrendingDown size={10} /> Economize {product.savings}%
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
            {product.category}
          </span>
          <h4 className="font-bold text-foreground mt-1 leading-snug" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "17px" }}>
            {product.name}
          </h4>
        </div>

        <div className="flex items-center gap-1.5">
          <Package size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
            Disponível em <strong className="text-foreground">{product.suppliers} fornecedores</strong>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground"} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-border flex items-end justify-between gap-2">
          <div>
            <span className="text-xs text-muted-foreground line-through" style={{ fontFamily: "'DM Mono', monospace" }}>
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
            <div>
              <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>A partir de </span>
              <span className="text-xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 items-end shrink-0">
            {product.useLocalImage && (
              <button
                onClick={() => onNavigate(product.id)}
                className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/70 text-primary border border-primary/20 transition-colors"
              >
                Ver mais <ArrowRight size={11} />
              </button>
            )}
            <button
              onClick={() => setAdded(true)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                added
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "bg-primary hover:bg-primary/90 text-white"
              }`}
            >
              {added ? <><CheckCircle size={13} /> Adicionado</> : <><ShoppingCart size={13} /> Comparar</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ onNavigate }) {
  return (
    <section id="produtos" className="py-16 md:py-20 border-t border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-muted-foreground text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
              Vitrine de hoje
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mt-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}>
              ROUPAS — Compare. Escolha. Economize.
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold shrink-0 transition-colors">
            Ver todos os produtos <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CLOTHING_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
}