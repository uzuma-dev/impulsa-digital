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

-- Add course objectives and guidelines to plans table
ALTER TABLE public.plans 
ADD COLUMN objectives TEXT[],
ADD COLUMN guidelines TEXT[];