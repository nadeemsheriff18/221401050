import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shortener from "./pages/Shortener";
import Stats from "./pages/Stats";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Shortener />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
