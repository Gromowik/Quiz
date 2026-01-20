
import React from "react";
import useQuiz from "../components/useQuiz";
import { QuizContext } from "../components/QuizContext";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuizCards } from "../components/useQuizCards";

const HtmlQuiz = () => {
  const cards = useQuizCards("html");
  const [cardIdx, setCardIdx] = useState(0);
   const questions = cards[cardIdx] || [];
  const { answers, submitAnswer, score } = useQuiz("html", questions);
  const { resetQuiz } = useContext(QuizContext);
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="min-h-screen p-8 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <div className="w-full max-w-xl bg-white/80 rounded shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">HTML Quiz (Deutsch)</h1>
        <div className="flex gap-4 mb-6">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
            onClick={() => resetQuiz("html")}
          >
            Neu starten
          </button>
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition"
            onClick={() => setShowResults((v) => !v)}
          >
            {showResults ? "Ergebnisse verbergen" : "Ergebnisse anzeigen"}
          </button>
        </div>
        {/* Kartenwechsel */}
        <div className="flex items-center justify-between mb-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCardIdx((c) => Math.max(0, c - 1))}
            disabled={cardIdx === 0}
          >
            Vorherige Karte
          </button>
          <span className="text-sm">Karte {cardIdx + 1} / {cards.length}</span>
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCardIdx((c) => Math.min(cards.length - 1, c + 1))}
            disabled={cardIdx === cards.length - 1}
          >
            Nächste Karte
          </button>
        </div>
        {questions.map((q) => (
          <div key={q.id} className="mb-6">
            <div className="mb-2 font-semibold">{q.question}</div>
            {q.type === "radio" ? (
              <div className="flex flex-col gap-2">
                {q.options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === opt}
                      onChange={() => submitAnswer(q.id, opt)}
                      className="accent-blue-600"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : q.type === "checkbox" ? (
              <div className="flex flex-col gap-2">
                {q.options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={q.id}
                      checked={Array.isArray(answers[q.id]) ? answers[q.id].includes(opt) : false}
                      onChange={() => {
                        let newValue = Array.isArray(answers[q.id]) ? [...answers[q.id]] : [];
                        if (newValue.includes(opt)) {
                          newValue = newValue.filter((v) => v !== opt);
                        } else {
                          newValue.push(opt);
                        }
                        submitAnswer(q.id, newValue);
                      }}
                      className="accent-blue-600"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={answers[q.id] || ""}
                onChange={(e) => submitAnswer(q.id, e.target.value)}
                className="border rounded px-2 py-1 w-full"
                placeholder="Antwort eingeben..."
              />
            )}
          </div>
        ))}
        {showResults && (
          <div className="mt-4">
            <div className="text-lg font-bold text-green-700 mb-2">
              Richtige Antworten: {
                questions.filter(q => {
                  const userAnswer = answers[q.id];
                  if (q.type === "input") {
                    return userAnswer && userAnswer.trim().toLowerCase() === q.correct.trim().toLowerCase();
                  } else if (q.type === "radio") {
                    return userAnswer === q.correct;
                  } else if (q.type === "checkbox") {
                    return Array.isArray(userAnswer) && Array.isArray(q.correct) && userAnswer.length === q.correct.length && userAnswer.every((v) => q.correct.includes(v));
                  }
                  return false;
                }).length
              } / {questions.length}
            </div>
            <div className="space-y-2">
              {questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                let isCorrect = false;
                if (q.type === "input") {
                  isCorrect = userAnswer && userAnswer.trim().toLowerCase() === q.correct.trim().toLowerCase();
                } else if (q.type === "radio") {
                  isCorrect = userAnswer === q.correct;
                } else if (q.type === "checkbox") {
                  isCorrect = Array.isArray(userAnswer) && Array.isArray(q.correct) && userAnswer.length === q.correct.length && userAnswer.every((v) => q.correct.includes(v));
                }
                return (
                  <div key={q.id} className={`p-2 rounded ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    <div className="font-semibold">{idx + 1}. {q.question}</div>
                    <div>Deine Antwort: <span className="font-mono">{
                      q.type === "checkbox"
                        ? userAnswer !== undefined && userAnswer !== null && userAnswer !== ""
                          ? String(userAnswer)
                          : <span className="italic">(keine Antwort)</span>
                        : userAnswer !== undefined && userAnswer !== null && userAnswer !== ""
                          ? String(userAnswer)
                          : <span className="italic">(keine Antwort)</span>
                    }</span></div>
                    {!isCorrect && (
                      <div>Korrekte Antwort: <span className="font-mono">{
                        q.type === "checkbox"
                          ? String(q.correct)
                          : String(q.correct)
                      }</span></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HtmlQuiz;

