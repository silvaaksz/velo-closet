import { useState } from "react";
import { Header } from "./components/Header";
import { CategoryBar } from "./components/CategoryBar";
import { HeroSection } from "./components/HeroSection";
import { ProductGrid } from "./components/ProductGrid";
import { HowItWorks } from "./components/HowItWorks";
import { B2BBanner } from "./components/B2BBanner";
import { Testimonials } from "./components/Testimonials";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleLogoClick = () => setCurrentPage("home");
  
  const handleNavigate = (productId) => {
    console.log("Navegando para o produto:", productId);
    // Aqui você pode mudar o estado de currentPage se tiver a tela de detalhes criada
  };

  const scrollToProducts = () => {
    const section = document.getElementById("produtos");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/10 selection:text-primary">
      <Header 
        cartCount={cartCount} 
        menuOpen={menuOpen} 
        onMenuToggle={handleMenuToggle} 
        onLogoClick={handleLogoClick} 
      />
      
      <CategoryBar />

      <main>
        <HeroSection onShopClick={scrollToProducts} />
        <ProductGrid onNavigate={handleNavigate} />
        <HowItWorks />
        <B2BBanner />
        <Features />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}