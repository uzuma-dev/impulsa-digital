-- Create classes table for course classes
CREATE TABLE public.classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID NOT NULL,
  class_name TEXT NOT NULL,
  class_date TIMESTAMP WITH TIME ZONE NOT NULL,
  teacher_name TEXT NOT NULL,
  meet_link TEXT NOT NULL,
  class_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key constraint
ALTER TABLE public.classes 
ADD CONSTRAINT fk_classes_plan_id 
FOREIGN KEY (plan_id) REFERENCES public.plans(id) ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Classes are viewable by everyone" 
ON public.classes 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage classes" 
ON public.classes 
FOR ALL 
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_classes_updated_at
BEFORE UPDATE ON public.classes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for existing plans
-- First, get plan IDs (we'll use generic UUIDs that should work)
INSERT INTO public.classes (plan_id, class_name, class_date, teacher_name, meet_link, class_description) VALUES
-- For Marketing Digital Básico plan
(
  (SELECT id FROM public.plans WHERE name = 'Marketing Digital Básico' LIMIT 1),
  'Introducción al Marketing Digital',
  '2024-08-25 10:00:00+00',
  'Ana García',
  'https://meet.google.com/abc-defg-hij',
  'Fundamentos del marketing digital y estrategias básicas'
),
(
  (SELECT id FROM public.plans WHERE name = 'Marketing Digital Básico' LIMIT 1),
  'Redes Sociales para Principiantes',
  '2024-08-27 10:00:00+00',
  'Ana García',
  'https://meet.google.com/abc-defg-hij',
  'Cómo crear contenido efectivo en redes sociales'
),
(
  (SELECT id FROM public.plans WHERE name = 'Marketing Digital Básico' LIMIT 1),
  'Google Ads Básico',
  '2024-08-29 10:00:00+00',
  'Carlos Ruiz',
  'https://meet.google.com/abc-defg-hij',
  'Introducción a la publicidad en Google'
),

-- For Marketing Digital Avanzado plan
(
  (SELECT id FROM public.plans WHERE name = 'Marketing Digital Avanzado' LIMIT 1),
  'Estrategias de Content Marketing',
  '2024-08-26 14:00:00+00',
  'María López',
  'https://meet.google.com/xyz-uvwx-yz1',
  'Creación de estrategias de contenido avanzadas'
),
(
  (SELECT id FROM public.plans WHERE name = 'Marketing Digital Avanzado' LIMIT 1),
  'Analytics y Métricas Avanzadas',
  '2024-08-28 14:00:00+00',
  'Juan Pérez',
  'https://meet.google.com/xyz-uvwx-yz2',
  'Análisis profundo de métricas y KPIs'
),
(
  (SELECT id FROM public.plans WHERE name = 'Marketing Digital Avanzado' LIMIT 1),
  'Automatización de Marketing',
  '2024-08-30 14:00:00+00',
  'María López',
  'https://meet.google.com/xyz-uvwx-yz3',
  'Herramientas de automatización y workflows'
),

-- For Marketing Digital Profesional plan
(
  (SELECT id FROM public.plans WHERE name = 'Marketing Digital Profesional' LIMIT 1),
  'Growth Hacking Strategies',
  '2024-08-25 16:00:00+00',
  'Roberto Silva',
  'https://meet.google.com/pro-growth-123',
  'Técnicas avanzadas de crecimiento exponencial'
),
(
  (SELECT id FROM public.plans WHERE name = 'Marketing Digital Profesional' LIMIT 1),
  'Marketing de Performance',
  '2024-08-27 16:00:00+00',
  'Laura Martínez',
  'https://meet.google.com/pro-perf-456',
  'Optimización de campañas para máximo ROI'
),
(
  (SELECT id FROM public.plans WHERE name = 'Marketing Digital Profesional' LIMIT 1),
  'E-commerce y Conversiones',
  '2024-08-29 16:00:00+00',
  'Roberto Silva',
  'https://meet.google.com/pro-ecom-789',
  'Estrategias de e-commerce y optimización de conversiones'
);

-- Add course objectives and guidelines to plans table
ALTER TABLE public.plans 
ADD COLUMN objectives TEXT[],
ADD COLUMN guidelines TEXT[];

-- Update existing plans with objectives and guidelines
UPDATE public.plans 
SET 
  objectives = ARRAY[
    'Comprender los fundamentos del marketing digital',
    'Crear estrategias básicas de redes sociales',
    'Configurar campañas publicitarias simples',
    'Medir resultados básicos'
  ],
  guidelines = ARRAY[
    'Participación activa en todas las clases',
    'Completar tareas semanales',
    'Mantener cámara encendida durante las sesiones',
    'Respeto hacia compañeros y profesores'
  ]
WHERE name = 'Marketing Digital Básico';

UPDATE public.plans 
SET 
  objectives = ARRAY[
    'Dominar estrategias avanzadas de content marketing',
    'Implementar análisis profundo de métricas',
    'Configurar automatización de marketing',
    'Optimizar campañas para mejor ROI'
  ],
  guidelines = ARRAY[
    'Conocimientos previos de marketing digital requeridos',
    'Dedicación de 8-10 horas semanales',
    'Proyecto final obligatorio',
    'Participación en discusiones grupales'
  ]
WHERE name = 'Marketing Digital Avanzado';

UPDATE public.plans 
SET 
  objectives = ARRAY[
    'Implementar estrategias de growth hacking',
    'Dominar marketing de performance',
    'Optimizar e-commerce para conversiones',
    'Crear sistemas escalables de marketing'
  ],
  guidelines = ARRAY[
    'Experiencia profesional en marketing requerida',
    'Dedicación de 15-20 horas semanales',
    'Mentorías 1:1 incluidas',
    'Certificación final disponible'
  ]
WHERE name = 'Marketing Digital Profesional';