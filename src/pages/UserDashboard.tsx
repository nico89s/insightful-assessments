import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Boxes, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  PlayCircle,
  ChevronRight
} from 'lucide-react';
import { assessmentTypes, mockAssessments } from '@/lib/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const userAssessments = mockAssessments.filter(a => a.userId === user?.id);

  const getAssessmentStatus = (typeId: string) => {
    const assessment = userAssessments.find(a => a.assessmentTypeId === typeId);
    return assessment?.status || 'not-started';
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain':
        return <Brain className="w-6 h-6" />;
      case 'cube':
        return <Boxes className="w-6 h-6" />;
      default:
        return <Brain className="w-6 h-6" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-highlight/10 text-highlight">
            <PlayCircle className="w-3 h-3" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            Not Started
          </span>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="gradient-hero rounded-2xl p-8 text-primary-foreground">
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-primary-foreground/80 max-w-xl">
            Complete your assessments to help us understand your strengths and potential. 
            Your results will be reviewed by our professional assessors.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold">{assessmentTypes.length}</div>
              <div className="text-sm text-primary-foreground/70">Available Tests</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold">
                {userAssessments.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-sm text-primary-foreground/70">Completed</div>
            </div>
          </div>
        </div>

        {/* Available Assessments */}
        <div>
          <h2 className="text-xl font-display font-semibold mb-4">Available Assessments</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {assessmentTypes.map((type) => {
              const status = getAssessmentStatus(type.id);
              const assessment = userAssessments.find(a => a.assessmentTypeId === type.id);
              
              return (
                <Card 
                  key={type.id} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/assessment/${type.id}`)}
                >
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      {getIcon(type.icon)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-display">{type.name}</CardTitle>
                        {getStatusBadge(status)}
                      </div>
                      <CardDescription className="mt-1">
                        {type.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        ~{type.duration} minutes
                      </span>
                      <span>{type.questionCount} questions</span>
                    </div>
                    
                    {status === 'in-progress' && assessment && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            {Math.round((assessment.currentQuestion / type.questionCount) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(assessment.currentQuestion / type.questionCount) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}

                    <Button 
                      className="w-full group-hover:bg-accent group-hover:text-accent-foreground" 
                      variant={status === 'completed' ? 'outline' : 'default'}
                    >
                      {status === 'completed' ? 'View Results' : status === 'in-progress' ? 'Continue' : 'Start Assessment'}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        {userAssessments.length > 0 && (
          <div>
            <h2 className="text-xl font-display font-semibold mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {userAssessments.slice(0, 3).map((assessment) => {
                    const type = assessmentTypes.find(t => t.id === assessment.assessmentTypeId);
                    if (!type) return null;

                    return (
                      <div 
                        key={assessment.id}
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/assessment/${type.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-accent/10 text-accent">
                            {getIcon(type.icon)}
                          </div>
                          <div>
                            <div className="font-medium">{type.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {assessment.status === 'completed' 
                                ? `Completed ${assessment.completedAt?.toLocaleDateString()}`
                                : `Started ${assessment.startedAt?.toLocaleDateString()}`
                              }
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {assessment.score && (
                            <div className="text-right">
                              <div className="text-lg font-bold text-accent">{assessment.score.overall}%</div>
                              <div className="text-xs text-muted-foreground">Score</div>
                            </div>
                          )}
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
