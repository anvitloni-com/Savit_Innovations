const WHATSAPP_NUMBER = "919980056119";
const CART_KEY = "savit_cart_v1";
const PLACEHOLDER_IMG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='#eee'/><text x='50%' y='50%' fill='#999' font-family='sans-serif' font-size='18' text-anchor='middle'>Image coming soon</text></svg>"
    );

/*
  HOW TO EDIT PRODUCTS
  - Finish and size dropdowns are built automatically from "variants".
  - Leave price as "" if not decided yet: the card will show "Price on request"
    and the button becomes "Enquire on WhatsApp".
  - category must be one of: "handles", "knobs", "concealed".
  - TIP: rename image files without spaces/brackets (e.g. ah-001-cp-satin.jpg).
*/
const products = [
    {
        id: "AH-001",
        category: "handles",
        img: "AH 001 CP SATIN (1).jpg",
        variants: [
            { color: "CP-SATIN", size: "96mm",  price: "219" },
            { color: "CP-SATIN", size: "160mm", price: "213" },
            { color: "CP-SATIN", size: "224mm", price: "457" },
            { color: "CP-SATIN", size: "288mm", price: "67" },
            { color: "RG-BS",    size: "96mm",  price: "76" },
            { color: "RG-BS",    size: "160mm", price: "" },
            { color: "RG-BS",    size: "224mm", price: "" },
            { color: "RG-BS",    size: "288mm", price: "" }
        ]
    },
    {
        id: "AH-006",
        category: "handles",
        img: "AH 006  (1).png",
        variants: [
            { color: "Satin",     size: "96mm", price: "" },
            { color: "Rose Gold", size: "96mm", price: "" },
            { color: "Titanium",  size: "96mm", price: "" },
            { color: "Chrome",    size: "96mm", price: "" }
        ]
    },
    {
        id: "AH-009",
        category: "handles",
        img: "AH 009 GOLD-BLACK (1).jpg",
        variants: [
            { color: "GOLD-BLACK", size: "96mm",  price: "" },
            { color: "GOLD-BLACK", size: "160mm", price: "" },
            { color: "GOLD-BLACK", size: "224mm", price: "" },
            { color: "GOLD-BLACK", size: "288mm", price: "" },
            { color: "RG-BS",      size: "96mm",  price: "" },
            { color: "RG-BS",      size: "160mm", price: "" },
            { color: "RG-BS",      size: "224mm", price: "" },
            { color: "RG-BS",      size: "288mm", price: "" }
        ]
    },
    {
        id: "AH-018",
        category: "handles",
        img: "AH 018 CHOCO BS (1).jpg",
        variants: [
            { color: "CHOCO-BS",   size: "96mm",  price: "" },
            { color: "CHOCO-BS",   size: "160mm", price: "" },
            { color: "CHOCO-BS",   size: "224mm", price: "" },
            { color: "CHOCO-BS",   size: "288mm", price: "" },
            { color: "GOLD-BLACK", size: "96mm",  price: "" },
            { color: "GOLD-BLACK", size: "160mm", price: "" },
            { color: "GOLD-BLACK", size: "224mm", price: "" },
            { color: "GOLD-BLACK", size: "288mm", price: "" }
        ]
    },
    {
        id: "AH-024",
        category: "handles",
        img: "AH 024 CP (1).jpg",
        variants: [
            { color: "CP",        size: "96mm",  price: "" },
            { color: "CP",        size: "160mm", price: "" },
            { color: "SATIN",     size: "96mm",  price: "" },
            { color: "SATIN",     size: "160mm", price: "" },
            { color: "ROSE-GOLD", size: "96mm",  price: "" },
            { color: "ROSE-GOLD", size: "288mm", price: "" }
        ]
    }
];

let cart = loadCart();
let currentCategory = "all";

/* ---------- helpers ---------- */
const $ = (id) => document.getElementById(id);
const fmt = (n) => Number(n).toLocaleString("en-IN");
const uniq = (arr) => [...new Set(arr)];
const hasPrice = (v) => v && v.price !== "" && !isNaN(parseFloat(v.price));

function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch (e) {
        return [];
    }
}

function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage unavailable */ }
}

function getSelection(pId) {
    const p = products.find((x) => x.id === pId);
    const color = $(`color-${pId}`).value;
    const size = $(`size-${pId}`).value;
    const variant = p.variants.find((v) => v.color === color && v.size === size);
    return { p, color, size, variant };
}

/* ---------- product grid ---------- */
function initProducts(list = products) {
    const grid = $("product-grid");
    $("empty-msg").hidden = list.length > 0;

    grid.innerHTML = list.map((p) => {
        const colors = uniq(p.variants.map((v) => v.color));
        const firstColor = colors[0];
        const sizes = uniq(p.variants.filter((v) => v.color === firstColor).map((v) => v.size));
        return `
            <div class="product-card">
                <div class="sale-badge">55% OFF</div>
                <img src="${encodeURI(p.img)}" alt="${escapeHTML(p.name)}" loading="lazy"
                     onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}'">
                <h3>${p.id}</h3>
                <p class="product-name">${escapeHTML(p.name)}</p>
                <p class="price" id="price-wrap-${p.id}"></p>
                <div class="selectors">
                    <div class="select-group">
                        <label for="color-${p.id}">Finish</label>
                        <select id="color-${p.id}" onchange="onColorChange('${p.id}')">
                            ${colors.map((c) => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("")}
                        </select>
                    </div>
                    <div class="select-group">
                        <label for="size-${p.id}">Size</label>
                        <select id="size-${p.id}" onchange="updateVariantPrice('${p.id}')">
                            ${sizes.map((s) => `<option value="${s}">${s}</option>`).join("")}
                        </select>
                    </div>
                </div>
                <div class="qty-container">
                    <button class="qty-btn" onclick="adjustQty('${p.id}', -1)" aria-label="Decrease quantity">-</button>
                    <input type="number" id="qty-${p.id}" class="qty-input" value="1" min="1" max="999" onchange="sanitizeQty('${p.id}')">
                    <button class="qty-btn" onclick="adjustQty('${p.id}', 1)" aria-label="Increase quantity">+</button>
                </div>
                <button class="add-btn" id="add-btn-${p.id}" onclick="addToCart('${p.id}')">Add to Cart</button>
            </div>`;
    }).join("");

    list.forEach((p) => updateVariantPrice(p.id));
}

