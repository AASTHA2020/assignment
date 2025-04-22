import { useState } from "react";
import { useGameStore } from "../utils/pointManager";

const cardsData = [
    { id: 1, emoji: "🍎", color: "bg-pink-200" },
    { id: 2, emoji: "🍎", color: "bg-purple-200" },
    { id: 3, emoji: "🍌", color: "bg-pink-200" },
    { id: 4, emoji: "🍌", color: "bg-purple-200" },
    { id: 5, emoji: "🍇", color: "bg-pink-200" },
    { id: 6, emoji: "🍇", color: "bg-purple-200" },
];

export default function MathMatch() {
    const { addWin } = useGameStore();
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    const handleCardClick = (card) => {
        console.log("Card clicked:", card);

        if (flippedCards.length === 2 || matchedCards.includes(card.id)) {
            console.log("Click ignored. Either two cards are already flipped or the card is already matched.");
            return;
        }

        const newFlippedCards = [...flippedCards, card];
        console.log("Flipped cards:", newFlippedCards);
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [first, second] = newFlippedCards;
            console.log("Comparing cards:", first, second);

            if (first.emoji === second.emoji) {
                console.log("Cards matched:", first, second);
                setMatchedCards((prev) => {
                    const updatedMatchedCards = [...prev, first.id, second.id];
                    console.log("Updated matched cards:", updatedMatchedCards);
                    return updatedMatchedCards;
                });
                addWin();
                console.log("Point added!");
                alert("Matched! +1 Point!");
            } else {
                console.log("Cards did not match.");
            }

            setTimeout(() => {
                console.log("Resetting flipped cards.");
                setFlippedCards([]);
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-4">
            <h2 className="text-2xl font-bold mb-4">Math Match Game</h2>
            <p className="mb-6">🧠 Match the cards to earn points!</p>
            <div className="grid grid-cols-3 gap-4">
                {cardsData.map((card) => (
                    <div
                        key={card.id}
                        className={`w-24 h-32 flex items-center justify-center rounded-lg cursor-pointer ${
                            flippedCards.includes(card) || matchedCards.includes(card.id)
                                ? card.color
                                : "bg-gray-300"
                        }`}
                        onClick={() => handleCardClick(card)}
                    >
                        {(flippedCards.includes(card) || matchedCards.includes(card.id)) && (
                            <span className="text-2xl">{card.emoji}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
