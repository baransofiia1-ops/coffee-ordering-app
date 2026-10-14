const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Тимчасові дані меню (поки немає MongoDB)
const menu = [
    { id: 1, name: "Лате", size: "Medium", price: 4.5 },
    { id: 2, name: "Капучино", size: "Medium", price: 4.0 },
    { id: 3, name: "Американо", size: "Large", price: 3.0 },
    { id: 4, name: "Мокачино", size: "Medium", price: 5.0 }
];

// Головний маршрут меню
app.get("/api/menu", (req, res) => {
    res.json(menu);
});

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});