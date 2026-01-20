
// QuizContext — GLOBALE Verwaltung des Quiz-Zustands
import React, { createContext, useState } from "react";

// machen den Quiz-Kontext verfügbar
export const QuizContext = createContext();

// QuizProvider — komponent, der den Quiz-Kontext bereitstellt
export const QuizProvider = ({ children }) => {
    
    const resetQuiz = (quiz) => {
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers[quiz];
        return newAnswers;
      });
      setResults((prev) => {
        const newResults = { ...prev };
        delete newResults[quiz];
        return newResults;
      });
    };
  
  // answers и results in localStorage
  const [results, setResults] = useState(() => {
    try {
      const stored = localStorage.getItem("quizResults");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [answers, setAnswers] = useState(() => {
    try {
      const stored = localStorage.getItem("quizAnswers");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // save answers and results in localStorage 
  React.useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
  }, [answers]);

  React.useEffect(() => {
    localStorage.setItem("quizResults", JSON.stringify(results));
  }, [results]);

 

  const submitAnswer = (quiz, questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [quiz]: {
        ...(prev[quiz] || {}),
        [questionId]: answer,
      },
    }));
  };


  const setQuizResult = (quiz, score) => {
    setResults((prev) => ({ ...prev, [quiz]: score }));
  };


  return (
    <QuizContext.Provider value={{ answers, results, submitAnswer, setQuizResult, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
