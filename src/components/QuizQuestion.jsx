import React from "react";

/**
 * Компонент для отображения одного вопроса Quiz
 * Поддерживает типы: radio, checkbox, input
 */
const QuizQuestion = ({ question, answer, onAnswerChange }) => {
  const { id, type, question: text, options } = question;

  if (type === "radio") {
    return (
      <div className="mb-6">
        <div className="mb-2 font-semibold">{text}</div>
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <input
                type="radio"
                name={id}
                checked={answer === opt}
                onChange={() => onAnswerChange(id, opt)}
                className="accent-green-600"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="mb-6">
        <div className="mb-2 font-semibold">{text}</div>
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={id}
                checked={Array.isArray(answer) ? answer.includes(opt) : false}
                onChange={() => {
                  let newValue = Array.isArray(answer) ? [...answer] : [];
                  if (newValue.includes(opt)) {
                    newValue = newValue.filter((v) => v !== opt);
                  } else {
                    newValue.push(opt);
                  }
                  onAnswerChange(id, newValue);
                }}
                className="accent-green-600"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="mb-2 font-semibold">{text}</div>
      <input
        type="text"
        value={answer || ""}
        onChange={(e) => onAnswerChange(id, e.target.value)}
        className="border rounded px-2 py-1 w-full"
        placeholder="Antwort eingeben..."
      />
    </div>
  );
};

export default QuizQuestion;
