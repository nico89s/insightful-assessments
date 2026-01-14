import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, AlertCircle, ClipboardList } from 'lucide-react';
import { UserRole } from '@/lib/mockData';
import KickHRLogo from '@/components/KickHRLogo';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Try one of the demo accounts below.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    switchRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <KickHRLogo size="lg" />
          </div>
          <p className="text-muted-foreground mt-2">
            Professional Assessment Platform
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-display">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="accent"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Try a demo account
              </p>
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleDemoLogin('user')}
                >
                  <Users className="w-4 h-4 text-info" />
                  <div className="text-left">
                    <div className="font-medium">Employee</div>
                    <div className="text-xs text-muted-foreground">Take assessments</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleDemoLogin('assessor')}
                >
                  <ClipboardList className="w-4 h-4 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Assessor</div>
                    <div className="text-xs text-muted-foreground">Review & analyze results</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3"
                  onClick={() => handleDemoLogin('admin')}
                >
                  <Shield className="w-4 h-4 text-highlight" />
                  <div className="text-left">
                    <div className="font-medium">Administrator</div>
                    <div className="text-xs text-muted-foreground">Manage platform</div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
