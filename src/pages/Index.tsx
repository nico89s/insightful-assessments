import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  CheckCircle, 
  BarChart3, 
  Users,
  ArrowRight,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: Brain,
      title: 'Personality Assessments',
      description: 'Big Five personality tests based on proven psychological research'
    },
    {
      icon: BarChart3,
      title: 'Aptitude Testing',
      description: 'Spatial reasoning, cognitive ability, and skills evaluation'
    },
    {
      icon: Users,
      title: 'Team Analytics',
      description: 'Comprehensive insights for HR professionals and assessors'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security for sensitive assessment data'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Nav */}
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary-foreground/20">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-primary-foreground">
                HR Assess
              </span>
            </div>
            <Button 
              variant="hero-outline" 
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </nav>

          {/* Hero Content */}
          <div className="py-20 md:py-32 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Modern HR Assessment Platform
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6 animate-slide-up max-w-4xl mx-auto leading-tight">
              Professional Employee
              <span className="text-gradient block">Assessment Made Simple</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Streamline your HR assessment process with our comprehensive platform. 
              From personality tests to cognitive evaluations, get actionable insights faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate('/login')}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl"
                onClick={() => navigate('/login')}
              >
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">500+</div>
                <div className="text-sm text-primary-foreground/60">Companies</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">50K+</div>
                <div className="text-sm text-primary-foreground/60">Assessments</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">98%</div>
                <div className="text-sm text-primary-foreground/60">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need for
              <span className="text-accent"> Modern Assessment</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete platform for conducting, analyzing, and managing employee assessments 
              with tools designed for HR professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border hover:shadow-lg hover:border-accent/50 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, streamlined process from assessment to insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: 1, title: 'Take Assessment', desc: 'Employees complete engaging, research-backed assessments', icon: CheckCircle },
              { step: 2, title: 'Automatic Scoring', desc: 'Our system analyzes responses and generates scores', icon: Clock },
              { step: 3, title: 'Get Insights', desc: 'HR assessors review detailed reports and recommendations', icon: BarChart3 },
            ].map((item, index) => (
              <div key={item.step} className="text-center animate-slide-up" style={{ animationDelay: `${0.1 * index}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent text-accent-foreground mb-4">
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="text-sm text-accent font-medium mb-2">Step {item.step}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="gradient-hero rounded-3xl p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Transform Your HR Process?
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
              Join hundreds of companies already using HR Assess to make better hiring decisions.
            </p>
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate('/login')}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent">
                <Brain className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="font-display font-bold">HR Assess</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 HR Assess. Professional Assessment Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
