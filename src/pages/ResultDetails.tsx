import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Download,
  Share2,
  User,
  Building2,
  Briefcase,
  Calendar,
  Clock,
  Trophy,
  TrendingUp,
  Brain,
  Boxes
} from 'lucide-react';
import { 
  mockAssessments,
  getUserById, 
  getCompanyById, 
  getProjectById, 
  assessmentTypes 
} from '@/lib/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ResultDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const assessment = mockAssessments.find(a => a.id === id);
  const user = assessment ? getUserById(assessment.userId) : undefined;
  const company = assessment?.companyId ? getCompanyById(assessment.companyId) : undefined;
  const project = assessment?.projectId ? getProjectById(assessment.projectId) : undefined;
  const assessmentType = assessment ? assessmentTypes.find(t => t.id === assessment.assessmentTypeId) : undefined;

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

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-success';
    if (value >= 60) return 'text-primary';
    if (value >= 40) return 'text-highlight';
    return 'text-destructive';
  };

  const getScoreLabel = (value: number) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Average';
    return 'Below Average';
  };

  if (!assessment || !user || !assessmentType) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Assessment result not found.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </DashboardLayout>
    );
  }

  const score = assessment.score;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Header with Score */}
        <Card className="overflow-hidden">
          <div className="gradient-hero p-6 text-primary-foreground">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary-foreground/20">
                  {getIcon(assessmentType.icon)}
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold">{assessmentType.name}</h1>
                  <p className="text-primary-foreground/80">Assessment Result</p>
                </div>
              </div>
              {score && (
                <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl px-5 py-3">
                  <Trophy className="w-6 h-6 text-highlight" />
                  <div>
                    <div className="text-3xl font-display font-bold">{score.overall}%</div>
                    <div className="text-sm text-primary-foreground/70">Overall Score</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div 
                className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors"
                onClick={() => navigate(`/assessor/employee/${user.id}`)}
              >
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Candidate</div>
                  <div className="font-medium text-primary hover:underline">{user.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Company</div>
                  <div className="font-medium">{company?.name || 'N/A'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Project</div>
                  <div className="font-medium">{project?.name || 'N/A'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                  <div className="font-medium">
                    {assessment.completedAt?.toLocaleDateString() || 'In Progress'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Duration & Status */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="text-xl font-bold">
                    {assessment.startedAt && assessment.completedAt
                      ? `${Math.round((assessment.completedAt.getTime() - assessment.startedAt.getTime()) / 60000)} minutes`
                      : 'N/A'
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10 text-success">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="text-xl font-bold capitalize">{assessment.status.replace('-', ' ')}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Score Breakdown */}
        {score && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <TrendingUp className="w-5 h-5 text-primary" />
                Score Breakdown
              </CardTitle>
              <CardDescription>Detailed performance by trait/category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {score.breakdown.map((item, index) => (
                  <div key={item.trait} className="animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{item.trait}</span>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {item.percentile}th percentile
                        </Badge>
                        <span className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                          {item.score}%
                        </span>
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {getScoreLabel(item.score)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => navigate('/under-construction')}>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" onClick={() => navigate('/under-construction')}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Result
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate(`/assessor/employee/${user.id}`)}
              >
                <User className="w-4 h-4 mr-2" />
                View Employee Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ResultDetails;
