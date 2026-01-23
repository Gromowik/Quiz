import { useEffect, useState } from "react";

/**
 * Hook zum Laden von Quiz-Karten aus JSON-Dateien
 * @param {string} theme - Name des Themas (css, html, js, react)
 * @returns {Array} Array von Karten mit Fragen
 */
export const useQuizCards = (theme) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`/cards/${theme}.json`)
      .then((res) => res.json())
      .then(setCards)
      .catch((err) =>
        console.error(`Fehler beim Laden der ${theme} Karten:`, err)
      );
  }, [theme]);

  return cards;
};
