import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Rocket, Star, BookOpen, Clock, CheckCircle, ExternalLink, LogOut, Calendar, User as UserIcon, ArrowLeft, Table } from 'lucide-react';
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
  objectives: string[] | null;
  guidelines: string[] | null;
}

interface Class {
  id: string;
  plan_id: string;
  class_name: string;
  class_date: string;
  teacher_name: string;
  meet_link: string;
  class_description: string | null;
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
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const [showClasses, setShowClasses] = useState(false);

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

  const loadClasses = async (planId: string) => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('plan_id', planId)
        .order('class_date');

      if (error) throw error;
      setClasses(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las clases",
        variant: "destructive",
      });
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

  const handleSelectPlan = (plan: Plan) => {
    if (isPlanPurchased(plan.id)) {
      setSelectedPlan(plan);
      setShowClasses(true);
      loadClasses(plan.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
                            onClick={() => handleSelectPlan(plan)}
                          >
                            <Table className="w-4 h-4 mr-2" />
                            Ver Clases del Curso
                          </Button>
                          {plan.meet_link && (
                            <Button
                              variant="outline"
                              className="w-full border-galaxy-accent text-galaxy-accent hover:bg-galaxy-accent/10"
                              onClick={() => window.open(plan.meet_link!, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Acceder a la Clase General
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

      {/* Classes Section */}
      {showClasses && selectedPlan && (
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Back button and course info */}
              <div className="mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setShowClasses(false)}
                  className="text-galaxy-accent hover:bg-galaxy-accent/10 mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Cursos
                </Button>

                <Card className="bg-background/95 border-galaxy-accent/20">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-galaxy-star flex items-center">
                      <BookOpen className="w-8 h-8 mr-3 text-galaxy-accent" />
                      {selectedPlan.name}
                    </CardTitle>
                    <CardDescription className="text-galaxy-muted text-lg">
                      {selectedPlan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-8">
                    {/* Objectives */}
                    {selectedPlan.objectives && (
                      <div>
                        <h3 className="text-xl font-semibold text-galaxy-star mb-4">Objetivos del Curso</h3>
                        <ul className="space-y-2">
                          {selectedPlan.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start text-galaxy-muted">
                              <CheckCircle className="w-4 h-4 mr-2 mt-1 text-galaxy-accent flex-shrink-0" />
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Guidelines */}
                    {selectedPlan.guidelines && (
                      <div>
                        <h3 className="text-xl font-semibold text-galaxy-star mb-4">Lineamientos</h3>
                        <ul className="space-y-2">
                          {selectedPlan.guidelines.map((guideline, index) => (
                            <li key={index} className="flex items-start text-galaxy-muted">
                              <Star className="w-4 h-4 mr-2 mt-1 text-galaxy-accent flex-shrink-0" />
                              {guideline}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Classes Table */}
              <Card className="bg-background/95 border-galaxy-accent/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-galaxy-star">
                    Cronograma de Clases
                  </CardTitle>
                  <CardDescription className="text-galaxy-muted">
                    Clases programadas para tu curso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {classes.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-galaxy-accent/20">
                            <th className="text-left py-4 px-2 text-galaxy-star font-semibold">Nombre de la Clase</th>
                            <th className="text-left py-4 px-2 text-galaxy-star font-semibold">Fecha y Hora</th>
                            <th className="text-left py-4 px-2 text-galaxy-star font-semibold">Profesor</th>
                            <th className="text-left py-4 px-2 text-galaxy-star font-semibold">Descripción</th>
                            <th className="text-left py-4 px-2 text-galaxy-star font-semibold">Acceso</th>
                          </tr>
                        </thead>
                        <tbody>
                          {classes.map((classItem, index) => (
                            <tr 
                              key={classItem.id} 
                              className={`border-b border-galaxy-accent/10 ${
                                index % 2 === 0 ? 'bg-background/50' : 'bg-galaxy-accent/5'
                              }`}
                            >
                              <td className="py-4 px-2">
                                <div className="font-medium text-galaxy-star">{classItem.class_name}</div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="flex items-center text-galaxy-muted">
                                  <Calendar className="w-4 h-4 mr-2 text-galaxy-accent" />
                                  {formatDate(classItem.class_date)}
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="flex items-center text-galaxy-muted">
                                  <UserIcon className="w-4 h-4 mr-2 text-galaxy-accent" />
                                  {classItem.teacher_name}
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <div className="text-galaxy-muted text-sm">
                                  {classItem.class_description || 'Sin descripción'}
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(classItem.meet_link, '_blank')}
                                  className="border-galaxy-accent text-galaxy-accent hover:bg-galaxy-accent/10"
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  Unirse
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-galaxy-muted">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 text-galaxy-accent/50" />
                      <p>No hay clases programadas para este curso.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Courses;