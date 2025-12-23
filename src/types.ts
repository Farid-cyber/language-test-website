export type User = {
  id?: string;
  fullname: string;
  email: string;
  password: string;
};

export type Category = {
  id?: string;
  name: string;
  type: string;
};

export type Test = {
  id?: string;
  question: string;
  correctAnswer: string;
  options: Answers;
  categoryName: string;
};

export type Answers = { a: string; b: string; c: string; d: string };

export type Result = {
  id: string;
  userId: string;
  testId: string;
  result: string;
  timeSpent: string;
  createdAt: string;
};