// Only show sizes that exist for the chosen finish
function onColorChange(pId) {
    const p = products.find((x) => x.id === pId);
    const color = $(`color-${pId}`).value;
    const sizeSelect = $(`size-${pId}`);
    const previous = sizeSelect.value;
    const sizes = uniq(p.variants.filter((v) => v.color === color).map((v) => v.size));
    sizeSelect.innerHTML = sizes.map((s) => `<option value="${s}">${s}</option>`).join("");
    if (sizes.includes(previous)) sizeSelect.value = previous;
    updateVariantPrice(pId);
}

function updateVariantPrice(pId) {
    const { variant } = getSelection(pId);
    const priceEl = $(`price-wrap-${pId}`);
    const btn = $(`add-btn-${pId}`);
    if (hasPrice(variant)) {
        priceEl.innerHTML = `₹<span id="display-price-${pId}">${fmt(variant.price)}</span>`;
        btn.textContent = "Add to Cart";
        btn.classList.remove("enquire");
    } else {
        priceEl.innerHTML = `<span class="price-pending">Price on request</span>`;
        btn.textContent = "Enquire on WhatsApp";
        btn.classList.add("enquire");
    }
}

function sanitizeQty(id) {
    const input = $(`qty-${id}`);
    let val = parseInt(input.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    input.value = Math.min(val, 999);
}

function adjustQty(id, change) {
    const input = $(`qty-${id}`);
    input.value = (parseInt(input.value, 10) || 1) + change;
    sanitizeQty(id);
}

/* ---------- cart ---------- */
function addToCart(id) {
    sanitizeQty(id);
    const { p, color, size, variant } = getSelection(id);
    const qty = parseInt($(`qty-${id}`).value, 10);

    // No price yet: send an enquiry instead of adding to cart
    if (!hasPrice(variant)) {
        const text = `Hello Savit Innovations, please share the price for:\n${p.id} - ${p.name}\nFinish: ${color}\nSize: ${size}\nQty: ${qty}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
        return;
    }

    const price = parseFloat(variant.price);
    const existing = cart.find((i) => i.id === id && i.color === color && i.size === size);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id, name: p.name, qty, color, size, price });
    }
    updateCartUI();
    openCart();
}

function changeCartQty(index, change) {
    const item = cart[index];
    if (!item) return;
    item.qty += change;
    if (item.qty < 1) cart.splice(index, 1);
    updateCartUI();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function cartTotal() {
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function updateCartUI() {
    saveCart();
    $("cart-count").innerText = cart.reduce((n, i) => n + i.qty, 0);
    const itemsDiv = $("cart-items");

    if (cart.length === 0) {
        itemsDiv.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
    } else {
        itemsDiv.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div>
                    <strong>${item.id}</strong><br>
                    <small>${escapeHTML(item.color)} | ${item.size} | ₹${fmt(item.price)} each</small>
                    <div class="cart-qty">
                        <button onclick="changeCartQty(${index}, -1)" aria-label="Decrease">-</button>
                        <span>${item.qty}</span>
                        <button onclick="changeCartQty(${index}, 1)" aria-label="Increase">+</button>
                    </div>
                </div>
                <div class="cart-item-right">
                    ₹${fmt(item.price * item.qty)}
                    <i class="fas fa-trash remove-btn" onclick="removeItem(${index})" role="button" aria-label="Remove item"></i>
                </div>
            </div>`).join("");
    }
    $("cart-total").innerText = fmt(cartTotal());
}

function openCart() {
    $("cart-sidebar").classList.add("active");
    $("cart-overlay").classList.add("active");
}

function closeCart() {
    $("cart-sidebar").classList.remove("active");
    $("cart-overlay").classList.remove("active");
}

function toggleCart() {
    $("cart-sidebar").classList.contains("active") ? closeCart() : openCart();
}

document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

/* ---------- search & filter ---------- */
function setCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterProducts();
}

function filterProducts() {
    const term = $("search-input").value.trim().toLowerCase();
    const filtered = products.filter((p) => {
        const matchCat = currentCategory === "all" || p.category === currentCategory;
        const matchSearch = p.id.toLowerCase().includes(term) || p.name.toLowerCase().includes(term);
        return matchCat && matchSearch;
    });
    initProducts(filtered);
}

/* ---------- checkout ---------- */
function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Your cart is empty.");
    let msg = "*ORDER FROM SAVIT INNOVATIONS*\n\n";
    cart.forEach((item, i) => {
        msg += `${i + 1}. *${item.id}*\n- Finish: ${item.color}\n- Size: ${item.size}\n- Qty: ${item.qty}\n- Rate: ₹${fmt(item.price)}\n- Total: ₹${fmt(item.price * item.qty)}\n\n`;
    });
    msg += `*GRAND TOTAL: ₹${fmt(cartTotal())}*`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

window.onload = () => {
    $("year").textContent = new Date().getFullYear();
    initProducts();
    updateCartUI();
};
