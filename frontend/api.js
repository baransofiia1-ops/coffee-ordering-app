const API_URL = "http://localhost:3001/api/menu";

export async function getMenu() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Помилка отримання меню");
    return response.json();
}