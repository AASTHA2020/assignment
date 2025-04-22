import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TicTacToe from './games/TicTacToe';
import MathMatch from './games/MathMatch';
import QuizGame from './games/QuizGame';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/math-match" element={<MathMatch />} />
        <Route path="/quiz" element={<QuizGame />} />
      </Routes>
    </Router>
  );
}
