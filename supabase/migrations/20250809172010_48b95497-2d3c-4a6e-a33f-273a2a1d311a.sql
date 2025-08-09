-- Create clients table to store success cases and results
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  service_type TEXT NOT NULL,
  project_description TEXT NOT NULL,
  initial_metrics JSONB,
  final_metrics JSONB,
  improvement_percentage INTEGER,
  project_duration_months INTEGER,
  testimonial TEXT,
  client_logo_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (for showcasing results)
CREATE POLICY "Clients are viewable by everyone" 
ON public.clients 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated users to manage clients
CREATE POLICY "Authenticated users can manage clients" 
ON public.clients 
FOR ALL 
TO authenticated 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.clients (company_name, industry, service_type, project_description, initial_metrics, final_metrics, improvement_percentage, project_duration_months, testimonial, featured) VALUES
('TechStart Solutions', 'Tecnología', 'Marketing Digital Integral', 'Campaña completa de marketing digital incluyendo SEO, SEM y redes sociales', '{"website_traffic": 1500, "leads": 25, "conversion_rate": 2.1}', '{"website_traffic": 8500, "leads": 180, "conversion_rate": 8.4}', 467, 6, 'Impulsa Marketing transformó completamente nuestra presencia digital. Los resultados superaron nuestras expectativas.', true),
('Restaurante Bella Vista', 'Gastronomía', 'Publicidad en Redes Sociales', 'Estrategia de marketing gastronómico en redes sociales y delivery', '{"followers": 800, "monthly_orders": 120, "revenue": 45000}', '{"followers": 12500, "monthly_orders": 580, "revenue": 185000}', 383, 4, 'Gracias a su estrategia, nuestro restaurante se convirtió en el más popular de la zona.', true),
('Clínica Dental Sonrisa', 'Salud', 'SEO y Marketing Local', 'Posicionamiento local y captación de pacientes nuevos', '{"new_patients": 15, "website_visits": 300, "phone_calls": 45}', '{"new_patients": 95, "website_visits": 2100, "phone_calls": 280}', 533, 8, 'El equipo de Impulsa nos ayudó a triplicar nuestros pacientes nuevos cada mes.', true),
('Moda Urbana Store', 'Retail/Moda', 'E-commerce y Publicidad', 'Optimización de tienda online y campañas publicitarias', '{"online_sales": 25000, "cart_abandonment": 78, "social_engagement": 2.3}', '{"online_sales": 95000, "cart_abandonment": 45, "social_engagement": 15.7}', 280, 5, 'Nuestras ventas online se cuadruplicaron gracias a su expertise en e-commerce.', false),
('Constructora Horizonte', 'Construcción', 'Branding y Marketing B2B', 'Rebranding completo y estrategia de marketing para empresas', '{"project_inquiries": 8, "brand_recognition": 15, "qualified_leads": 3}', '{"project_inquiries": 45, "brand_recognition": 78, "qualified_leads": 28}', 463, 9, 'El nuevo branding nos posicionó como líderes en el sector de construcción residencial.', false),
('Academia FuturoTech', 'Educación', 'Marketing Digital Educativo', 'Estrategia completa para captación de estudiantes online', '{"enrollments": 45, "course_completion": 65, "student_satisfaction": 7.2}', '{"enrollments": 320, "course_completion": 89, "student_satisfaction": 9.1}', 611, 7, 'Logramos expandir nuestra academia a nivel nacional gracias a su estrategia digital.', true);