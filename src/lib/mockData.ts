// Mock data and types for the HR Assessment Tool

export type UserRole = 'user' | 'assessor' | 'admin';

export interface Company {
  id: string;
  name: string;
  industry: string;
}

export interface Project {
  id: string;
  name: string;
  companyId: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'completed' | 'upcoming';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  companyId?: string;
  projectId?: string;
  position?: string;
  department?: string;
  phone?: string;
}

export interface AssessmentType {
  id: string;
  name: string;
  description: string;
  category: 'personality' | 'aptitude' | 'cognitive' | 'skills';
  duration: number; // in minutes
  questionCount: number;
  icon: string;
}

export interface Question {
  id: string;
  assessmentId: string;
  type: 'multiple-choice' | 'likert' | 'image-choice';
  text: string;
  options: QuestionOption[];
  imageUrl?: string;
  order: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  imageUrl?: string;
  value: number;
  trait?: string; // For personality tests
}

export interface Assessment {
  id: string;
  userId: string;
  assessmentTypeId: string;
  projectId: string;
  companyId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  currentQuestion: number;
  answers: Answer[];
  score?: AssessmentScore;
}

export interface Answer {
  questionId: string;
  optionId: string;
  answeredAt: Date;
}

export interface AssessmentScore {
  overall: number;
  breakdown: { trait: string; score: number; percentile: number }[];
}

// Mock Companies
export const mockCompanies: Company[] = [
  { id: 'c-1', name: 'TechCorp Indonesia', industry: 'Technology' },
  { id: 'c-2', name: 'Bank Nusantara', industry: 'Banking & Finance' },
  { id: 'c-3', name: 'Retail Maju Bersama', industry: 'Retail' },
];

// Mock Projects
export const mockProjects: Project[] = [
  { 
    id: 'p-1', 
    name: 'Management Trainee 2024', 
    companyId: 'c-1', 
    description: 'Annual MT recruitment program',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-06-30'),
    status: 'active'
  },
  { 
    id: 'p-2', 
    name: 'Senior Developer Hiring', 
    companyId: 'c-1', 
    description: 'Tech team expansion',
    startDate: new Date('2024-04-01'),
    status: 'active'
  },
  { 
    id: 'p-3', 
    name: 'Leadership Assessment Q2', 
    companyId: 'c-2', 
    description: 'Quarterly leadership potential assessment',
    startDate: new Date('2024-04-15'),
    endDate: new Date('2024-05-15'),
    status: 'active'
  },
  { 
    id: 'p-4', 
    name: 'Store Manager Recruitment', 
    companyId: 'c-3', 
    description: 'Hiring store managers for new locations',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-04-30'),
    status: 'completed'
  },
];

// Mock Users
export const mockUsers: User[] = [
  { 
    id: '1', 
    email: 'admin@kickhr.com', 
    name: 'Sarah Admin', 
    role: 'admin', 
    createdAt: new Date('2024-01-01'),
    position: 'Platform Administrator',
    department: 'Operations'
  },
  { 
    id: '2', 
    email: 'michael.chen@kickhr.com', 
    name: 'Michael Chen', 
    role: 'assessor', 
    createdAt: new Date('2024-02-15'),
    position: 'Senior HR Consultant',
    department: 'Assessment Services'
  },
  { 
    id: '3', 
    email: 'emily.johnson@techcorp.com', 
    name: 'Emily Johnson', 
    role: 'user', 
    createdAt: new Date('2024-03-20'),
    companyId: 'c-1',
    projectId: 'p-1',
    position: 'Management Trainee Candidate',
    department: 'Human Resources',
    phone: '+62 812 3456 7890'
  },
  { 
    id: '4', 
    email: 'jane.doe@techcorp.com', 
    name: 'Jane Doe', 
    role: 'user', 
    createdAt: new Date('2024-04-10'),
    companyId: 'c-1',
    projectId: 'p-1',
    position: 'Management Trainee Candidate',
    department: 'Marketing',
    phone: '+62 813 4567 8901'
  },
  { 
    id: '5', 
    email: 'john.smith@techcorp.com', 
    name: 'John Smith', 
    role: 'user', 
    createdAt: new Date('2024-04-15'),
    companyId: 'c-1',
    projectId: 'p-2',
    position: 'Senior Developer Candidate',
    department: 'Engineering',
    phone: '+62 814 5678 9012'
  },
  { 
    id: '6', 
    email: 'ahmad.rizki@banknusantara.com', 
    name: 'Ahmad Rizki', 
    role: 'user', 
    createdAt: new Date('2024-04-18'),
    companyId: 'c-2',
    projectId: 'p-3',
    position: 'Branch Manager Candidate',
    department: 'Branch Operations',
    phone: '+62 815 6789 0123'
  },
  { 
    id: '7', 
    email: 'siti.nurhaliza@retailmaju.com', 
    name: 'Siti Nurhaliza', 
    role: 'user', 
    createdAt: new Date('2024-02-20'),
    companyId: 'c-3',
    projectId: 'p-4',
    position: 'Store Manager Candidate',
    department: 'Retail Operations',
    phone: '+62 816 7890 1234'
  },
];

