import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  ClipboardCheck, 
  TrendingUp, 
  Clock,
  Brain,
  Boxes,
  ChevronRight,
  BarChart3,
  Building2,
  Briefcase
} from 'lucide-react';
import { 
  mockAssessments, 
  mockUsers, 
  assessmentTypes, 
  getUserById,
  mockCompanies,
  mockProjects,
  getProjectsByCompanyId
} from '@/lib/mockData';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AssessorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<string>('all');

  // Get available projects based on selected company
  const availableProjects = useMemo(() => {
    if (selectedCompany === 'all') {
      return mockProjects;
    }
    return getProjectsByCompanyId(selectedCompany);
  }, [selectedCompany]);

  // Reset project when company changes
  const handleCompanyChange = (value: string) => {
    setSelectedCompany(value);
    setSelectedProject('all');
  };

  // Filter assessments based on selections
  const filteredAssessments = useMemo(() => {
    return mockAssessments.filter(a => {
      if (selectedCompany !== 'all' && a.companyId !== selectedCompany) return false;
      if (selectedProject !== 'all' && a.projectId !== selectedProject) return false;
      return true;
    });
  }, [selectedCompany, selectedProject]);

  const completedAssessments = filteredAssessments.filter(a => a.status === 'completed');
  const pendingAssessments = filteredAssessments.filter(a => a.status === 'in-progress');
  
  // Get unique users from filtered assessments
  const filteredUserIds = [...new Set(filteredAssessments.map(a => a.userId))];
  const totalCandidates = filteredUserIds.length;

  // Chart data
  const assessmentsByType = assessmentTypes.map(type => ({
    name: type.name.split(' ')[0],
    completed: completedAssessments.filter(a => a.assessmentTypeId === type.id).length,
    pending: pendingAssessments.filter(a => a.assessmentTypeId === type.id).length,
  }));

  const statusData = [
    { name: 'Completed', value: completedAssessments.length, color: 'hsl(158, 64%, 42%)' },
    { name: 'In Progress', value: pendingAssessments.length, color: 'hsl(38, 92%, 50%)' },
  ].filter(d => d.value > 0);

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

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
              Assessor Dashboard
            </h1>
            <p className="text-muted-foreground">
              Review assessment results and analyze candidate performance
            </p>
          </div>

          {/* Company & Project Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCompany} onValueChange={handleCompanyChange}>
                <SelectTrigger className="w-[200px] bg-card">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All Companies</SelectItem>
                  {mockCompanies.map(company => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-[200px] bg-card">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="all">All Projects</SelectItem>
                  {availableProjects.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalCandidates}</div>
                  <div className="text-sm text-muted-foreground">Total Candidates</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10 text-success">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{completedAssessments.length}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-highlight/10 text-highlight">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{pendingAssessments.length}</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-info/10 text-info">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {completedAssessments.length > 0 
                      ? Math.round(completedAssessments.reduce((acc, a) => acc + (a.score?.overall || 0), 0) / completedAssessments.length)
                      : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <BarChart3 className="w-5 h-5 text-primary" />
                Assessments by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={assessmentsByType}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="completed" name="Completed" fill="hsl(195, 100%, 45%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" name="In Progress" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display">Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {statusData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    {statusData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  No data available for selected filters
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Completed Assessments */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Recent Completed Assessments</CardTitle>
            <CardDescription>Review and analyze candidate results</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {completedAssessments.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                No completed assessments found for selected filters.
              </div>
            ) : (
              <div className="divide-y">
                {completedAssessments.map((assessment) => {
                  const user = getUserById(assessment.userId);
                  const type = assessmentTypes.find(t => t.id === assessment.assessmentTypeId);
                  if (!user || !type) return null;

                  return (
                    <div 
                      key={assessment.id}
                      className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/assessor/result/${assessment.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <div className="p-1.5 rounded-lg bg-muted">
                            {getIcon(type.icon)}
                          </div>
                          <span className="text-sm hidden md:inline">{type.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{assessment.score?.overall}%</div>
                          <div className="text-xs text-muted-foreground">
                            {assessment.completedAt?.toLocaleDateString()}
                          </div>
                        </div>
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

export default AssessorDashboard;
