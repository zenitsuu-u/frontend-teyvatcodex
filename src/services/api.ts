export const getCharacters = async () => {
    const res = await fetch("http://localhost:3000/characters");
    return res.json();
};