import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-marketing.jpg';

const HeroSection = () => {
  const openWhatsApp = (customMessage?: string) => {
    const defaultMessage = 'Hola quiero agendar una cita con ustedes';
    const message = encodeURIComponent(customMessage || defaultMessage);
    const phoneNumber = '+573127142928'; // Reemplaza con tu número de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToContact = () => {
    const contactElement = document.getElementById('contacto');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-gradient-galaxy opacity-80"></div>
      </div>

      {/* Galaxy Stars and Cosmic Elements */}
      <div className="absolute inset-0 z-10">
        {/* Large galaxy elements */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-2xl animate-galaxy-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/25 to-cyan-400/25 rounded-full blur-xl animate-cosmic-drift" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Stars */}
        <div className="absolute top-20 left-1/3 w-2 h-2 bg-white rounded-full animate-star-twinkle"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-star-twinkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-purple-300 rounded-full animate-star-twinkle" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-cyan-300 rounded-full animate-star-twinkle" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-pink-300 rounded-full animate-star-twinkle" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Galaxy Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-md rounded-full px-6 py-3 mb-6 animate-fade-in border border-purple-400/30">
            <Sparkles className="w-4 h-4 text-purple-300 animate-star-twinkle" />
            <span className="text-white text-sm font-medium">Agencia líder en marketing digital y automatizaciones con IA</span>
          </div>

          {/* Galaxy Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Impulsa tu marca al{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-galaxy-pulse">
              siguiente nivel
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Agencia de Marketing
          </p>

          {/* Description */}
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Transformamos tu visión en resultados reales. Estrategias innovadoras de marketing digital que impulsan el crecimiento de tu negocio.
          </p>

          {/* Galaxy CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button 
              variant="hero" 
              size="lg" 
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border-0 shadow-lg shadow-purple-500/25"
              onClick={() => openWhatsApp('Hola, me interesa conocer más sobre sus servicios de marketing digital')}
            >
              Contáctanos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Link to="/clientes">
              <Button 
                variant="secondary" 
                size="lg" 
                className="group bg-blue-500/20 hover:bg-blue-500/30 text-white border border-blue-400/50 backdrop-blur-md"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Ver nuestro trabajo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/70 text-sm">Soporte</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;