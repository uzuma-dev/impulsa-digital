import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Servicios', href: '/servicios', isRoute: true },
    { name: 'Clientes', href: '/lientes', isRoute: true },
    { name: 'Sobre nosotros', href: '#sobre', isRoute: false },
    { name: 'Nuestro equipo', href: '#equipo', isRoute: false },
  ];

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // Si no estamos en la página principal, navegar primero
      navigate('/', { replace: true });
      // Usar setTimeout para esperar a que la página se cargue
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Si estamos en la página principal, hacer scroll directamente
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToContact = () => {
    scrollToSection('contacto');
  };

  const handleMenuItemClick = (item: any) => {
    setIsMenuOpen(false);
    if (!item.isRoute) {
      const sectionId = item.href.replace('#', '');
      scrollToSection(sectionId);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Texto */}
          <Link to="/" className="flex items-center space-x-4 justify-start group">
            <img
              src="/lovable-uploads/cohete.png"
              alt="Impulsa Logo"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-tight px-2 bg-[#001236] rounded-md transition-all duration-300 group-hover:bg-primary">
              <h1 className="text-2xl font-bold text-white">IMPULSA</h1>
              <p className="text-sm text-white tracking-wide">AGENCIA DE MARKETING</p>
            </div>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.replace('#', ''))}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              )
            ))}
            <Button 
              variant="hero" 
              size="sm"
              onClick={scrollToContact}
            >
              Contáctanos
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleMenuItemClick(item)}
                    className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                )
              ))}
              <div className="px-3 py-2">
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="w-full"
                  onClick={scrollToContact}
                >
                  Contáctanos
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav >

  );
};

export default Navbar;