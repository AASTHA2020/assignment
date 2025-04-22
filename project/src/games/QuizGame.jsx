import { useGameStore } from '../utils/pointManager';
import { useState, useEffect } from 'react';

export default function QuizGame() {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [wasCorrect, setWasCorrect] = useState(null);
    const { addWin } = useGameStore();

    useEffect(() => {
        console.log('Fetching questions...');
        async function fetchQuestions() {
            try {
                const response = await fetch('https://opentdb.com/api.php?amount=1&type=boolean');
                const data = await response.json();
                console.log('Fetched data:', data);
                const formattedQuestions = data.results.map((q) => ({
                    facts: [
                        { text: q.question, isFake: q.correct_answer === 'False' },
                        { text: 'This is a fake fact!', isFake: true },
                    ],
                }));
                console.log('Formatted questions:', formattedQuestions);
                setQuestions(formattedQuestions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }
        fetchQuestions();
    }, []);

    const handleAnswer = (fact) => {
        console.log('Answer clicked:', fact);
        const correct = fact.isFake;
        console.log('Was the answer correct?', correct);
        setWasCorrect(correct);
        if (correct) {
            console.log('Adding a win...');
            addWin();
        }
        setFlipped(true);
    };

    const next = () => {
        console.log('Moving to the next question...');
        setIndex(index + 1);
        setFlipped(false);
        setWasCorrect(null);
    };

    if (questions.length === 0) {
        console.log('Questions are still loading...');
        return <div className="p-6 text-center">Loading...</div>;
    }

    const current = questions[index % questions.length];
    console.log('Current question:', current);

    return (
        <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">🧠 Find the Fake Fact</h2>
            <div className="flex justify-center items-center">
                <div
                    className={`relative w-64 h-40 perspective`}
                    onClick={() => {
                        console.log('Card clicked. Flipping state:', !flipped);
                        setFlipped(!flipped);
                    }}
                >
                    <div
                        className={`absolute w-full h-full transition-transform duration-500 ${
                            flipped ? 'rotate-y-180' : ''
                        }`}
                    >
                        <div className="absolute w-full h-full bg-blue-500 text-white flex justify-center items-center backface-hidden rounded">
                            <p className="text-lg font-bold">Click to Flip</p>
                        </div>
                        <div className="absolute w-full h-full bg-white text-black flex justify-center items-center backface-hidden rotate-y-180 rounded">
                            {!flipped ? (
                                current.facts.map((fact, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(fact)}
                                        className="block bg-gray-200 border p-4 rounded m-2 hover:bg-gray-300"
                                    >
                                        {fact.text}
                                    </button>
                                ))
                            ) : (
                                <div>
                                    <h3 className="text-xl mb-2">
                                        {wasCorrect ? '✅ Correct!' : '❌ Nope, that one was true.'}
                                    </h3>
                                    <button
                                        onClick={next}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
