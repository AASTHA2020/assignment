import { useState, useEffect } from "react";

const MemoryGame = () => {
    const emojis = ["😊", "❤️", "🎉", "🌟"];
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(0);

    // Shuffle emojis and set up the game
    const initializeGame = () => {
        console.log("Initializing game...");
        const allEmojis = [...emojis, ...emojis]; // duplicate emojis
        console.log("Duplicated emojis:", allEmojis);

        // shuffle the array
        for (let i = allEmojis.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allEmojis[i], allEmojis[j]] = [allEmojis[j], allEmojis[i]];
        }
        console.log("Shuffled emojis:", allEmojis);

        // create card objects
        const cardObjects = allEmojis.map((emoji, index) => ({
            id: index,
            emoji: emoji,
            matched: false,
        }));
        console.log("Card objects:", cardObjects);

        setCards(cardObjects);
        setFlipped([]);
        setMatchedPairs(0);
        console.log("Game initialized.");
    };

    // 🧠 Run this once when the component first loads
    useEffect(() => {
        console.log("Component mounted.");
        initializeGame();
    }, []);

    // 🖱 When a card is clicked
    const handleClick = (id) => {
        console.log("Card clicked:", id);

        // Ignore if already flipped or 2 cards are flipped
        if (flipped.length === 2 || flipped.includes(id)) {
            console.log("Click ignored. Either two cards are already flipped or the card is already flipped.");
            return;
        }

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);
        console.log("Flipped cards:", newFlipped);

        // If 2 cards are now flipped, check for match
        if (newFlipped.length === 2) {
            const [firstId, secondId] = newFlipped;
            const firstCard = cards[firstId];
            const secondCard = cards[secondId];
            console.log("Checking match for cards:", firstCard, secondCard);

            if (firstCard.emoji === secondCard.emoji) {
                console.log("Match found!");
                // If match, mark as matched
                const updatedCards = cards.map((card) =>
                    card.id === firstId || card.id === secondId
                        ? { ...card, matched: true }
                        : card
                );
                setCards(updatedCards);
                setMatchedPairs(matchedPairs + 1);
                console.log("Updated cards after match:", updatedCards);
                console.log("Matched pairs count:", matchedPairs + 1);
            } else {
                console.log("No match.");
            }

            // After a short delay, reset flipped
            setTimeout(() => {
                console.log("Resetting flipped cards.");
                setFlipped([]);
            }, 1000);
        }
    };

    return (
        <div className="text-center p-5 font-sans">
            <h1 className="text-2xl font-bold mb-5">😊 Emoji Memory Game ❤️</h1>

            <div className="grid grid-cols-4 gap-3">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => handleClick(card.id)}
                        className={`w-16 h-16 flex items-center justify-center text-xl cursor-pointer border ${
                            flipped.includes(card.id) || card.matched ? "bg-green-300" : "bg-gray-400"
                        }`}
                    >
                        {flipped.includes(card.id) || card.matched ? card.emoji : "❓"}
                    </div>
                ))}
            </div>

            <p className="mt-4">Matched Pairs: {matchedPairs}</p>
        </div>
    );
};

export default MemoryGame;
