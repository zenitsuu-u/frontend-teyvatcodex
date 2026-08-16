export const getCharacters = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/characters`);
    return res.json();
};