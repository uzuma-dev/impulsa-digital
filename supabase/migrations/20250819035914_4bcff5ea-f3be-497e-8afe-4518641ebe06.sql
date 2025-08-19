-- Insert sample data for classes using existing plan IDs
INSERT INTO public.classes (plan_id, class_name, class_date, teacher_name, meet_link, class_description) VALUES
-- For Plan Básico
('8a09a7b0-43cb-4d76-9189-bb7be4bb20b6', 'Introducción al Marketing Digital', '2024-08-25 10:00:00+00', 'Ana García', 'https://meet.google.com/abc-defg-hij', 'Fundamentos del marketing digital y estrategias básicas'),
('8a09a7b0-43cb-4d76-9189-bb7be4bb20b6', 'Redes Sociales para Principiantes', '2024-08-27 10:00:00+00', 'Ana García', 'https://meet.google.com/abc-defg-hij', 'Cómo crear contenido efectivo en redes sociales'),
('8a09a7b0-43cb-4d76-9189-bb7be4bb20b6', 'Google Ads Básico', '2024-08-29 10:00:00+00', 'Carlos Ruiz', 'https://meet.google.com/abc-defg-hij', 'Introducción a la publicidad en Google'),

-- For Plan Intermedio  
('d14dd8d1-7270-4c34-a013-b076515ef011', 'Estrategias de Content Marketing', '2024-08-26 14:00:00+00', 'María López', 'https://meet.google.com/xyz-uvwx-yz1', 'Creación de estrategias de contenido avanzadas'),
('d14dd8d1-7270-4c34-a013-b076515ef011', 'Analytics y Métricas Avanzadas', '2024-08-28 14:00:00+00', 'Juan Pérez', 'https://meet.google.com/xyz-uvwx-yz2', 'Análisis profundo de métricas y KPIs'),
('d14dd8d1-7270-4c34-a013-b076515ef011', 'Automatización de Marketing', '2024-08-30 14:00:00+00', 'María López', 'https://meet.google.com/xyz-uvwx-yz3', 'Herramientas de automatización y workflows'),

-- For Plan Avanzado
('8222fcbe-a699-401d-8e02-851b3bf18309', 'Growth Hacking Strategies', '2024-08-25 16:00:00+00', 'Roberto Silva', 'https://meet.google.com/pro-growth-123', 'Técnicas avanzadas de crecimiento exponencial'),
('8222fcbe-a699-401d-8e02-851b3bf18309', 'Marketing de Performance', '2024-08-27 16:00:00+00', 'Laura Martínez', 'https://meet.google.com/pro-perf-456', 'Optimización de campañas para máximo ROI'),
('8222fcbe-a699-401d-8e02-851b3bf18309', 'E-commerce y Conversiones', '2024-08-29 16:00:00+00', 'Roberto Silva', 'https://meet.google.com/pro-ecom-789', 'Estrategias de e-commerce y optimización de conversiones');

-- Update plans with objectives and guidelines
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
WHERE name = 'Plan Básico';

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
WHERE name = 'Plan Intermedio';

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
WHERE name = 'Plan Avanzado';