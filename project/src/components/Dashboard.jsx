import React, { useState } from 'react';

const Dashboard = ({ points }) => {
    const [gameScores, setGameScores] = useState(points);

    const updateScore = (game, player, newScore) => {
        setGameScores((prevScores) => ({
            ...prevScores,
            [game]: {
                ...prevScores[game],
                [player]: newScore,
            },
        }));
    };

    return (
        <div className="dashboard">
            <h3>Score Dashboard</h3>
            <table>
                <thead>
                    <tr>
                        <th>Game</th>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(gameScores).map(([game, players]) =>
                        Object.entries(players).map(([player, score]) => (
                            <tr key={`${game}-${player}`}>
                                <td>{game}</td>
                                <td>{player}</td>
                                <td>{score}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            updateScore(
                                                game,
                                                player,
                                                score + 1
                                            )
                                        }
                                    >
                                        +1
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