// Assessment Types
export const assessmentTypes: AssessmentType[] = [
  {
    id: 'big-five',
    name: 'Big Five Personality Test',
    description: 'Measures the five major personality traits: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    category: 'personality',
    duration: 10,
    questionCount: 50,
    icon: 'brain',
  },
  {
    id: 'spatial-reasoning',
    name: 'Spatial Reasoning Test',
    description: 'Evaluates your ability to mentally manipulate 2D and 3D objects. Tests visualization and spatial orientation skills.',
    category: 'aptitude',
    duration: 10,
    questionCount: 10,
    icon: 'cube',
  },
];

// Big Five Personality Questions (IPIP-BFFM based)
export const bigFiveQuestions: Question[] = [
  // Extraversion
  { id: 'bf-1', assessmentId: 'big-five', type: 'likert', text: 'I am the life of the party.', order: 1, options: [
    { id: 'bf-1-1', text: 'Strongly Disagree', value: 1, trait: 'extraversion' },
    { id: 'bf-1-2', text: 'Disagree', value: 2, trait: 'extraversion' },
    { id: 'bf-1-3', text: 'Neutral', value: 3, trait: 'extraversion' },
    { id: 'bf-1-4', text: 'Agree', value: 4, trait: 'extraversion' },
    { id: 'bf-1-5', text: 'Strongly Agree', value: 5, trait: 'extraversion' },
  ]},
  { id: 'bf-2', assessmentId: 'big-five', type: 'likert', text: 'I feel comfortable around people.', order: 2, options: [
    { id: 'bf-2-1', text: 'Strongly Disagree', value: 1, trait: 'extraversion' },
    { id: 'bf-2-2', text: 'Disagree', value: 2, trait: 'extraversion' },
    { id: 'bf-2-3', text: 'Neutral', value: 3, trait: 'extraversion' },
    { id: 'bf-2-4', text: 'Agree', value: 4, trait: 'extraversion' },
    { id: 'bf-2-5', text: 'Strongly Agree', value: 5, trait: 'extraversion' },
  ]},
  { id: 'bf-3', assessmentId: 'big-five', type: 'likert', text: 'I start conversations.', order: 3, options: [
    { id: 'bf-3-1', text: 'Strongly Disagree', value: 1, trait: 'extraversion' },
    { id: 'bf-3-2', text: 'Disagree', value: 2, trait: 'extraversion' },
    { id: 'bf-3-3', text: 'Neutral', value: 3, trait: 'extraversion' },
    { id: 'bf-3-4', text: 'Agree', value: 4, trait: 'extraversion' },
    { id: 'bf-3-5', text: 'Strongly Agree', value: 5, trait: 'extraversion' },
  ]},
  { id: 'bf-4', assessmentId: 'big-five', type: 'likert', text: 'I talk to a lot of different people at parties.', order: 4, options: [
    { id: 'bf-4-1', text: 'Strongly Disagree', value: 1, trait: 'extraversion' },
    { id: 'bf-4-2', text: 'Disagree', value: 2, trait: 'extraversion' },
    { id: 'bf-4-3', text: 'Neutral', value: 3, trait: 'extraversion' },
    { id: 'bf-4-4', text: 'Agree', value: 4, trait: 'extraversion' },
    { id: 'bf-4-5', text: 'Strongly Agree', value: 5, trait: 'extraversion' },
  ]},
  { id: 'bf-5', assessmentId: 'big-five', type: 'likert', text: 'I don\'t mind being the center of attention.', order: 5, options: [
    { id: 'bf-5-1', text: 'Strongly Disagree', value: 1, trait: 'extraversion' },
    { id: 'bf-5-2', text: 'Disagree', value: 2, trait: 'extraversion' },
    { id: 'bf-5-3', text: 'Neutral', value: 3, trait: 'extraversion' },
    { id: 'bf-5-4', text: 'Agree', value: 4, trait: 'extraversion' },
    { id: 'bf-5-5', text: 'Strongly Agree', value: 5, trait: 'extraversion' },
  ]},
  // Agreeableness
  { id: 'bf-6', assessmentId: 'big-five', type: 'likert', text: 'I feel others\' emotions.', order: 6, options: [
    { id: 'bf-6-1', text: 'Strongly Disagree', value: 1, trait: 'agreeableness' },
    { id: 'bf-6-2', text: 'Disagree', value: 2, trait: 'agreeableness' },
    { id: 'bf-6-3', text: 'Neutral', value: 3, trait: 'agreeableness' },
    { id: 'bf-6-4', text: 'Agree', value: 4, trait: 'agreeableness' },
    { id: 'bf-6-5', text: 'Strongly Agree', value: 5, trait: 'agreeableness' },
  ]},
  { id: 'bf-7', assessmentId: 'big-five', type: 'likert', text: 'I have a soft heart.', order: 7, options: [
    { id: 'bf-7-1', text: 'Strongly Disagree', value: 1, trait: 'agreeableness' },
    { id: 'bf-7-2', text: 'Disagree', value: 2, trait: 'agreeableness' },
    { id: 'bf-7-3', text: 'Neutral', value: 3, trait: 'agreeableness' },
    { id: 'bf-7-4', text: 'Agree', value: 4, trait: 'agreeableness' },
    { id: 'bf-7-5', text: 'Strongly Agree', value: 5, trait: 'agreeableness' },
  ]},
  { id: 'bf-8', assessmentId: 'big-five', type: 'likert', text: 'I make people feel at ease.', order: 8, options: [
    { id: 'bf-8-1', text: 'Strongly Disagree', value: 1, trait: 'agreeableness' },
    { id: 'bf-8-2', text: 'Disagree', value: 2, trait: 'agreeableness' },
    { id: 'bf-8-3', text: 'Neutral', value: 3, trait: 'agreeableness' },
    { id: 'bf-8-4', text: 'Agree', value: 4, trait: 'agreeableness' },
    { id: 'bf-8-5', text: 'Strongly Agree', value: 5, trait: 'agreeableness' },
  ]},
  { id: 'bf-9', assessmentId: 'big-five', type: 'likert', text: 'I am interested in people.', order: 9, options: [
    { id: 'bf-9-1', text: 'Strongly Disagree', value: 1, trait: 'agreeableness' },
    { id: 'bf-9-2', text: 'Disagree', value: 2, trait: 'agreeableness' },
    { id: 'bf-9-3', text: 'Neutral', value: 3, trait: 'agreeableness' },
    { id: 'bf-9-4', text: 'Agree', value: 4, trait: 'agreeableness' },
    { id: 'bf-9-5', text: 'Strongly Agree', value: 5, trait: 'agreeableness' },
  ]},
  { id: 'bf-10', assessmentId: 'big-five', type: 'likert', text: 'I sympathize with others\' feelings.', order: 10, options: [
    { id: 'bf-10-1', text: 'Strongly Disagree', value: 1, trait: 'agreeableness' },
    { id: 'bf-10-2', text: 'Disagree', value: 2, trait: 'agreeableness' },
    { id: 'bf-10-3', text: 'Neutral', value: 3, trait: 'agreeableness' },
    { id: 'bf-10-4', text: 'Agree', value: 4, trait: 'agreeableness' },
    { id: 'bf-10-5', text: 'Strongly Agree', value: 5, trait: 'agreeableness' },
  ]},
  // Conscientiousness
  { id: 'bf-11', assessmentId: 'big-five', type: 'likert', text: 'I am always prepared.', order: 11, options: [
    { id: 'bf-11-1', text: 'Strongly Disagree', value: 1, trait: 'conscientiousness' },
    { id: 'bf-11-2', text: 'Disagree', value: 2, trait: 'conscientiousness' },
    { id: 'bf-11-3', text: 'Neutral', value: 3, trait: 'conscientiousness' },
    { id: 'bf-11-4', text: 'Agree', value: 4, trait: 'conscientiousness' },
    { id: 'bf-11-5', text: 'Strongly Agree', value: 5, trait: 'conscientiousness' },
  ]},
  { id: 'bf-12', assessmentId: 'big-five', type: 'likert', text: 'I pay attention to details.', order: 12, options: [
    { id: 'bf-12-1', text: 'Strongly Disagree', value: 1, trait: 'conscientiousness' },
    { id: 'bf-12-2', text: 'Disagree', value: 2, trait: 'conscientiousness' },
    { id: 'bf-12-3', text: 'Neutral', value: 3, trait: 'conscientiousness' },
    { id: 'bf-12-4', text: 'Agree', value: 4, trait: 'conscientiousness' },
    { id: 'bf-12-5', text: 'Strongly Agree', value: 5, trait: 'conscientiousness' },
  ]},
  { id: 'bf-13', assessmentId: 'big-five', type: 'likert', text: 'I get chores done right away.', order: 13, options: [
    { id: 'bf-13-1', text: 'Strongly Disagree', value: 1, trait: 'conscientiousness' },
    { id: 'bf-13-2', text: 'Disagree', value: 2, trait: 'conscientiousness' },
    { id: 'bf-13-3', text: 'Neutral', value: 3, trait: 'conscientiousness' },
    { id: 'bf-13-4', text: 'Agree', value: 4, trait: 'conscientiousness' },
    { id: 'bf-13-5', text: 'Strongly Agree', value: 5, trait: 'conscientiousness' },
  ]},
  { id: 'bf-14', assessmentId: 'big-five', type: 'likert', text: 'I like order.', order: 14, options: [
    { id: 'bf-14-1', text: 'Strongly Disagree', value: 1, trait: 'conscientiousness' },
    { id: 'bf-14-2', text: 'Disagree', value: 2, trait: 'conscientiousness' },
    { id: 'bf-14-3', text: 'Neutral', value: 3, trait: 'conscientiousness' },
    { id: 'bf-14-4', text: 'Agree', value: 4, trait: 'conscientiousness' },
    { id: 'bf-14-5', text: 'Strongly Agree', value: 5, trait: 'conscientiousness' },
  ]},
  { id: 'bf-15', assessmentId: 'big-five', type: 'likert', text: 'I follow a schedule.', order: 15, options: [
    { id: 'bf-15-1', text: 'Strongly Disagree', value: 1, trait: 'conscientiousness' },
    { id: 'bf-15-2', text: 'Disagree', value: 2, trait: 'conscientiousness' },
    { id: 'bf-15-3', text: 'Neutral', value: 3, trait: 'conscientiousness' },
    { id: 'bf-15-4', text: 'Agree', value: 4, trait: 'conscientiousness' },
    { id: 'bf-15-5', text: 'Strongly Agree', value: 5, trait: 'conscientiousness' },
  ]},
  // Neuroticism (reverse scored where applicable)
  { id: 'bf-16', assessmentId: 'big-five', type: 'likert', text: 'I get stressed out easily.', order: 16, options: [
    { id: 'bf-16-1', text: 'Strongly Disagree', value: 1, trait: 'neuroticism' },
    { id: 'bf-16-2', text: 'Disagree', value: 2, trait: 'neuroticism' },
    { id: 'bf-16-3', text: 'Neutral', value: 3, trait: 'neuroticism' },
    { id: 'bf-16-4', text: 'Agree', value: 4, trait: 'neuroticism' },
    { id: 'bf-16-5', text: 'Strongly Agree', value: 5, trait: 'neuroticism' },
  ]},
  { id: 'bf-17', assessmentId: 'big-five', type: 'likert', text: 'I worry about things.', order: 17, options: [
    { id: 'bf-17-1', text: 'Strongly Disagree', value: 1, trait: 'neuroticism' },
    { id: 'bf-17-2', text: 'Disagree', value: 2, trait: 'neuroticism' },
    { id: 'bf-17-3', text: 'Neutral', value: 3, trait: 'neuroticism' },
    { id: 'bf-17-4', text: 'Agree', value: 4, trait: 'neuroticism' },
    { id: 'bf-17-5', text: 'Strongly Agree', value: 5, trait: 'neuroticism' },
  ]},
  { id: 'bf-18', assessmentId: 'big-five', type: 'likert', text: 'I get upset easily.', order: 18, options: [
    { id: 'bf-18-1', text: 'Strongly Disagree', value: 1, trait: 'neuroticism' },
    { id: 'bf-18-2', text: 'Disagree', value: 2, trait: 'neuroticism' },
    { id: 'bf-18-3', text: 'Neutral', value: 3, trait: 'neuroticism' },
    { id: 'bf-18-4', text: 'Agree', value: 4, trait: 'neuroticism' },
    { id: 'bf-18-5', text: 'Strongly Agree', value: 5, trait: 'neuroticism' },
  ]},
  { id: 'bf-19', assessmentId: 'big-five', type: 'likert', text: 'I am easily disturbed.', order: 19, options: [
    { id: 'bf-19-1', text: 'Strongly Disagree', value: 1, trait: 'neuroticism' },
    { id: 'bf-19-2', text: 'Disagree', value: 2, trait: 'neuroticism' },
    { id: 'bf-19-3', text: 'Neutral', value: 3, trait: 'neuroticism' },
    { id: 'bf-19-4', text: 'Agree', value: 4, trait: 'neuroticism' },
    { id: 'bf-19-5', text: 'Strongly Agree', value: 5, trait: 'neuroticism' },
  ]},
  { id: 'bf-20', assessmentId: 'big-five', type: 'likert', text: 'I change my mood a lot.', order: 20, options: [
    { id: 'bf-20-1', text: 'Strongly Disagree', value: 1, trait: 'neuroticism' },
    { id: 'bf-20-2', text: 'Disagree', value: 2, trait: 'neuroticism' },
    { id: 'bf-20-3', text: 'Neutral', value: 3, trait: 'neuroticism' },
    { id: 'bf-20-4', text: 'Agree', value: 4, trait: 'neuroticism' },
    { id: 'bf-20-5', text: 'Strongly Agree', value: 5, trait: 'neuroticism' },
  ]},
  // Openness
  { id: 'bf-21', assessmentId: 'big-five', type: 'likert', text: 'I have a vivid imagination.', order: 21, options: [
    { id: 'bf-21-1', text: 'Strongly Disagree', value: 1, trait: 'openness' },
    { id: 'bf-21-2', text: 'Disagree', value: 2, trait: 'openness' },
    { id: 'bf-21-3', text: 'Neutral', value: 3, trait: 'openness' },
    { id: 'bf-21-4', text: 'Agree', value: 4, trait: 'openness' },
    { id: 'bf-21-5', text: 'Strongly Agree', value: 5, trait: 'openness' },
  ]},
  { id: 'bf-22', assessmentId: 'big-five', type: 'likert', text: 'I have excellent ideas.', order: 22, options: [
    { id: 'bf-22-1', text: 'Strongly Disagree', value: 1, trait: 'openness' },
    { id: 'bf-22-2', text: 'Disagree', value: 2, trait: 'openness' },
    { id: 'bf-22-3', text: 'Neutral', value: 3, trait: 'openness' },
    { id: 'bf-22-4', text: 'Agree', value: 4, trait: 'openness' },
    { id: 'bf-22-5', text: 'Strongly Agree', value: 5, trait: 'openness' },
  ]},
  { id: 'bf-23', assessmentId: 'big-five', type: 'likert', text: 'I am quick to understand things.', order: 23, options: [
    { id: 'bf-23-1', text: 'Strongly Disagree', value: 1, trait: 'openness' },
    { id: 'bf-23-2', text: 'Disagree', value: 2, trait: 'openness' },
    { id: 'bf-23-3', text: 'Neutral', value: 3, trait: 'openness' },
    { id: 'bf-23-4', text: 'Agree', value: 4, trait: 'openness' },
    { id: 'bf-23-5', text: 'Strongly Agree', value: 5, trait: 'openness' },
  ]},
  { id: 'bf-24', assessmentId: 'big-five', type: 'likert', text: 'I use difficult words.', order: 24, options: [
    { id: 'bf-24-1', text: 'Strongly Disagree', value: 1, trait: 'openness' },
    { id: 'bf-24-2', text: 'Disagree', value: 2, trait: 'openness' },
    { id: 'bf-24-3', text: 'Neutral', value: 3, trait: 'openness' },
    { id: 'bf-24-4', text: 'Agree', value: 4, trait: 'openness' },
    { id: 'bf-24-5', text: 'Strongly Agree', value: 5, trait: 'openness' },
  ]},
  { id: 'bf-25', assessmentId: 'big-five', type: 'likert', text: 'I am full of ideas.', order: 25, options: [
    { id: 'bf-25-1', text: 'Strongly Disagree', value: 1, trait: 'openness' },
    { id: 'bf-25-2', text: 'Disagree', value: 2, trait: 'openness' },
    { id: 'bf-25-3', text: 'Neutral', value: 3, trait: 'openness' },
    { id: 'bf-25-4', text: 'Agree', value: 4, trait: 'openness' },
    { id: 'bf-25-5', text: 'Strongly Agree', value: 5, trait: 'openness' },
  ]},
];

