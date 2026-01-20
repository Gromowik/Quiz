
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CardsPage from "./pages/CardsPage";
import HtmlQuiz from "./pages/HtmlQuiz";
import CssQuiz from "./pages/CssQuiz";
import JsQuiz from "./pages/JsQuiz";
import ReactQuiz from "./pages/ReactQuiz";
import Navbar from "./components/Navbar";
import CardEditor from "./pages/CardEditor";
import "./index.css";
import { QuizProvider } from "./components/QuizContext";

function App() {
  return (
    <QuizProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CardsPage />} />
          <Route path="/html" element={<HtmlQuiz />} />
          <Route path="/css" element={<CssQuiz />} />
          <Route path="/js" element={<JsQuiz />} />
          <Route path="/react" element={<ReactQuiz />} />
          <Route path="/card-editor" element={<CardEditor />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
