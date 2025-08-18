import { Button } from '@/components/ui/button';
import { Rocket, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearnSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Galaxy background */}
      <div className="absolute inset-0 bg-gradient-to-b from-galaxy-dark via-galaxy-nebula to-background"></div>
      
      {/* Animated stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-galaxy-star rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Floating rocket icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-galaxy-accent to-galaxy-purple mb-8 animate-bounce">
            <Rocket className="w-10 h-10 text-white" />
          </div>

          {/* Main heading */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-galaxy-star via-galaxy-accent to-galaxy-purple bg-clip-text text-transparent">
            ¿Quieres Aprender con Nosotros?
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-galaxy-muted mb-8 leading-relaxed">
            Descubre nuestros cursos especializados en marketing digital y 
            lleva tu carrera al siguiente nivel
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-galaxy-purple to-galaxy-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-galaxy-star">Clases en Vivo</h3>
              <p className="text-galaxy-muted">Aprende directamente de expertos en marketing digital</p>
            </div>

            <div className="group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-galaxy-accent to-galaxy-star flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-galaxy-star">Certificación</h3>
              <p className="text-galaxy-muted">Obtén certificados reconocidos en la industria</p>
            </div>

            <div className="group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-galaxy-star to-galaxy-purple flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-galaxy-star">Proyectos Reales</h3>
              <p className="text-galaxy-muted">Aplica tus conocimientos en casos prácticos</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link to="/cursos">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-galaxy-accent to-galaxy-purple hover:from-galaxy-purple hover:to-galaxy-accent text-white font-semibold px-8 py-6 text-lg rounded-full shadow-galaxy-glow hover:shadow-galaxy-glow-intense transition-all duration-300 group"
            >
              Explorar Cursos
              <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearnSection;