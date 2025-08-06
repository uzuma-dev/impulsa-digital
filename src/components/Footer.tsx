import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const services = [
    "Marketing Digital",
    "SEO & SEM",
    "Redes Sociales",
    "Desarrollo Web",
    "Branding",
    "Email Marketing"
  ];

  const quickLinks = [
    "Sobre nosotros",
    "Servicios",
    "Nuestro equipo",
    "Blog",
    "Casos de éxito",
    "Contacto"
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* CTA Section */}
      <div className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para impulsar tu negocio?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Obtén una consultoría gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
            Agenda tu consulta gratis
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              {/* Logo + Texto */}
              <div className="flex items-center justify-start">
                <img
                  src="/lovable-uploads/cohete.png"
                  alt="Impulsa Logo"
                  className="h-12 w-auto"
                />
                <div className="leading-tight px-2 bg-[#001236] rounded-md">
                  <h1 className="text-2xl font-bold text-white">IMPULSA</h1>
                  <p className="text-sm text-white tracking-wide">AGENCIA DE MARKETING</p>
                </div>
              </div>

              <p className="text-white/70 leading-relaxed">
                Transformamos tu presencia digital con estrategias innovadoras y resultados medibles.
                Tu éxito es nuestro objetivo.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="w-5 h-5 text-primary" />
                  <span><a href="mailto:contactoImpulsaSAS@gmail.com">contactoImpulsaSAS@gmail.com</a></span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+57 314 581 4663 (Whatsapp)</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Manizales, Colombia</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Servicios</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-primary transition-colors duration-300 block"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Enlaces rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-primary transition-colors duration-300 block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-white/20" />
      <div className="py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © 2024 Impulsa Agencia de Marketing. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                Términos de Servicio
              </a>
              <a href="#" className="text-white/70 hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;