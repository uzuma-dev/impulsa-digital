import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutImage from '@/assets/about-team.jpg';

const AboutSection = () => {
  const openWhatsApp = (customMessage?: string) => {
    const defaultMessage = 'Hola quiero agendar una cita con ustedes';
    const message = encodeURIComponent(customMessage || defaultMessage);
    const phoneNumber = '+573127142928'; // Reemplaza con tu número de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const features = [
    {
      icon: Target,
      title: "Estrategias Personalizadas",
      description: "Cada cliente es único. Desarrollamos estrategias específicas para sus objetivos."
    },
    {
      icon: Users,
      title: "Equipo Experto",
      description: "Profesionales con años de experiencia en marketing digital y crecimiento empresarial."
    },
    {
      icon: Lightbulb,
      title: "Innovación Constante",
      description: "Utilizamos las últimas tendencias y tecnologías para mantenerte a la vanguardia."
    },
    {
      icon: TrendingUp,
      title: "Resultados Medibles",
      description: "Cada campaña está respaldada por datos y métricas que demuestran el ROI."
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-primary text-sm font-medium">Sobre nosotros</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Transformamos ideas en{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  éxito digital
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos una agencia de marketing digital especializada en impulsar el crecimiento de empresas 
                a través de estrategias innovadoras y resultados medibles.
              </p>
              
              <p className="text-muted-foreground">
                Nuestro enfoque se basa en la combinación perfecta entre creatividad, tecnología y datos. 
                Creemos que cada marca tiene una historia única que contar, y nosotros nos encargamos de 
                que esa historia llegue a la audiencia correcta en el momento perfecto.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/servicios">
                <Button variant="default" size="lg">
                  Conoce nuestros servicios
                </Button>
              </Link>
              <Link to="/clientes">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Ver casos de éxito
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <img 
                src={aboutImage} 
                alt="Equipo de Impulsa trabajando en estrategias de marketing" 
                className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating card */}
            <Card className="absolute -bottom-6 -left-6 bg-card/95 backdrop-blur-md shadow-hover border-0">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Satisfacción del cliente</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="border-0 shadow-card hover:shadow-hover transition-all duration-300 transform hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;