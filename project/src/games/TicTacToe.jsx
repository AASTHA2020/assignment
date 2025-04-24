import { useState, useEffect } from 'react';
import { useGameStore } from '../utils/pointManager';

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(4).fill(''));
    const { addWin } = useGameStore();
    const [winner, setWinner] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const handleInputChange = (index, value) => {
        const newBoard = [...board];
        newBoard[index] = value;
        setBoard(newBoard);

        if (checkWinner(newBoard)) {
            setWinner(true);
            setShowPopup(true);
        }
    };

    const resetGame = () => {
        setBoard(Array(4).fill(''));
        setWinner(false);
        setShowPopup(false);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    function checkWinner(board) {
        const winConditions = [
            [0, 1],
            [0, 2],
            [1, 3],
            [2, 3],
        ];

        for (let i = 0; i < winConditions.length; i++) {
            const [x, y] = winConditions[i];
            const sum = (parseInt(board[x]) || 0) + (parseInt(board[y]) || 0);
            if (sum === 5) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h2 className="text-3xl font-bold mb-6">Tic Tac Toe</h2>

            <div className="grid grid-cols-2 gap-4">
                {board.map((val, idx) => (
                    <input
                        key={idx}
                        type="number"
                        value={val}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        className="w-24 h-24 bg-white text-3xl font-bold shadow rounded flex items-center justify-center border text-center"
                    />
                ))}
            </div>

            {/* Popup for Winner */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-bold mb-4">🎉 Winner Found!</h3>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={resetGame}
                            >
                                Play Again
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={closePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
