import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle2, 
  ArrowRight, 
  Download,
  Share2,
  Trophy,
  TrendingUp
} from 'lucide-react';
import { AssessmentScore, AssessmentType } from '@/lib/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface LocationState {
  score: AssessmentScore;
  assessmentType: AssessmentType;
}

const AssessmentResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, assessmentType } = (location.state as LocationState) || {};

  if (!score || !assessmentType) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No results to display.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-success';
    if (value >= 60) return 'text-accent';
    if (value >= 40) return 'text-highlight';
    return 'text-destructive';
  };

  const getScoreLabel = (value: number) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Average';
    return 'Below Average';
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Success Banner */}
        <div className="gradient-hero rounded-2xl p-8 text-center text-primary-foreground mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-foreground/20 mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Assessment Complete!
          </h1>
          <p className="text-primary-foreground/80 mb-6">
            You've successfully completed the {assessmentType.name}
          </p>
          
          <div className="inline-flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl px-8 py-4">
            <Trophy className="w-8 h-8 text-highlight" />
            <div className="text-left">
              <div className="text-4xl font-display font-bold">{score.overall}%</div>
              <div className="text-sm text-primary-foreground/70">Overall Score</div>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <Card className="mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <TrendingUp className="w-5 h-5 text-accent" />
              Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {score.breakdown.map((item, index) => (
                <div key={item.trait} className="animate-fade-in" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.trait}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {item.percentile}th percentile
                      </span>
                      <span className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                        {item.score}%
                      </span>
                    </div>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
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

        {/* What's Next */}
        <Card className="mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="font-display">What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Your results have been saved and will be reviewed by our professional assessors. 
              You'll receive detailed feedback and recommendations based on your responses.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button 
            variant="accent" 
            size="lg" 
            className="flex-1"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssessmentResults;
