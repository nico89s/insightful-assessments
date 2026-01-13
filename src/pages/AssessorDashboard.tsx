import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  ClipboardCheck, 
  TrendingUp, 
  Clock,
  Brain,
  Boxes,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { mockAssessments, mockUsers, assessmentTypes, getUserById } from '@/lib/mockData';
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
  const completedAssessments = mockAssessments.filter(a => a.status === 'completed');
  const pendingAssessments = mockAssessments.filter(a => a.status === 'in-progress');
  const totalUsers = mockUsers.filter(u => u.role === 'user').length;

  // Chart data
  const assessmentsByType = assessmentTypes.map(type => ({
    name: type.name.split(' ')[0],
    completed: completedAssessments.filter(a => a.assessmentTypeId === type.id).length,
    pending: pendingAssessments.filter(a => a.assessmentTypeId === type.id).length,
  }));

  const statusData = [
    { name: 'Completed', value: completedAssessments.length, color: 'hsl(158, 64%, 42%)' },
    { name: 'In Progress', value: pendingAssessments.length, color: 'hsl(38, 92%, 50%)' },
    { name: 'Not Started', value: totalUsers - completedAssessments.length - pendingAssessments.length, color: 'hsl(215, 16%, 47%)' },
  ];

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
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Assessor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Review assessment results and analyze candidate performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{totalUsers}</div>
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
                <BarChart3 className="w-5 h-5 text-accent" />
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
                  <Bar dataKey="completed" fill="hsl(173, 58%, 39%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display">Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
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
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
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
            <div className="divide-y">
              {completedAssessments.map((assessment) => {
                const user = getUserById(assessment.userId);
                const type = assessmentTypes.find(t => t.id === assessment.assessmentTypeId);
                if (!user || !type) return null;

                return (
                  <div 
                    key={assessment.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-medium">
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
                        <div className="text-lg font-bold text-accent">{assessment.score?.overall}%</div>
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AssessorDashboard;
