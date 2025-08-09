import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Users, Calendar, Quote, Star, ArrowUp, Building2, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Client {
  id: string;
  company_name: string;
  industry: string;
  service_type: string;
  project_description: string;
  initial_metrics: any;
  final_metrics: any;
  improvement_percentage: number;
  project_duration_months: number;
  testimonial: string;
  client_logo_url?: string;
  featured: boolean;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredClients, setFeaturedClients] = useState<Client[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('improvement_percentage', { ascending: false });

      if (error) throw error;

      setClients(data || []);
      setFeaturedClients(data?.filter(client => client.featured) || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = (customMessage?: string) => {
    const defaultMessage = 'Hola, quiero obtener resultados similares para mi empresa';
    const message = encodeURIComponent(customMessage || defaultMessage);
    const phoneNumber = '+573127142928';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatMetric = (value: any, key: string) => {
    if (typeof value === 'number') {
      if (key.includes('revenue') || key.includes('sales')) {
        return `$${value.toLocaleString()}`;
      }
      if (key.includes('rate') || key.includes('satisfaction')) {
        return `${value}%`;
      }
      return value.toLocaleString();
    }
    return value;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 lg:px-8 py-20">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando casos de éxito...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <TrendingUp className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Casos de <span className="text-primary">Éxito</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Descubre cómo hemos transformado negocios reales con resultados medibles y estrategias personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-lg font-semibold">+{clients.length} proyectos exitosos</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUp className="h-5 w-5 text-green-500" />
                <span className="text-lg font-semibold">Promedio +400% crecimiento</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clients Section */}
      {featuredClients.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Casos Destacados
              </h2>
              <p className="text-lg text-muted-foreground">
                Los proyectos más exitosos de nuestro portafolio
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredClients.map((client) => (
                <Card key={client.id} className="border border-primary/20 shadow-elegant hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{client.company_name}</CardTitle>
                        <CardDescription className="text-sm">{client.industry}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        +{client.improvement_percentage}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">SERVICIO</h4>
                        <p className="text-sm">{client.service_type}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">RESULTADOS CLAVE</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(client.final_metrics || {}).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="bg-muted/50 p-2 rounded">
                              <p className="font-medium">{formatMetric(value, key)}</p>
                              <p className="text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{client.project_duration_months} meses</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Clients Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Todos Nuestros Clientes
            </h2>
            <p className="text-lg text-muted-foreground">
              Cada proyecto es una historia de transformación digital
            </p>
          </div>

          <div className="space-y-8">
            {clients.map((client) => (
              <Card key={client.id} className="p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Company Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{client.company_name}</h3>
                        <p className="text-muted-foreground">{client.industry}</p>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="w-fit">
                      {client.service_type}
                    </Badge>
                    
                    <p className="text-sm text-muted-foreground">
                      {client.project_description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Duración: {client.project_duration_months} meses</span>
                    </div>
                  </div>

                  {/* Metrics Comparison */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Resultados Obtenidos</h4>
                    </div>
                    
                    <div className="space-y-3">
                      {Object.entries(client.initial_metrics || {}).map(([key, initialValue]) => {
                        const finalValue = client.final_metrics?.[key];
                        const increase = finalValue && initialValue && typeof finalValue === 'number' && typeof initialValue === 'number' ? 
                          Math.round(((finalValue - initialValue) / initialValue) * 100) : 0;
                        
                        return (
                          <div key={key} className="bg-muted/50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium capitalize">
                                {key.replace(/_/g, ' ')}
                              </span>
                              <span className="text-sm font-bold text-green-600">
                                +{increase}%
                              </span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Antes: {formatMetric(initialValue, key)}</span>
                              <span>Después: {formatMetric(finalValue, key)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">
                        +{client.improvement_percentage}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Mejora promedio
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Quote className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Testimonio</h4>
                    </div>
                    
                    <blockquote className="text-muted-foreground italic border-l-4 border-primary/20 pl-4">
                      "{client.testimonial}"
                    </blockquote>
                    
                    <div className="pt-4">
                      <Button 
                        onClick={() => openWhatsApp(`Hola, vi el caso de éxito de ${client.company_name} y me interesa obtener resultados similares para mi empresa`)}
                        className="w-full"
                      >
                        Obtener Resultados Similares
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Users className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para ser nuestro próximo caso de éxito?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Únete a más de {clients.length} empresas que han transformado su presencia digital con nosotros.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => openWhatsApp('Hola, quiero que mi empresa sea el próximo caso de éxito de Impulsa Marketing')}
              className="bg-white text-primary hover:bg-white/90"
            >
              Empezar Mi Transformación
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Clients;