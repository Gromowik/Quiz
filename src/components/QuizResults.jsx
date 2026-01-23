import React from "react";

/**
 * Компонент для отображения результатов Quiz
 */
const QuizResults = ({ questions, answers }) => {
  const correctCount = questions.filter((q) => {
    const userAnswer = answers[q.id];
    if (q.type === "input") {
      return (
        userAnswer &&
        userAnswer.trim().toLowerCase() === q.correct.trim().toLowerCase()
      );
    } else if (q.type === "radio") {
      return userAnswer === q.correct;
    } else if (q.type === "checkbox") {
      return (
        Array.isArray(userAnswer) &&
        Array.isArray(q.correct) &&
        userAnswer.length === q.correct.length &&
        userAnswer.every((v) => q.correct.includes(v))
      );
    }
    return false;
  }).length;

  return (
    <div className="mt-4">
      <div className="text-lg font-bold text-green-700 mb-2">
        Richtige Antworten: {correctCount} / {questions.length}
      </div>
      <div className="space-y-2">
        {questions.map((q, idx) => {
          const userAnswer = answers[q.id];
          let isCorrect = false;

          if (q.type === "input") {
            isCorrect =
              userAnswer &&
              userAnswer.trim().toLowerCase() === q.correct.trim().toLowerCase();
          } else if (q.type === "radio") {
            isCorrect = userAnswer === q.correct;
          } else if (q.type === "checkbox") {
            isCorrect =
              Array.isArray(userAnswer) &&
              Array.isArray(q.correct) &&
              userAnswer.length === q.correct.length &&
              userAnswer.every((v) => q.correct.includes(v));
          }

          return (
            <div
              key={q.id}
              className={`p-2 rounded ${
                isCorrect
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <div className="font-semibold">
                {idx + 1}. {q.question}
              </div>
              <div>
                Deine Antwort:{" "}
                <span className="font-mono">
                  {q.type === "checkbox"
                    ? Array.isArray(userAnswer) && userAnswer.length > 0
                      ? userAnswer.join(", ")
                      : <span className="italic">(keine Antwort)</span>
                    : userAnswer !== undefined &&
                      userAnswer !== null &&
                      userAnswer !== ""
                    ? String(userAnswer)
                    : <span className="italic">(keine Antwort)</span>}
                </span>
              </div>
              {!isCorrect && (
                <div>
                  Korrekte Antwort:{" "}
                  <span className="font-mono">
                    {q.type === "checkbox"
                      ? q.correct.join(", ")
                      : String(q.correct)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizResults;
