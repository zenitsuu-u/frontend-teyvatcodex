export async function toggleFavorite(token: string, type: string, target_id: string, isFav: boolean) {
    if (!token) return;

    if (isFav) {
        await fetch(`http://localhost:3000/favorites/${target_id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
    } else {
        await fetch("http://localhost:3000/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ type, target_id })
        });
    }
}