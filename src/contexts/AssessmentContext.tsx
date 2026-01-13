import React, { createContext, useContext, useState, useCallback } from 'react';
import { Assessment, Answer, Question, bigFiveQuestions, spatialQuestions, AssessmentScore } from '@/lib/mockData';

interface AssessmentContextType {
  currentAssessment: Assessment | null;
  currentQuestion: Question | null;
  questions: Question[];
  startAssessment: (assessmentTypeId: string, userId: string) => void;
  answerQuestion: (optionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeAssessment: () => AssessmentScore;
  getProgress: () => { current: number; total: number; percentage: number };
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAssessment, setCurrentAssessment] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const startAssessment = useCallback((assessmentTypeId: string, userId: string) => {
    const questionSet = assessmentTypeId === 'big-five' ? bigFiveQuestions : spatialQuestions;
    setQuestions(questionSet);
    
    const newAssessment: Assessment = {
      id: `assessment-${Date.now()}`,
      userId,
      assessmentTypeId,
      status: 'in-progress',
      startedAt: new Date(),
      currentQuestion: 0,
      answers: [],
    };
    setCurrentAssessment(newAssessment);
  }, []);

  const currentQuestion = currentAssessment && questions.length > 0
    ? questions[currentAssessment.currentQuestion]
    : null;

  const answerQuestion = useCallback((optionId: string) => {
    if (!currentAssessment || !currentQuestion) return;

    const existingAnswerIndex = currentAssessment.answers.findIndex(
      a => a.questionId === currentQuestion.id
    );

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      optionId,
      answeredAt: new Date(),
    };

    setCurrentAssessment(prev => {
      if (!prev) return prev;
      const newAnswers = [...prev.answers];
      if (existingAnswerIndex >= 0) {
        newAnswers[existingAnswerIndex] = newAnswer;
      } else {
        newAnswers.push(newAnswer);
      }
      return { ...prev, answers: newAnswers };
    });
  }, [currentAssessment, currentQuestion]);

  const nextQuestion = useCallback(() => {
    if (!currentAssessment || currentAssessment.currentQuestion >= questions.length - 1) return;
    setCurrentAssessment(prev => prev ? { ...prev, currentQuestion: prev.currentQuestion + 1 } : prev);
  }, [currentAssessment, questions.length]);

  const previousQuestion = useCallback(() => {
    if (!currentAssessment || currentAssessment.currentQuestion <= 0) return;
    setCurrentAssessment(prev => prev ? { ...prev, currentQuestion: prev.currentQuestion - 1 } : prev);
  }, [currentAssessment]);

  const calculateScore = useCallback((): AssessmentScore => {
    if (!currentAssessment) {
      return { overall: 0, breakdown: [] };
    }

    const traitScores: Record<string, number[]> = {};

    currentAssessment.answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) return;
      
      const option = question.options.find(o => o.id === answer.optionId);
      if (!option) return;

      const trait = option.trait || 'General';
      if (!traitScores[trait]) {
        traitScores[trait] = [];
      }
      traitScores[trait].push(option.value);
    });

    const breakdown = Object.entries(traitScores).map(([trait, scores]) => {
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const normalizedScore = Math.round((avgScore / 5) * 100);
      return {
        trait: trait.charAt(0).toUpperCase() + trait.slice(1),
        score: normalizedScore,
        percentile: Math.round(normalizedScore * 0.9 + Math.random() * 10),
      };
    });

    const overall = Math.round(
      breakdown.reduce((acc, b) => acc + b.score, 0) / breakdown.length
    );

    return { overall, breakdown };
  }, [currentAssessment, questions]);

  const completeAssessment = useCallback(() => {
    const score = calculateScore();
    setCurrentAssessment(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        status: 'completed',
        completedAt: new Date(),
        score,
      };
    });
    return score;
  }, [calculateScore]);

  const getProgress = useCallback(() => {
    if (!currentAssessment) {
      return { current: 0, total: 0, percentage: 0 };
    }
    return {
      current: currentAssessment.currentQuestion + 1,
      total: questions.length,
      percentage: Math.round(((currentAssessment.currentQuestion + 1) / questions.length) * 100),
    };
  }, [currentAssessment, questions.length]);

  return (
    <AssessmentContext.Provider
      value={{
        currentAssessment,
        currentQuestion,
        questions,
        startAssessment,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        completeAssessment,
        getProgress,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
