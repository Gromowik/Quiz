import React from "react";

/**
 * Компонент для навигации между карточками Quiz
 */
const QuizNavigation = ({ currentCard, totalCards, onPrevious, onNext }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={onPrevious}
        disabled={currentCard === 0}
      >
        Vorherige Karte
      </button>
      <span className="text-sm">
        Karte {currentCard + 1} / {totalCards}
      </span>
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={onNext}
        disabled={currentCard === totalCards - 1}
      >
        Nächste Karte
      </button>
    </div>
  );
};

export default QuizNavigation;
