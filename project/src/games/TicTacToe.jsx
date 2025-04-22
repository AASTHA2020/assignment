import { useState, useEffect } from 'react';
import { useGameStore } from '../utils/pointManager';

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xTurn, setXTurn] = useState(true);
    const { addWin } = useGameStore();
    const [points, setPoints] = useState({ X: 0, O: 0 });
    const [winner, setWinner] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // Load saved points
    useEffect(() => {
        console.log('📦 Loading points from localStorage...');
        const savedPoints = JSON.parse(localStorage.getItem('points'));
        if (savedPoints) {
            console.log('✅ Loaded points:', savedPoints);
            setPoints(savedPoints);
        }
    }, []);

    // Save points to localStorage
    useEffect(() => {
        console.log('💾 Saving points to localStorage:', points);
        localStorage.setItem('points', JSON.stringify(points));
    }, [points]);

    const handleClick = (index) => {
        console.log(`🕹️ Clicked cell: ${index}`);
        if (board[index] || winner) {
            console.log('⚠️ Invalid move - either already filled or game over');
            return;
        }

        const newBoard = [...board];
        newBoard[index] = xTurn ? 'X' : 'O';
        console.log(`📍 Setting ${newBoard[index]} at index ${index}`);
        setBoard(newBoard);
        setXTurn(!xTurn);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            console.log(`🎉 ${gameWinner} wins!`);
            setWinner(gameWinner);
            setShowPopup(true);
            setPoints((prev) => ({
                ...prev,
                [gameWinner]: prev[gameWinner] + 1,
            }));
            addWin(); // Optional: update global state
        }
    };

    const resetGame = () => {
        console.log('🔄 Resetting game...');
        setBoard(Array(9).fill(null));
        setXTurn(true);
        setWinner(null);
        setShowPopup(false);
    };

    const closePopup = () => {
        console.log('❌ Closing popup');
        setShowPopup(false);
    };

    function checkWinner(board) {
        const winLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let [x, y, z] of winLines) {
            if (board[x] && board[x] === board[y] && board[x] === board[z]) {
                return board[x];
            }
        }
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h2 className="text-3xl font-bold mb-6">Tic Tac Toe</h2>

                        <div className="grid grid-cols-3 gap-4">
                            {board.map((val, idx) => (
                                // Each cell in the board is represented as a button
                                // `val` is the value of the cell (either 'X', 'O', or null)
                                // `idx` is the index of the cell in the board array
                                <button
                                    key={idx} // Unique key for each button based on its index
                                    onClick={() => handleClick(idx)} // Handle click event for the cell
                                    className="w-24 h-24 bg-white text-3xl font-bold shadow rounded flex items-center justify-center border"
                                >
                                    {val} {/* Display the value of the cell ('X', 'O', or empty) */}
                                </button>
                            ))}
                        </div>

                        {/* Next Turn Info */}
            <div className="mt-6 text-lg">
                {!winner && <p>Next Turn: <strong>{xTurn ? 'X' : 'O'}</strong></p>}
            </div>

            {/* Score Summary */}
            <div className="mt-4 text-lg">
                <p>
                    Score — X: <strong>{points.X}</strong> | O: <strong>{points.O}</strong>
                </p>
            </div>

            {/* Popup for Winner */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-bold mb-4">🎉 {winner} Wins!</h3>
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
