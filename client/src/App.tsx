import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CandidateList from "./components/StatisticsCandidate/StatisticsCandidate";
import Statistics from "./components/Statistics/Statistics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/candidates" element={<CandidateList />} />
        <Route path="/statistics" element={<Statistics />} /> 
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
