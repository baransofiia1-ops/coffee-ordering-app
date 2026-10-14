import { getMenu } from "./api.js";

const statusEl = document.getElementById("status");
const menuEl = document.getElementById("menu");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");
const orderBtn = document.getElementById("orderBtn");
const nameEl = document.getElementById("name");
const phoneEl = document.getElementById("phone");

let cart = [];

function setStatus(msg, type = "info") {
    statusEl.textContent = msg;
    statusEl.style.color = type === "error" ? "red" : "green";
}

async function loadMenu() {
    setStatus("Завантаження меню...");
    try {
        const items = await getMenu();
        renderMenu(items);
        setStatus("Меню завантажено", "success");
    } catch {
        setStatus("Помилка завантаження меню", "error");
    }
}

function renderMenu(items) {
    menuEl.innerHTML = "";
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "menu-item";
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Розмір: ${item.size}</p>
            <p>Ціна: ${item.price} грн</p>
            <button>Додати</button>
        `;
        div.querySelector("button").onclick = () => addToCart(item);
        menuEl.appendChild(div);
    });
}

function addToCart(item) {
    cart.push(item);
    renderCart();
}

function renderCart() {
    cartEl.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const li = document.createElement("li");
        li.textContent = `${item.name} — ${item.price} грн`;
        cartEl.appendChild(li);
    });

    totalEl.textContent = `Сума: ${total} грн`;
}

orderBtn.onclick = () => {
    if (!nameEl.value || !phoneEl.value) {
        setStatus("Заповніть імʼя та телефон", "error");
        return;
    }

    setStatus("Замовлення відправляється...");
    setTimeout(() => {
        setStatus("Замовлення прийнято! Дякуємо 💛", "success");
        cart = [];
        renderCart();
        nameEl.value = "";
        phoneEl.value = "";
    }, 1000);
};

loadMenu();