import { useGameStore } from '../utils/pointManager';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { points, winCount } = useGameStore();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-semibold mb-4">🎮 GameHub Dashboard</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
                <p className="text-lg font-medium mb-2">Total Points: <span className="font-bold">{points}</span></p>
                <p className="text-lg font-medium mb-4">Games Won: <span className="font-bold">{winCount}</span></p>
                <div className="space-y-3">
                    <Link to="/tic-tac-toe" className="block bg-blue-500 text-white py-2 rounded hover:bg-blue-600">▶️ Tic Tac Toe</Link>
                    <Link to="/math-match" className="block bg-green-500 text-white py-2 rounded hover:bg-green-600">➕ Math Match</Link>
                    <Link to="/quiz" className="block bg-purple-500 text-white py-2 rounded hover:bg-purple-600">🧠 Quiz</Link>
                </div>
            </div>
        </div>
    );
}
