import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CategoryBar } from "./components/CategoryBar";
import { ProductGrid } from "./components/ProductGrid";
import { B2BBanner } from "./components/B2BBanner";
import { Testimonials } from "./components/Testimonials";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";

// IMPORTAÇÃO DAS IMAGENS (Devem ser as mesmas do seu ProductGrid)
import baggy from "./assets/baggy.jpg";
import croped from "./assets/croped.jpg";
import vestido from "./assets/vestido.jpg";
import jaqueta from "./assets/jaqueta.jpg";

// Banco de dados estendido para renderizar a tela de detalhes de cada peça clicada
const DETAILS_DATA = {
  calca: {
    name: "Calça Baggy Wide Leg com Corrente",
    category: "CALÇAS • STREETWEAR",
    image: baggy,
    price: "129,90",
    oldPrice: "199,90",
    savings: "35%",
    suppliersCount: 5,
    suppliers: [
      { name: "ConfecçãoSul Ltda.", loc: "Porto Alegre, RS", rating: "4.9", price: "129,90", shipping: "Frete Grátis", badge: "Melhor Preço" },
      { name: "ModaFábrica SP", loc: "São Paulo, SP", rating: "4.7", price: "144,90", shipping: "+ R$ 12,00 frete" },
      { name: "TêxtilNordeste", loc: "Fortaleza, CE", rating: "4.5", price: "155,00", shipping: "Frete Grátis" }
    ]
  },
  blusa: {
    name: "Blusa Cropped Canelada",
    category: "BLUSAS • CASUAL",
    image: croped,
    price: "34,90",
    oldPrice: "54,90",
    savings: "36%",
    suppliersCount: 6,
    suppliers: [
      { name: "Malharia Tricot Luxo", loc: "Jacutinga, MG", rating: "4.8", price: "34,90", shipping: "Frete Grátis", badge: "Melhor Preço" },
      { name: "Ateliê Costura Fina", loc: "Brás, SP", rating: "4.6", price: "39,90", shipping: "+ R$ 8,00 frete" }
    ]
  },
  vestido: {
    name: "Vestido Midi Lastex Floral",
    category: "VESTIDOS • VERÃO",
    image: vestido,
    price: "89,90",
    oldPrice: "149,90",
    savings: "40%",
    suppliersCount: 4,
    suppliers: [
      { name: "Flores Confecções", loc: "Goiânia, GO", rating: "4.7", price: "89,90", shipping: "+ R$ 10,00 frete", badge: "Melhor Preço" },
      { name: "Moda Atacado Sul", loc: "Maringá, PR", rating: "4.5", price: "99,90", shipping: "Frete Grátis" }
    ]
  },
  jaqueta: {
    name: "Jaqueta Jeans Oversized Destroyer",
    category: "CASACOS • DENIM",
    image: jaqueta,
    price: "159,90",
    oldPrice: "239,90",
    savings: "33%",
    suppliersCount: 7,
    suppliers: [
      { name: "Denim de Origem de Fábrica", loc: "Blumenau, SC", rating: "4.9", price: "159,90", shipping: "Frete Grátis", badge: "Melhor Preço" },
      { name: "Jeans Industrial SP", loc: "Osasco, SP", rating: "4.8", price: "169,90", shipping: "Frete Grátis" }
    ]
  }
};

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null); // Salva qual ID foi clicado
  const [selectedSize, setSelectedSize] = useState("M");

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    alert("Produto adicionado ao carrinho com sucesso!");
  };

  // Pega os dados específicos do produto que o usuário clicou
  const activeProduct = DETAILS_DATA[selectedProductId];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Header 
        cartCount={cartCount} 
        onLogoClick={() => setSelectedProductId(null)} // Clicar no logo volta pra Home
      />

      {!selectedProductId ? (
        /* --- TELA INICIAL (HOME) --- */
        <>
          <CategoryBar />
          <HeroSection onShopClick={() => {
            const element = document.getElementById("produtos");
            element?.scrollIntoView({ behavior: "smooth" });
          }} />
          {/* O onNavigate agora captura o ID clicado (calca, blusa, vestido, jaqueta) */}
          <ProductGrid onNavigate={(id) => setSelectedProductId(id)} />
          <B2BBanner />
          <Testimonials />
          <Features />
        </>
      ) : (
        /* --- TELA DE DETALHES DINÂMICA (IGUAL AO VÍDEO) --- */
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <button 
            onClick={() => setSelectedProductId(null)}
            className="text-sm font-semibold text-blue-700 hover:underline mb-6 inline-flex items-center gap-1"
          >
            ← Voltar para Roupas
          </button>

          {activeProduct && (
            <>
              {/* Bloco Superior: Imagem e Informações do Produto Clicado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
                <div className="bg-white p-4 border border-gray-200 rounded-2xl overflow-hidden aspect-[3/4]">
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.name} 
                    className="w-full h-full object-cover object-top rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">{activeProduct.category}</span>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-1">{activeProduct.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-amber-500 text-sm">★★★★★</span>
                      <span className="text-xs text-gray-500 font-mono">4.8 (Média da Vitrine)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-100/70 border border-gray-200 rounded-xl">
                    <div className="text-sm text-gray-400 line-through">R$ {activeProduct.oldPrice}</div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-black text-gray-900">R$ {activeProduct.price}</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">📉 Economize {activeProduct.savings}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">📦 Frete direto do fornecedor têxtil</div>
                  </div>

                  {/* Seleção de Tamanhos */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-gray-700 mb-2">
                      <span>Tamanho: {selectedSize}</span>
                    </div>
                    <div className="flex gap-2">
                      {["P", "M", "G", "GG"].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 rounded-md font-bold text-xs border transition-all ${
                            selectedSize === size
                              ? "bg-blue-700 text-white border-blue-700"
                              : "bg-white text-gray-800 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Botão de Carrinho */}
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white text-lg font-bold py-4 rounded-xl shadow-sm transition-all"
                  >
                    🛒 Adicionar ao Carrinho
                  </button>
                </div>
              </div>

              {/* Bloco Inferior: Tabela Comparativa de Fábricas para a Peça Selecionada */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-black text-gray-900 mb-6">
                  {activeProduct.suppliersCount} fornecedores competitivos para esta peça
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-xs font-bold uppercase text-gray-400 tracking-wider">
                        <th className="pb-3 font-semibold">Fabricante / Confecção</th>
                        <th className="pb-3 font-semibold">Polo Industrial</th>
                        <th className="pb-3 font-semibold">Avaliação</th>
                        <th className="pb-3 font-semibold text-right">Preço na Fábrica</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {activeProduct.suppliers.map((sup, index) => (
                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 font-bold text-gray-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">F{index+1}</span>
                            {sup.name}
                            {sup.badge && <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold uppercase">{sup.badge}</span>}
                          </td>
                          <td className="py-4 text-gray-500">{sup.loc}</td>
                          <td className="py-4 text-amber-500">★ {sup.rating}</td>
                          <td className="py-4 text-right font-black text-gray-900">R$ {sup.price} <span className="block text-[10px] text-emerald-600 font-normal">{sup.shipping}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      )}

      <Footer />
    </div>
  );
}