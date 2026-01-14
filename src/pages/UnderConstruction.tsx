import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Construction, Wrench } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const UnderConstruction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-highlight/10 mb-6">
              <Construction className="w-10 h-10 text-highlight" />
            </div>
            
            <h1 className="text-2xl font-display font-bold mb-3">
              Under Construction
            </h1>
            
            <p className="text-muted-foreground mb-6">
              We're working hard to bring you this feature. Please check back soon!
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
              <Wrench className="w-4 h-4" />
              <span>Coming soon...</span>
            </div>

            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UnderConstruction;
