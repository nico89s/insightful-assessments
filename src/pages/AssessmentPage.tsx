import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Brain,
  Boxes,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { assessmentTypes } from '@/lib/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';

const AssessmentPage: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    currentAssessment,
    currentQuestion,
    startAssessment,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    completeAssessment,
    getProgress,
  } = useAssessment();

  const assessmentType = assessmentTypes.find(t => t.id === assessmentId);

  const handleStart = () => {
    if (assessmentId && user) {
      startAssessment(assessmentId, user.id);
    }
  };

  const handleAnswer = (optionId: string) => {
    answerQuestion(optionId);
  };

  const handleComplete = () => {
    const score = completeAssessment();
    navigate('/assessment/results', { state: { score, assessmentType } });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain':
        return <Brain className="w-8 h-8" />;
      case 'cube':
        return <Boxes className="w-8 h-8" />;
      default:
        return <Brain className="w-8 h-8" />;
    }
  };

  if (!assessmentType) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-display font-semibold mb-2">Assessment Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested assessment does not exist.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </DashboardLayout>
    );
  }

  // Show start screen if assessment hasn't started
  if (!currentAssessment || currentAssessment.assessmentTypeId !== assessmentId) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <Card className="overflow-hidden">
            <div className="gradient-hero p-8 text-center text-primary-foreground">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 mb-4">
                {getIcon(assessmentType.icon)}
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                {assessmentType.name}
              </h1>
              <p className="text-primary-foreground/80 max-w-md mx-auto">
                {assessmentType.description}
              </p>
            </div>

            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{assessmentType.duration}</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <CheckCircle className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold">{assessmentType.questionCount}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
              </div>

              <div className="bg-info/10 rounded-lg p-4 mb-8">
                <h3 className="font-semibold text-info mb-2">Before you begin:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Find a quiet place with no distractions</li>
                  <li>• Answer honestly - there are no right or wrong answers</li>
                  <li>• You can navigate between questions</li>
                  <li>• Your progress is saved automatically</li>
                </ul>
              </div>

              <Button 
                variant="accent" 
                size="xl" 
                className="w-full"
                onClick={handleStart}
              >
                Start Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const progress = getProgress();
  const isLastQuestion = progress.current === progress.total;
  const selectedAnswer = currentAssessment.answers.find(
    a => a.questionId === currentQuestion?.id
  );

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {progress.current} of {progress.total}
            </span>
            <span className="text-sm font-medium">{progress.percentage}% Complete</span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardDescription className="text-xs uppercase tracking-wider">
              {assessmentType.category} Assessment
            </CardDescription>
            <CardTitle className="text-xl md:text-2xl font-display leading-relaxed">
              {currentQuestion?.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion?.options.map((option) => {
                const isSelected = selectedAnswer?.optionId === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    className={`
                      w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                      ${isSelected 
                        ? 'border-accent bg-accent/10 shadow-md' 
                        : 'border-border hover:border-accent/50 hover:bg-muted/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                        ${isSelected 
                          ? 'border-accent bg-accent' 
                          : 'border-muted-foreground/30'
                        }
                      `}>
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-accent-foreground" />
                        )}
                      </div>
                      <span className={`font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={progress.current === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              variant="accent"
              size="lg"
              onClick={handleComplete}
              disabled={!selectedAnswer}
            >
              Complete Assessment
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={!selectedAnswer}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssessmentPage;
