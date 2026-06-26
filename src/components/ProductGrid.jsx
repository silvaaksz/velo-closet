import { useState } from "react";
import pantsImage from "../assets/hero.png";

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
    badge: "Novidade",
  },
];

export function ProductGrid({ onNavigate }) {
  const [addedId, setAddedId] = useState(null);

  return (
    <section id="produtos" className="py-16 md:py-20 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">
          ROUPAS — Compare. Escolha. Economize.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLOTHING_PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:border-blue-500/30 hover:shadow-md transition-all group">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={pantsImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded bg-blue-700 text-white uppercase">
                    {product.badge}
                  </span>
                )}
                <span className="absolute top-2 right-2 text-[11px] font-bold px-2 py-1 rounded bg-emerald-500 text-white">
                  📉 Economize {product.savings}%
                </span>
              </div>

              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase">{product.category}</span>
                  <h4 className="font-bold text-gray-900 mt-1 text-lg leading-snug">{product.name}</h4>
                </div>
                
                <span className="text-xs text-gray-500">📦 Disponível em <strong className="text-gray-900">{product.suppliers} fornecedores</strong></span>
                <span className="text-xs text-amber-500">★ <span className="text-gray-500">{product.rating} ({product.reviews})</span></span>

                <div className="mt-auto pt-3 border-t border-gray-100 flex items-end justify-between gap-2">
                  <div>
                    <span className="text-xs text-gray-400 line-through">R$ {product.originalPrice.toFixed(2).replace(".", ",")}</span>
                    <div className="text-xl font-black text-gray-900">R$ {product.price.toFixed(2).replace(".", ",")}</div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    {product.id === "calca" && (
                      <button onClick={() => onNavigate?.(product.id)} className="text-[11px] font-bold px-2 py-1 rounded bg-gray-100 text-blue-700 border border-blue-200 hover:bg-gray-200">
                        Ver mais ➔
                      </button>
                    )}
                    <button
                      onClick={() => setAddedId(product.id)}
                      className={`text-xs font-bold px-3 py-2 rounded-lg transition-all ${
                        addedId === product.id ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-blue-700 text-white hover:bg-blue-800"
                      }`}
                    >
                      {addedId === product.id ? "✓ Adicionado" : "🛒 Comparar"}
                    </button>
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