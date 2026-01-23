import React, { useContext, useState } from "react";
import useQuiz from "../hooks/useQuiz";
import { QuizContext } from "../components/QuizContext";
import { useQuizCards } from "../hooks/useQuizCards";
import QuizQuestion from "../components/QuizQuestion";
import QuizNavigation from "../components/QuizNavigation";
import QuizResults from "../components/QuizResults";

const HtmlQuiz = () => {
  const cards = useQuizCards("html");
  const [cardIdx, setCardIdx] = useState(0);
  const questions = cards[cardIdx] || [];
  const { answers, submitAnswer } = useQuiz("html", questions);
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

        <QuizNavigation
          currentCard={cardIdx}
          totalCards={cards.length}
          onPrevious={() => setCardIdx((c) => Math.max(0, c - 1))}
          onNext={() => setCardIdx((c) => Math.min(cards.length - 1, c + 1))}
        />

        {questions.map((q) => (
          <QuizQuestion
            key={q.id}
            question={q}
            answer={answers[q.id]}
            onAnswerChange={submitAnswer}
          />
        ))}

        {showResults && (
          <QuizResults questions={questions} answers={answers} />
        )}
      </div>
    </div>
  );
};

export default HtmlQuiz;

