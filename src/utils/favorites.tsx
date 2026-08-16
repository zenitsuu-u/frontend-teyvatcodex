export async function toggleFavorite(token: string, type: string, target_id: string, isFav: boolean) {
    if (!token) return;

    if (isFav) {
        await fetch(`${import.meta.env.VITE_API_URL}/favorites/${target_id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
    } else {
        await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ type, target_id })
        });
    }
}