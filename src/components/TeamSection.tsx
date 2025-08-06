import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail, Twitter } from 'lucide-react';
import member1 from '@/assets/team-member-1.jpg';
import member2 from '@/assets/team-member-2.jpg';
import member3 from '@/assets/team-member-3.jpg';
import member4 from '@/assets/team-member-4.jpg';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Ana García",
      role: "Directora de Marketing",
      image: member1,
      description: "Especialista en estrategias digitales con 8+ años de experiencia",
      social: {
        linkedin: "#",
        email: "ana@impulsa.com",
        twitter: "#"
      }
    },
    {
      name: "Carlos Rodríguez",
      role: "Director Creativo",
      image: member2,
      description: "Diseñador y estratega creativo con visión innovadora",
      social: {
        linkedin: "#",
        email: "carlos@impulsa.com",
        twitter: "#"
      }
    },
    {
      name: "María López",
      role: "Estratega Digital",
      image: member3,
      description: "Experta en campañas digitales y análisis de datos",
      social: {
        linkedin: "#",
        email: "maria@impulsa.com",
        twitter: "#"
      }
    },
    {
      name: "Diego Martín",
      role: "Analista de Datos",
      image: member4,
      description: "Especialista en métricas y optimización de rendimiento",
      social: {
        linkedin: "#",
        email: "diego@impulsa.com",
        twitter: "#"
      }
    }
  ];

  return (
    <section id="equipo" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="text-secondary text-sm font-medium">Nuestro equipo</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Conoce a los{' '}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              expertos
            </span>{' '}
            detrás de tu éxito
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un equipo apasionado de profesionales dedicados a transformar tu presencia digital 
            y acelerar el crecimiento de tu negocio.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.name}
              className="border-0 shadow-card hover:shadow-hover transition-all duration-500 transform hover:-translate-y-4 group bg-card/80 backdrop-blur-sm overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Social links - appear on hover */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Button size="icon" variant="ghost" className="w-8 h-8 bg-white/90 hover:bg-white text-primary">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="w-8 h-8 bg-white/90 hover:bg-white text-primary">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="w-8 h-8 bg-white/90 hover:bg-white text-primary">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="border-0 shadow-elegant bg-gradient-primary text-white p-8 inline-block">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">¿Quieres formar parte del equipo?</h3>
              <p className="mb-6 opacity-90">Siempre estamos buscando talento excepcional para unirse a nuestra familia.</p>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                Ver oportunidades
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;