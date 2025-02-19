import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "Which planet is closest to the Sun?",
    type: "multiple-choice",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: "Mercury"
  },
  {
    id: 2,
    text: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    type: "multiple-choice",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue"
  },
  {
    id: 3,
    text: "Which of the following is primarily used for structuring web pages?",
    type: "multiple-choice",
    options: ["Python", "Java", "HTML", "C++"],
    correctAnswer: "HTML"
  },
  {
    id: 4,
    text: "Which chemical symbol stands for Gold?",
    type: "multiple-choice",
    options: ["Au", "Gd", "Ag", "Pt"],
    correctAnswer: "Au"
  },
  {
    id: 5,
    text: "Which of these processes is not typically involved in refining petroleum?",
    type: "multiple-choice",
    options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
    correctAnswer: "Filtration"
  },
  {
    id: 6,
    text: "What is the value of 12 + 28?",
    type: "integer",
    correctAnswer: 40
  },
  {
    id: 7,
    text: "How many states are there in the United States?",
    type: "integer",
    correctAnswer: 50
  },
  {
    id: 8,
    text: "In which year was the Declaration of Independence signed?",
    type: "integer",
    correctAnswer: 1776
  },
  {
    id: 9,
    text: "What is the value of pi rounded to the nearest integer?",
    type: "integer",
    correctAnswer: 3
  },
  {
    id: 10,
    text: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    type: "integer",
    correctAnswer: 120
  }
];