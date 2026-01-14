import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building2, 
  Briefcase,
  Calendar,
  ClipboardCheck,
  Brain,
  Boxes,
  ChevronRight
} from 'lucide-react';
import { 
  getUserById, 
  getCompanyById, 
  getProjectById, 
  mockAssessments,
  assessmentTypes 
} from '@/lib/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';

const EmployeeDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const user = getUserById(id || '');
  const company = user?.companyId ? getCompanyById(user.companyId) : undefined;
  const project = user?.projectId ? getProjectById(user.projectId) : undefined;
  
  const userAssessments = mockAssessments.filter(a => a.userId === id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain':
        return <Brain className="w-5 h-5" />;
      case 'cube':
        return <Boxes className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success border-0">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-highlight/10 text-highlight border-0">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Employee not found.</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Employee Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-display font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.position}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {user.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company & Project Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Company
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-medium">{company?.name || 'N/A'}</div>
              <div className="text-sm text-muted-foreground">{company?.industry}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-medium">{project?.name || 'N/A'}</div>
              <div className="text-sm text-muted-foreground">{project?.description}</div>
            </CardContent>
          </Card>
        </div>

        {/* Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Employee Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Department</div>
                <div className="font-medium">{user.department || 'N/A'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Position</div>
                <div className="font-medium">{user.position || 'N/A'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Registered Date</div>
                <div className="font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  {user.createdAt.toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Assessments</div>
                <div className="font-medium flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-muted-foreground" />
                  {userAssessments.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment History */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Assessment History</CardTitle>
            <CardDescription>All assessments taken by this employee</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {userAssessments.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                No assessments found for this employee.
              </div>
            ) : (
              <div className="divide-y">
                {userAssessments.map((assessment) => {
                  const type = assessmentTypes.find(t => t.id === assessment.assessmentTypeId);
                  if (!type) return null;

                  return (
                    <div 
                      key={assessment.id}
                      className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/assessor/result/${assessment.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {getIcon(type.icon)}
                        </div>
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {assessment.completedAt 
                              ? `Completed ${assessment.completedAt.toLocaleDateString()}`
                              : `Started ${assessment.startedAt?.toLocaleDateString()}`
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(assessment.status)}
                        {assessment.score && (
                          <div className="text-lg font-bold text-primary">
                            {assessment.score.overall}%
                          </div>
                        )}
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDetails;
