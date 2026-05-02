const products = [
    { 
        id: "AH-001", 
        name: "Architectural Handle AH-001", 
        category: "handels", 
        img: "https://images.unsplash.com/photo-1623073344440-6216f9f30e9d?w=600",
        colorOptions: ["RG-BS", "SATIN ROSE-GOLD", "BLACK-SATIN"],
        sizeOptions: ["96mm", "160mm", "224mm", "288mm"],
        variants: [
            { color: "RG-BS", size: "96mm", price: 500 },
            { color: "RG-BS", size: "160mm", price: 650 },
            { color: "SATIN ROSE-GOLD", size: "96mm", price: 700 },
            { color: "BLACK-SATIN", size: "224mm", price: 950 }
        ]
    },
    { 
        id: "AH-002", 
        name: "Modern Knob AH-002", 
        category: "knobs", 
        img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600",
        colorOptions: ["Chrome", "Gold"],
        sizeOptions: ["25mm", "30mm"],
        variants: [
            { color: "Chrome", size: "25mm", price: 150 },
            { color: "Gold", size: "25mm", price: 200 }
        ]
    },
    { 
        id: "CH-001", 
        name: "Concealed Handle CH-001", 
        category: "concealed", 
        img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600",
        colorOptions: ["Silver", "Black"],
        sizeOptions: ["128mm", "160mm"],
        variants: [
            { color: "Silver", size: "128mm", price: 400 },
            { color: "Black", size: "128mm", price: 450 }
        ]
    }
];

let cart = [];
let currentCategory = 'all';

function initProducts(list = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    list.forEach(p => {
        const defaultPrice = p.variants[0].price;
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.id}</h3>
                <p class="price">₹<span id="display-price-${p.id}">${defaultPrice}</span></p>
                <div class="selectors">
                    <div class="select-group">
                        <label>Finish</label>
                        <select id="color-${p.id}" onchange="updateVariantPrice('${p.id}')">
                            ${p.colorOptions.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>
                    <div class="select-group">
                        <label>Size</label>
                        <select id="size-${p.id}" onchange="updateVariantPrice('${p.id}')">
                            ${p.sizeOptions.map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="qty-container">
                    <button class="qty-btn" onclick="adjustQty('${p.id}', -1)">-</button>
                    <input type="number" id="qty-${p.id}" class="qty-input" value="1" min="1">
                    <button class="qty-btn" onclick="adjustQty('${p.id}', 1)">+</button>
                </div>
                <button class="add-btn" onclick="addToCart('${p.id}')">Add to Cart</button>
            </div>`;
    });
}

function setCategory(cat, btn) {
    currentCategory = cat;
    // Update UI for buttons
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
}

function filterProducts() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(p => {
        const matchCat = currentCategory === 'all' || p.category === currentCategory;
        const matchSearch = p.id.toLowerCase().includes(term) || p.name.toLowerCase().includes(term);
        return matchCat && matchSearch;
    });
    initProducts(filtered);
}

// ... Rest of the functions (updateVariantPrice, addToCart, updateCartUI, checkoutWhatsApp) ...
// (Make sure to include all functions from the previous script.js version)

function updateVariantPrice(pId) {
    const p = products.find(x => x.id === pId);
    const color = document.getElementById(`color-${pId}`).value;
    const size = document.getElementById(`size-${pId}`).value;
    const variant = p.variants.find(v => v.color === color && v.size === size);
    document.getElementById(`display-price-${pId}`).innerText = variant ? variant.price : "N/A";
}

function adjustQty(id, change) {
    let input = document.getElementById(`qty-${id}`);
    let val = parseInt(input.value) + change;
    if(val >= 1) input.value = val;
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    const qty = parseInt(document.getElementById(`qty-${id}`).value);
    const color = document.getElementById(`color-${id}`).value;
    const size = document.getElementById(`size-${id}`).value;
    const variant = p.variants.find(v => v.color === color && v.size === size);
    const price = variant ? variant.price : 0;
    cart.push({ id, name: p.name, qty, color, size, price, subtotal: price * qty });
    updateCartUI();
    document.getElementById('cart-sidebar').classList.add('active');
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsDiv = document.getElementById('cart-items');
    let total = 0;
    itemsDiv.innerHTML = '';
    cart.forEach((item, index) => {
        total += item.subtotal;
        itemsDiv.innerHTML += `<div class="cart-item"><div><strong>${item.id}</strong><br><small>${item.color} | ${item.size}</small></div><div>₹${item.subtotal}</div></div>`;
    });
    document.getElementById('cart-total').innerText = total;
}

function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('active'); }

function checkoutWhatsApp() {
    if(cart.length === 0) return alert("Cart is empty");
    let msg = "*ORDER FROM SAVIT INNOVATIONS*%0a%0a";
    cart.forEach((item, i) => { msg += `${i+1}. *${item.id}*%0a- Finish: ${item.color}%0a- Size: ${item.size}%0a- Qty: ${item.qty}%0a- Price: ₹${item.subtotal}%0a%0a`; });
    msg += `*GRAND TOTAL: ₹${document.getElementById('cart-total').innerText}*`;
    window.open(`https://wa.me/919980056119?text=${msg}`);
}

window.onload = () => initProducts();
