import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../utils/pointManager';

export default function Dashboard() {
    const { winCount } = useGameStore();

    // List of games with localStorage keys and routes
    const games = [
        { name: 'Tic Tac Toe', key: 'points-tictactoe', path: '/tic-tac-toe' },
        { name: 'Math Match', key: 'points-mathmatch', path: '/math-match' },
        { name: 'Quiz', key: 'points-quiz', path: '/quiz' },
    ];

    const [gamePoints, setGamePoints] = useState({});

    // Fetch points from localStorage for each game
    useEffect(() => {
        console.log('📥 Fetching game points from localStorage...');
        const pointsData = {};

        games.forEach((game) => {
            const raw = localStorage.getItem(game.key);
            const parsed = raw ? JSON.parse(raw) : {};
            pointsData[game.name] = parsed;
            console.log(`✅ Loaded ${game.name}:`, parsed);
        });

        setGamePoints(pointsData);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">🎮 GameHub Dashboard</h1>

            {/* Games Table with dynamic points */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mb-6 overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Games Points Overview</h2>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">Game</th>
                            <th className="border px-4 py-2">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => {
                            const points = gamePoints[game.name] || {};
                            const entries = Object.entries(points).map(
                                ([player, score]) => `${player}: ${score}`
                            ).join(' | ') || 'No data';
                            return (
                                <tr key={index} className="text-center">
                                    <td className="border px-4 py-2 font-medium">{game.name}</td>
                                    <td className="border px-4 py-2">{entries}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Grid for game navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
                {games.map((game, index) => (
                    <Link
                        key={index}
                        to={game.path}
                        className="bg-blue-500 text-white p-4 rounded-lg text-center shadow hover:bg-blue-600 transition"
                    >
                        {game.name}
                    </Link>
                ))}
            </div>

            {/* Total Wins Summary */}
            <div className="mt-8 text-center">
                <p className="text-lg font-medium">
                    🏆 Games Won (Global): <span className="font-bold">{winCount}</span>
                </p>
            </div>
        </div>
    );
}
