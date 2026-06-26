export function Header({ cartCount, onMenuToggle, menuOpen, onLogoClick }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
        <button onClick={onLogoClick} className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-md bg-blue-700 flex items-center justify-center text-white text-sm">
            🛍️
          </div>
          <span className="text-lg font-black hidden sm:block text-gray-900">
            VELO<span className="text-blue-700">-CLOSET</span>
          </span>
        </button>

        <div className="flex-1 flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 gap-2 min-w-0 focus-within:border-blue-700/50 transition-all">
          <span className="text-sm shrink-0">🔍</span>
          <input
            type="text"
            placeholder="O que você está procurando hoje? Compare preços de milhares de fabricantes..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-500 outline-none min-w-0"
          />
          <button className="hidden sm:flex shrink-0 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded-md transition-colors">
            Buscar
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-1 shrink-0">
          <a href="#" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
            👤 Área do Cliente
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors relative">
            🛒 Carrinho
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-700 text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm font-bold bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors ml-1">
            🏭 Sou Fabricante
          </a>
        </nav>
      </div>
    </header>
  );
}