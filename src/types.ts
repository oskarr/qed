type MCQ = {
  question: string,
  type: 'mcq',
  correctAnswers: string[],
  incorrectAnswers: string[],
};

type NumberQuestion = {
  question: string,
  type: 'number',
  answer: number,
};

export type Question = (MCQ | NumberQuestion);

export type Quiz = {
  title: string,
  questions: Question[],
};
