import React, { useState } from "react";

const THEMES = [
  { value: "css", label: "CSS" },
  { value: "html", label: "HTML" },
  { value: "js", label: "JavaScript" },
  { value: "react", label: "React" },
];

const emptyQuestion = (type = "input") => ({
  id: "",
  type,
  question: "",
  options: type !== "input" ? ["", "", "", ""] : undefined,
  correct: type === "checkbox" ? [] : "",
});

function CardEditor() {
  const [theme, setTheme] = useState(THEMES[0].value);
  const [questions, setQuestions] = useState([
    emptyQuestion("radio"),
    emptyQuestion("checkbox"),
    emptyQuestion("input"),
    emptyQuestion("input"),
    emptyQuestion("radio"),
  ]);
  const [message, setMessage] = useState("");

  const handleQuestionChange = (idx, field, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };

      if (field === "type") {
        if (value === "input") {
          updated[idx].options = undefined;
          updated[idx].correct = "";
        } else {
          updated[idx].options = ["", "", "", ""];
          updated[idx].correct = value === "checkbox" ? [] : "";
        }
      }
      return updated;
    });
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      const opts = [...updated[qIdx].options];
      opts[optIdx] = value;
      updated[qIdx].options = opts;
      return updated;
    });
  };

  const handleCorrectChange = (qIdx, optIdx) => {
    const optionValue = questions[qIdx].options[optIdx];

    if (!optionValue || !optionValue.trim()) {
      return;
    }

    setQuestions(prev => {
      const updated = [...prev];
      
      if (updated[qIdx].type === "checkbox") {
        let arr = Array.isArray(updated[qIdx].correct)
          ? [...updated[qIdx].correct]
          : [];

        if (arr.includes(optionValue)) {
          arr = arr.filter(v => v !== optionValue);
        } else {
          arr.push(optionValue);
        }

        updated[qIdx] = { ...updated[qIdx], correct: arr };
      } else {
        updated[qIdx] = { ...updated[qIdx], correct: optionValue };
      }

      return updated;
    });
  };

  const handleSave = () => {
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.question.trim()) {
        setMessage(`Frage ${i + 1} ist nicht ausgefüllt`);
        return;
      }
      if (!q.id.trim()) {
        setMessage(`ID für Frage ${i + 1} fehlt`);
        return;
      }

      if (q.type !== "input") {
        if (!q.options || q.options.some(o => !o.trim())) {
          setMessage(`Nicht alle Optionen sind in Frage ${i + 1} ausgefüllt`);
          return;
        }

        if (q.type === "checkbox" && q.correct.length === 0) {
          setMessage(`Keine richtige Antwort gewählt in Frage ${i + 1}`);
          return;
        }

        if (q.type === "radio" && q.correct === "") {
          setMessage(`Keine richtige Antwort gewählt in Frage ${i + 1}`);
          return;
        }
      } else {
        if (!q.correct.trim()) {
          setMessage(`Antwort fehlt in Frage ${i + 1}`);
          return;
        }
      }
    }

    const card = questions.map(q => {
      const { id, type, question, options, correct } = q;
      const obj = { id, type, question };
      if (type !== "input") obj.options = options;
      obj.correct = correct;
      return obj;
    });

    const blob = new Blob([JSON.stringify(card, null, 2)], {
      type: "application/json",
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${theme}-card.json`;
    a.click();

    setMessage("Karte gespeichert! Datei wurde heruntergeladen.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Karten-Generator für ein Thema</h2>

      <div className="mb-4">
        <label className="font-semibold mr-2">Thema:</label>
        <select
          value={theme}
          onChange={e => setTheme(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {THEMES.map(t => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {questions.map((q, idx) => (
        <div key={idx} className="mb-6 border-b pb-4">
          <div className="mb-2 font-semibold">Frage {idx + 1}</div>

          <div className="mb-2">
            <label className="mr-2">ID:</label>
            <input
              value={q.id}
              onChange={e => handleQuestionChange(idx, "id", e.target.value)}
              className="border px-2 py-1 rounded w-32"
            />

            <label className="ml-4 mr-2">Typ:</label>
            <select
              value={q.type}
              onChange={e => handleQuestionChange(idx, "type", e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="radio">radio</option>
              <option value="checkbox">checkbox</option>
              <option value="input">input</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="mr-2">Frage:</label>
            <input
              value={q.question}
              onChange={e =>
                handleQuestionChange(idx, "question", e.target.value)
              }
              className="border px-2 py-1 rounded w-2/3"
            />
          </div>

          {q.type !== "input" && (
            <div className="mb-2">
              <div className="font-semibold mb-1">Optionen:</div>

              {q.options.map((opt, oidx) => (
                <div key={oidx} className="flex items-center mb-1">
                  <input
                    value={opt}
                    onChange={e =>
                      handleOptionChange(idx, oidx, e.target.value)
                    }
                    className="border px-2 py-1 rounded w-2/3 mr-2"
                  />

                  {q.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={
                        Array.isArray(q.correct) &&
                        q.correct.includes(opt)
                      }
                      disabled={!opt || !opt.trim()}
                      onChange={() => handleCorrectChange(idx, oidx)}
                    />
                  ) : (
                    <input
                      type="radio"
                      name={`correct-${idx}`}
                      checked={q.correct === opt}
                      disabled={!opt || !opt.trim()}
                      onChange={() => handleCorrectChange(idx, oidx)}
                    />
                  )}

                  <span className="ml-2">Richtig</span>
                </div>
              ))}
            </div>
          )}

          {q.type === "input" && (
            <div className="mb-2">
              <label className="mr-2">Antwort:</label>
              <input
                value={q.correct}
                onChange={e =>
                  handleQuestionChange(idx, "correct", e.target.value)
                }
                className="border px-2 py-1 rounded w-2/3"
              />
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Karte speichern (JSON herunterladen)
      </button>

      {message && (
        <div className="mt-4 text-blue-700 font-semibold">{message}</div>
      )}
    </div>
  );
}

export default CardEditor;
