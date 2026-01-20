import React from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "HTML Quiz",
    description: "Teste dein Wissen zu HTML!",
    to: "/html",
    gradient: "from-blue-100 via-white to-pink-100",
  },
  {
    title: "CSS Quiz",
    description: "Teste dein Wissen zu CSS!",
    to: "/css",
    gradient: "from-blue-100 via-white to-cyan-100",
  },
  {
    title: "JavaScript Quiz",
    description: "Teste dein Wissen zu JavaScript!",
    to: "/js",
    gradient: "from-yellow-100 via-white to-orange-100",
  },
  {
    title: "React Quiz",
    description: "Teste dein Wissen zu React!",
    to: "/react",
    gradient: "from-green-100 via-white to-lime-100",
  },
];

export default function CardsPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl p-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`cursor-pointer rounded-xl shadow-lg p-8 bg-gradient-to-br ${card.gradient} transition-transform hover:scale-105`}
            onClick={() => navigate(card.to)}
          >
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p className="mb-4 text-gray-700">{card.description}</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Quiz starten</button>
          </div>
        ))}
      </div>
    </div>
  );
}
