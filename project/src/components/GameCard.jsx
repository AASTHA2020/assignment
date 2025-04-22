function GameCard(key) {
    const [points, setPoints] = useState({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(key)) || {};
        setPoints(data);
    }, []);

    const updatePoints = (newPoints) => {
        setPoints(newPoints);
        localStorage.setItem(key, JSON.stringify(newPoints));
    };

    return [points, updatePoints];
}
