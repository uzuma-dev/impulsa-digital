import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Rocket, Star, BookOpen, Clock, CheckCircle, ExternalLink, LogOut } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  meet_link: string | null;
  duration_weeks: number;
  is_active: boolean;
}

interface Purchase {
  id: string;
  plan_id: string;
  status: string;
  created_at: string;
}

const Courses = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user && event === 'SIGNED_OUT') {
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      loadPlans();
      loadPurchases();
    }
  }, [user]);

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (error) throw error;
      setPlans(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los planes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadPurchases = async () => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setPurchases(data || []);
    } catch (error: any) {
      console.error('Error loading purchases:', error);
    }
  };

  const handlePurchase = async (planId: string) => {
    if (!user) return;

    setPurchaseLoading(planId);
    try {
      const { data, error } = await supabase
        .from('purchases')
        .insert({
          user_id: user.id,
          plan_id: planId,
          status: 'completed'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "¡Compra exitosa!",
        description: "Ya tienes acceso al curso. ¡Disfruta aprendiendo!",
      });

      loadPurchases();
    } catch (error: any) {
      toast({
        title: "Error en la compra",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setPurchaseLoading(null);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo cerrar sesión",
        variant: "destructive",
      });
    }
  };

  const isPlanPurchased = (planId: string) => {
    return purchases.some(p => p.plan_id === planId && p.status === 'completed');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-galaxy-dark via-galaxy-nebula to-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-galaxy-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-galaxy-dark via-galaxy-nebula to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
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
            {/* User welcome */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-background/80 backdrop-blur-sm rounded-full px-6 py-3 border border-galaxy-accent/20">
                <p className="text-galaxy-star">
                  Bienvenido, {user?.email}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="ml-2 text-galaxy-muted hover:text-galaxy-accent"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-galaxy-accent to-galaxy-purple mb-8 animate-bounce">
              <BookOpen className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-galaxy-star via-galaxy-accent to-galaxy-purple bg-clip-text text-transparent">
              Academia Impulsa
            </h1>

            <p className="text-xl md:text-2xl text-galaxy-muted mb-8 leading-relaxed">
              Transforma tu carrera con nuestros cursos especializados en marketing digital
            </p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const purchased = isPlanPurchased(plan.id);
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative overflow-hidden border-galaxy-accent/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-galaxy-glow ${
                    purchased ? 'bg-galaxy-accent/10' : 'bg-background/95'
                  }`}
                >
                  {purchased && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-galaxy-accent text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Adquirido
                      </Badge>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-galaxy-star flex items-center">
                      <Star className="w-6 h-6 mr-2 text-galaxy-accent" />
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-galaxy-muted">
                      {plan.description}
                    </CardDescription>
                    <div className="text-3xl font-bold text-galaxy-accent">
                      {formatPrice(plan.price)}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="flex items-center text-galaxy-muted">
                      <Clock className="w-4 h-4 mr-2" />
                      {plan.duration_weeks} semanas de duración
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-galaxy-star">Incluye:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-galaxy-muted">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-galaxy-accent flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      {purchased ? (
                        <div className="space-y-3">
                          <Button
                            className="w-full bg-galaxy-accent hover:bg-galaxy-accent/80"
                            disabled
                          >
                            ✓ Ya adquirido
                          </Button>
                          {plan.meet_link && (
                            <Button
                              variant="outline"
                              className="w-full border-galaxy-accent text-galaxy-accent hover:bg-galaxy-accent/10"
                              onClick={() => window.open(plan.meet_link!, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Acceder a la Clase
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button
                          className="w-full bg-gradient-to-r from-galaxy-accent to-galaxy-purple hover:from-galaxy-purple hover:to-galaxy-accent"
                          onClick={() => handlePurchase(plan.id)}
                          disabled={purchaseLoading === plan.id}
                        >
                          {purchaseLoading === plan.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Procesando...
                            </>
                          ) : (
                            <>
                              <Rocket className="w-4 h-4 mr-2" />
                              Adquirir Curso
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;