import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../components/Landing";
import SurveyForm from "../components/SurveyForm";
// import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/survey" element={<SurveyForm />} />
      </Routes>
    </Router>
  );
}

export default App;