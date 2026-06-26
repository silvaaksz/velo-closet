import { ShoppingBag, Search, User, ShoppingCart, Factory, Menu, X } from "lucide-react";

export function Header({ cartCount, onMenuToggle, menuOpen, onLogoClick }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
        <button onClick={onLogoClick} className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <ShoppingBag size={15} className="text-white" />
          </div>
          <span
            className="text-lg font-black hidden sm:block text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em" }}
          >
            VELO<span className="text-primary">-CLOSET</span>
          </span>
        </button>

        <div className="flex-1 flex items-center bg-muted border border-border rounded-lg px-3 py-2 gap-2 min-w-0 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="O que você está procurando hoje? Compare preços de milhares de fabricantes..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
          />
          <button className="hidden sm:flex shrink-0 bg-primary hover:bg-primary/90 text-white text-xs font-bold px-3 py-1.5 rounded-md transition-colors">
            Buscar
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-1 shrink-0">
          <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-md hover:bg-secondary transition-colors">
            <User size={15} /> Área do Cliente
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-md hover:bg-secondary transition-colors relative">
            <ShoppingCart size={15} /> Carrinho
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>
          <a href="#" className="flex items-center gap-1.5 text-sm font-bold bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors ml-1">
            <Factory size={14} /> Sou Fabricante
          </a>
        </nav>

        <button onClick={onMenuToggle} className="md:hidden p-2 text-muted-foreground hover:text-foreground" aria-label="Abrir menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-2">
          <a href="#" className="flex items-center gap-2 text-sm py-2 text-muted-foreground hover:text-foreground">
            <User size={15} /> Área do Cliente
          </a>
          <a href="#" className="flex items-center gap-2 text-sm py-2 text-muted-foreground hover:text-foreground">
            <ShoppingCart size={15} /> Carrinho ({cartCount})
          </a>
          <a href="#" className="flex items-center gap-2 text-sm py-2.5 mt-1 bg-primary text-white rounded-md px-3 font-bold justify-center">
            <Factory size={14} /> Sou Fabricante
          </a>
        </div>
      )}
    </header>
  );
}