// Spatial Reasoning Questions (simplified with descriptions)
export const spatialQuestions: Question[] = [
  {
    id: 'sp-1',
    assessmentId: 'spatial-reasoning',
    type: 'multiple-choice',
    text: 'Which 3D shape is identical to the target when rotated?',
    order: 1,
    imageUrl: '/spatial-q1.png',
    options: [
      { id: 'sp-1-a', text: 'A', value: 0 },
      { id: 'sp-1-b', text: 'B', value: 1 },
      { id: 'sp-1-c', text: 'C', value: 0 },
      { id: 'sp-1-d', text: 'D', value: 0 },
    ],
  },
  {
    id: 'sp-2',
    assessmentId: 'spatial-reasoning',
    type: 'multiple-choice',
    text: 'If this cube is unfolded, which pattern would result?',
    order: 2,
    options: [
      { id: 'sp-2-a', text: 'Pattern A - Cross shape with dots', value: 1 },
      { id: 'sp-2-b', text: 'Pattern B - T-shape with stripes', value: 0 },
      { id: 'sp-2-c', text: 'Pattern C - L-shape with circles', value: 0 },
      { id: 'sp-2-d', text: 'Pattern D - Zigzag with squares', value: 0 },
    ],
  },
  {
    id: 'sp-3',
    assessmentId: 'spatial-reasoning',
    type: 'multiple-choice',
    text: 'How many cubes are in this 3D structure?',
    order: 3,
    options: [
      { id: 'sp-3-a', text: '8 cubes', value: 0 },
      { id: 'sp-3-b', text: '10 cubes', value: 0 },
      { id: 'sp-3-c', text: '12 cubes', value: 1 },
      { id: 'sp-3-d', text: '14 cubes', value: 0 },
    ],
  },
  {
    id: 'sp-4',
    assessmentId: 'spatial-reasoning',
    type: 'multiple-choice',
    text: 'Which shape completes the pattern?',
    order: 4,
    options: [
      { id: 'sp-4-a', text: 'Rotated square', value: 0 },
      { id: 'sp-4-b', text: 'Inverted triangle', value: 1 },
      { id: 'sp-4-c', text: 'Circle segment', value: 0 },
      { id: 'sp-4-d', text: 'Hexagon', value: 0 },
    ],
  },
  {
    id: 'sp-5',
    assessmentId: 'spatial-reasoning',
    type: 'multiple-choice',
    text: 'Which view shows the object from the top?',
    order: 5,
    options: [
      { id: 'sp-5-a', text: 'View A - Rectangle with circle', value: 0 },
      { id: 'sp-5-b', text: 'View B - Square with cross', value: 0 },
      { id: 'sp-5-c', text: 'View C - Circle with square inside', value: 1 },
      { id: 'sp-5-d', text: 'View D - Triangle', value: 0 },
    ],
  },
];

