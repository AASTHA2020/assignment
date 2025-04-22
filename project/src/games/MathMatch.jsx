// App.jsx
import { useState, useEffect } from "react";

const emojis = ['🐸', '🦄', '🐰', '🦖', '🦋', '🦀', '🐬', '🙈'];

const shuffleArray = (arr) => {
    const array = [...arr, ...arr]; // duplicate emojis for pairs
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export default function App() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [disableClick, setDisableClick] = useState(false);

    useEffect(() => {
        setCards(shuffleArray(emojis));
    }, []);

    const handleClick = (index) => {
        if (disableClick || flipped.includes(index) || matched.includes(index)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setDisableClick(true);
            const [first, second] = newFlipped;
            if (cards[first] === cards[second]) {
                setMatched([...matched, first, second]);
            }

            setTimeout(() => {
                setFlipped([]);
                setDisableClick(false);
            }, 800);
        }
    };

    const resetGame = () => {
        setCards(shuffleArray(emojis));
        setFlipped([]);
        setMatched([]);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">🧠 Match Pair Game</h1>
            <div className="grid grid-cols-4 gap-4">
                {cards.map((emoji, index) => {
                    const isFlipped = flipped.includes(index) || matched.includes(index);
                    const cardColor = index % 2 === 0 ? 'bg-pink-400' : 'bg-purple-400';
                    return (
                        <div
                            key={index}
                            onClick={() => handleClick(index)}
                            className={`w-16 h-16 flex items-center justify-center text-2xl border rounded shadow cursor-pointer
                                ${isFlipped ? 'bg-white' : `${cardColor} text-white`}`}
                        >
                            {isFlipped ? emoji : "?"}
                        </div>
                    );
                })}
            </div>
            <button
                onClick={resetGame}
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                🔁 Restart
            </button>
        </div>
    );
}
