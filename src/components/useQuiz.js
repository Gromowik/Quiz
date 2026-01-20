import { useState, useEffect, useContext } from "react";
import { QuizContext } from "./QuizContext";

/**
 * Hook für Quiz-Logik und Punktzahlberechnung
 * @param {string} quizName - Name des Quiz (html, css, js, react)
 * @param {Array} questions - Array der Fragen
 * @returns {object} - { answers, submitAnswer, score }
 */
export default function useQuiz(quizName, questions) {
  const { answers, results, submitAnswer, setQuizResult } = useContext(QuizContext);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (answers[quizName]) {
      let correct = 0;
      questions.forEach((q) => {
        if (q.type === "input") {
          if (
            answers[quizName][q.id] &&
            answers[quizName][q.id].trim().toLowerCase() === q.correct.trim().toLowerCase()
          ) {
            correct++;
          }
        } else if (q.type === "checkbox") {
          if (answers[quizName][q.id] === q.correct) {
            correct++;
          }
        }
      });
      setScore(correct);
      if (!results || results[quizName] !== correct) {
        setQuizResult(quizName, correct);
      }
    }
  }, [answers, quizName, questions, setQuizResult, results]);

  return {
    answers: answers[quizName] || {},
    submitAnswer: (questionId, answer) => submitAnswer(quizName, questionId, answer),
    score,
  };
}