// Sample completed assessments for assessor dashboard
export const mockAssessments: Assessment[] = [
  {
    id: 'a-1',
    userId: '3',
    assessmentTypeId: 'big-five',
    projectId: 'p-1',
    companyId: 'c-1',
    status: 'completed',
    startedAt: new Date('2024-04-15T09:00:00'),
    completedAt: new Date('2024-04-15T09:12:00'),
    currentQuestion: 25,
    answers: [],
    score: {
      overall: 78,
      breakdown: [
        { trait: 'Openness', score: 85, percentile: 82 },
        { trait: 'Conscientiousness', score: 72, percentile: 65 },
        { trait: 'Extraversion', score: 88, percentile: 90 },
        { trait: 'Agreeableness', score: 76, percentile: 70 },
        { trait: 'Neuroticism', score: 45, percentile: 35 },
      ],
    },
  },
  {
    id: 'a-2',
    userId: '4',
    assessmentTypeId: 'big-five',
    projectId: 'p-1',
    companyId: 'c-1',
    status: 'completed',
    startedAt: new Date('2024-04-16T14:00:00'),
    completedAt: new Date('2024-04-16T14:15:00'),
    currentQuestion: 25,
    answers: [],
    score: {
      overall: 82,
      breakdown: [
        { trait: 'Openness', score: 78, percentile: 72 },
        { trait: 'Conscientiousness', score: 92, percentile: 95 },
        { trait: 'Extraversion', score: 65, percentile: 55 },
        { trait: 'Agreeableness', score: 88, percentile: 85 },
        { trait: 'Neuroticism', score: 52, percentile: 45 },
      ],
    },
  },
  {
    id: 'a-3',
    userId: '5',
    assessmentTypeId: 'spatial-reasoning',
    projectId: 'p-2',
    companyId: 'c-1',
    status: 'completed',
    startedAt: new Date('2024-04-17T10:00:00'),
    completedAt: new Date('2024-04-17T10:08:00'),
    currentQuestion: 5,
    answers: [],
    score: {
      overall: 80,
      breakdown: [
        { trait: 'Spatial Visualization', score: 85, percentile: 80 },
        { trait: 'Mental Rotation', score: 75, percentile: 70 },
      ],
    },
  },
  {
    id: 'a-4',
    userId: '3',
    assessmentTypeId: 'spatial-reasoning',
    projectId: 'p-1',
    companyId: 'c-1',
    status: 'in-progress',
    startedAt: new Date('2024-04-18T11:00:00'),
    currentQuestion: 3,
    answers: [],
  },
  {
    id: 'a-5',
    userId: '6',
    assessmentTypeId: 'big-five',
    projectId: 'p-3',
    companyId: 'c-2',
    status: 'completed',
    startedAt: new Date('2024-04-18T09:00:00'),
    completedAt: new Date('2024-04-18T09:15:00'),
    currentQuestion: 25,
    answers: [],
    score: {
      overall: 75,
      breakdown: [
        { trait: 'Openness', score: 70, percentile: 65 },
        { trait: 'Conscientiousness', score: 85, percentile: 82 },
        { trait: 'Extraversion', score: 72, percentile: 68 },
        { trait: 'Agreeableness', score: 80, percentile: 75 },
        { trait: 'Neuroticism', score: 48, percentile: 40 },
      ],
    },
  },
  {
    id: 'a-6',
    userId: '7',
    assessmentTypeId: 'big-five',
    projectId: 'p-4',
    companyId: 'c-3',
    status: 'completed',
    startedAt: new Date('2024-03-15T10:00:00'),
    completedAt: new Date('2024-03-15T10:12:00'),
    currentQuestion: 25,
    answers: [],
    score: {
      overall: 88,
      breakdown: [
        { trait: 'Openness', score: 82, percentile: 78 },
        { trait: 'Conscientiousness', score: 95, percentile: 97 },
        { trait: 'Extraversion', score: 90, percentile: 92 },
        { trait: 'Agreeableness', score: 85, percentile: 80 },
        { trait: 'Neuroticism', score: 38, percentile: 28 },
      ],
    },
  },
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get assessment type by ID
export const getAssessmentTypeById = (id: string): AssessmentType | undefined => {
  return assessmentTypes.find(type => type.id === id);
};

// Helper function to get company by ID
export const getCompanyById = (id: string): Company | undefined => {
  return mockCompanies.find(company => company.id === id);
};

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};

// Helper function to get projects by company ID
export const getProjectsByCompanyId = (companyId: string): Project[] => {
  return mockProjects.filter(project => project.companyId === companyId);
};

// Helper function to get assessments by project ID
export const getAssessmentsByProjectId = (projectId: string): Assessment[] => {
  return mockAssessments.filter(assessment => assessment.projectId === projectId);
};

// Helper function to get assessments by company ID
export const getAssessmentsByCompanyId = (companyId: string): Assessment[] => {
  return mockAssessments.filter(assessment => assessment.companyId === companyId);
};
