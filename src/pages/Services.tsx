import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Megaphone, 
  TrendingUp, 
  Target, 
  Users, 
  BarChart3, 
  Palette,
  Search,
  Heart,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Marketing Digital",
      description: "Estrategias integrales de marketing digital para hacer crecer tu negocio en línea",
      icon: <TrendingUp className="h-8 w-8" />,
      features: ["SEO/SEM", "Email Marketing", "Marketing de Contenidos", "Analytics"],
      price: "",
      category: "Digital"
    },
    {
      id: 2,
      title: "Publicidad Online",
      description: "Campañas publicitarias efectivas en Google Ads, TikTok, Facebook e Instagram",
      icon: <Megaphone className="h-8 w-8" />,
      features: ["Google Ads", "Facebook Ads", "Instagram Ads", "TikTok Ads", "Network Ads", "Remarketing"],
      price: "",
      category: "Publicidad"
    },
    {
      id: 3,
      title: "Gestión de Redes Sociales",
      description: "Creación y gestión de contenido para todas tus redes sociales",
      icon: <Heart className="h-8 w-8" />,
      features: ["Creación de Contenido", "Community Management", "Flayers", "Stories", "Reels"],
      price: "",
      category: "Social Media"
    },
    {
      id: 4,
      title: "Diseño Gráfico",
      description: "Diseño de identidad visual y materiales gráficos para tu marca",
      icon: <Palette className="h-8 w-8" />,
      features: ["Logo Design", "Branding", "Material Impreso", "Fotografía", "Web Design"],
      price: "",
      category: "Diseño"
    },
    {
      id: 5,
      title: "SEO y Posicionamiento",
      description: "Optimización para motores de búsqueda y mejora del ranking web",
      icon: <Search className="h-8 w-8" />,
      features: ["Auditoría SEO", "Optimización On-Page", "Link Building", "SEO Local"],
      price: "",
      category: "SEO"
    },
    {
      id: 6,
      title: "Análisis y Reportes",
      description: "Monitoreo y análisis detallado del rendimiento de tus campañas y estrategias",
      icon: <BarChart3 className="h-8 w-8" />,
      features: ["Google Analytics", "Meta Ads"],
      price: "",
      category: "Analytics"
    }
  ];

  const scrollToContact = () => {
    const contactElement = document.getElementById('contacto');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = (customMessage?: string) => {
    const defaultMessage = 'Hola quiero agendar una cita con ustedes';
    const message = encodeURIComponent(customMessage || defaultMessage);
    const phoneNumber = '+573127142928'; // Reemplaza con tu número de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Soluciones integrales de marketing digital para impulsar tu negocio al siguiente nivel
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-primary hover:text-primary"
              onClick={() => openWhatsApp('Hola, necesito solicitar una cotización para mis servicios de marketing')}
            >
              Solicitar Cotización
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Qué podemos hacer por ti?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos una gama completa de servicios de marketing digital diseñados para maximizar tu presencia online
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="group hover:shadow-elegant transition-all duration-300 border-border hover:border-primary/20">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit mx-auto mb-2">
                    {service.category}
                  </Badge>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <Target className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-lg font-semibold text-primary mb-4">
                      {service.price}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                      onClick={() => openWhatsApp(`Hola, necesito más información sobre el servicio de ${service.title}`)}
                    >
                      Más Información
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;