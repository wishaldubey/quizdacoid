export interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'integer';
  options?: string[];
  correctAnswer: string | number;
}

export interface QuizAttempt {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  answers: Record<number, string | number>;
  timeSpent: number;
}