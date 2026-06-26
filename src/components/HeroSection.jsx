export function HeroSection({ onShopClick }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-white text-center sm:text-left">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-700 animate-pulse" />
            <span className="text-blue-700 text-xs font-semibold tracking-wide uppercase">
              +12.400 confecções cadastradas no Brasil
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-none mb-6">
            A roupa que você quer,{" "}
            <span className="text-blue-700">direto de quem fabrica,</span>{" "}
            pelo menor preço.
          </h1>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            A primeira plataforma que compara ofertas de pequenas confecções de todo o Brasil para você economizar tempo e dinheiro.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
            <button
              onClick={onShopClick}
              className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all"
            >
              🛍️ Ir às Compras
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900 font-semibold text-lg px-6 py-4 rounded-lg transition-colors">
              Ver como funciona
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}