import { useState, useEffect } from "react";
const MemoryGame = () => {
  console.log("Component MemoryGame initialized");
  const emojis1 = ["😊", "❤️", "🎉", "🌟"];
  console.log("emojis1 initialized:", emojis1);
  const emojis2 = ["😊", "❤️", "🎉", "🌟"];
  console.log("emojis2 initialized:", emojis2);

  const getRandomEmoji = (emojiArray) => {
    console.log("getRandomEmoji called with:", emojiArray);
    return emojiArray[Math.floor(Math.random() * emojiArray.length)];
  };

  const initializeGame = () => {
    console.log("initializeGame called");
    const allEmojis = [...emojis1, ...emojis2].sort(() => Math.random() - 0.5);
    console.log("All emojis shuffled:", allEmojis);
    setCards(allEmojis.map((emoji, id) => ({ id, emoji, flipped: false, matched: false })));
    setFlipped([]);
    setMatchedPairs(0);
  };

  const [cards, setCards] = useState([]);
  console.log("State cards initialized:", cards);
  const [flipped, setFlipped] = useState([]);
  console.log("State flipped initialized:", flipped);
  const [matchedPairs, setMatchedPairs] = useState(0);
  console.log("State matchedPairs initialized:", matchedPairs);

  useEffect(() => {
    console.log("useEffect called");
    initializeGame();
  }, []);

  const handleClick = (id) => {
    console.log("handleClick called with id:", id);
    if (flipped.length === 2 || flipped.includes(id)) {
      console.log("Click ignored, either two cards are already flipped or card is already flipped");
      return;
    }

    const newFlipped = [...flipped, id];
    console.log("New flipped array:", newFlipped);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      console.log("Two cards flipped:", firstId, secondId);
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];
      console.log("First card:", firstCard, "Second card:", secondCard);

      if (firstCard.emoji === secondCard.emoji) {
        console.log("Cards match!");
        const updatedCards = cards.map(card =>
          card.id === firstId || card.id === secondId
            ? { ...card, matched: true }
            : card
        );
        console.log("Updated cards after match:", updatedCards);
        setCards(updatedCards);
        setMatchedPairs(matchedPairs + 1);
        console.log("Matched pairs incremented:", matchedPairs + 1);
      } else {
        console.log("Cards do not match");
      }

      setTimeout(() => {
        console.log("Resetting flipped cards");
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
              card.flipped || card.matched ? "bg-green-300" : "bg-gray-400"
            }`}
          >
            {card.flipped || card.matched ? card.emoji : "❓"}
          </div>
        ))}
      </div>
      <p className="mt-4">Matched Pairs: {matchedPairs}</p>
    </div>
  );
};

export default MemoryGame;
