import { useState } from 'react';
import { useGameStore } from '../utils/pointManager';

export default function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xTurn, setXTurn] = useState(true);
    const { addWin } = useGameStore();
    const [points, setPoints] = useState({ X: 0, O: 0 });

    const winner = checkWinner(board);

    const handleClick = (index) => {
        console.log(`Clicked on index: ${index}`);
        if (board[index] || winner) {
            console.log('Invalid move. Either the cell is already filled or the game has a winner.');
            return;
        }
        const newBoard = [...board];
        newBoard[index] = xTurn ? 'X' : 'O';
        console.log('Updated board:', newBoard);
        setBoard(newBoard);
        setXTurn(!xTurn);
        console.log(`Next turn: ${xTurn ? 'O' : 'X'}`);
    };

    const resetGame = () => {
        console.log('Resetting the game...');
        setBoard(Array(9).fill(null));
        setXTurn(true);
    };

    function checkWinner(b) {
        console.log('Checking for a winner...');
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
        for (let [a, b, c] of winLines) {
            if (b[a] && b[a] === b[b] && b[a] === b[c]) {
                const winner = b[a];
                console.log(`Winner found: ${winner}`);
                setPoints((prev) => {
                    const updatedPoints = { ...prev, [winner]: prev[winner] + 1 };
                    console.log('Updated points:', updatedPoints);
                    return updatedPoints;
                });
                return winner;
            }
        }
        console.log('No winner yet.');
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h2 className="text-3xl font-bold mb-6">Tic Tac Toe</h2>
            <div className="grid grid-cols-3 gap-4">
                {board.map((val, idx) => (
                    <button
                        key={idx}
                        className="w-24 h-24 text-3xl font-bold bg-white shadow-md rounded-lg flex items-center justify-center border"
                        onClick={() => handleClick(idx)}
                    >
                        {val}
                    </button>
                ))}
            </div>
            <div className="mt-6 text-lg text-center">
                {winner ? (
                    <>
                        🎉 {winner} wins!
                        <button
                            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                            onClick={resetGame}
                        >
                            Play Again
                        </button>
                    </>
                ) : (
                    <p>Next Turn: {xTurn ? 'X' : 'O'}</p>
                )}
            </div>
            <div className="mt-4 text-lg">
                <p>
                    Points: X - {points.X} | O - {points.O}
                </p>
            </div>
        </div>
    );
}
