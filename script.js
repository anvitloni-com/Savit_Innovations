const products = [
    { 
        id: "AH-001", 
        name: "Architectural Handle AH-001", 
        category: "handels", 
        img: "https://images.unsplash.com/photo-1623073344440-6216f9f30e9d?w=600",
        colorOptions: ["RG-BS", "SATIN ROSE-GOLD", "BLACK-SATIN"],
        sizeOptions: ["96mm", "160mm", "224mm", "288mm"],
        // You can set different prices for every combo here
        variants: [
            { color: "RG-BS", size: "96mm", price: 500 },
            { color: "RG-BS", size: "160mm", price: 650 },
            { color: "SATIN ROSE-GOLD", size: "96mm", price: 700 },
            { color: "SATIN ROSE-GOLD", size: "160mm", price: 850 },
            { color: "BLACK-SATIN", size: "96mm", price: 550 },
            { color: "BLACK-SATIN", size: "288mm", price: 1200 }
            // Add more as per your price list
        ]
    },
    { 
        id: "AH-002", 
        name: "Sleek Pull AH-002", 
        category: "handels", 
        img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600",
        colorOptions: ["RG-BS", "BLACK-SATIN"],
        sizeOptions: ["96mm", "160mm", "224mm"],
        variants: [
            { color: "RG-BS", size: "96mm", price: 400 },
            { color: "BLACK-SATIN", size: "96mm", price: 420 }
        ]
    }
];

let cart = [];

function initProducts(list = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    list.forEach(p => {
        const defaultPrice = p.variants[0].price;
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.id} - ${p.name}</h3>
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

function updateVariantPrice(pId) {
    const p = products.find(x => x.id === pId);
    const color = document.getElementById(`color-${pId}`).value;
    const size = document.getElementById(`size-${pId}`).value;
    const variant = p.variants.find(v => v.color === color && v.size === size);
    
    // If variant doesn't exist in your list, show "N/A" or a default
    document.getElementById(`display-price-${pId}`).innerText = variant ? variant.price : "Call for Price";
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
    toggleCart(true);
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsDiv = document.getElementById('cart-items');
    let total = 0;
    itemsDiv.innerHTML = '';
    cart.forEach((item, index) => {
        total += item.subtotal;
        itemsDiv.innerHTML += `
            <div class="cart-item">
                <div><strong>${item.id}</strong><br><small>${item.color} | ${item.size}</small></div>
                <div>₹${item.subtotal} <i class="fas fa-trash remove-btn" onclick="removeItem(${index})"></i></div>
            </div>`;
    });
    document.getElementById('cart-total').innerText = total;
}

function toggleCart(show = null) {
    const side = document.getElementById('cart-sidebar');
    if (show === true) side.classList.add('active');
    else if (show === false) side.classList.remove('active');
    else side.classList.toggle('active');
}

function removeItem(i) { cart.splice(i, 1); updateCartUI(); }

function filterProducts() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(p => p.id.toLowerCase().includes(term) || p.name.toLowerCase().includes(term));
    initProducts(filtered);
}

function checkoutWhatsApp() {
    if(cart.length === 0) return alert("Cart is empty");
    let msg = "*ORDER FROM SAVIT INNOVATIONS*%0a%0a";
    cart.forEach((item, i) => {
        msg += `${i+1}. *${item.id}* - ${item.name}%0a- Finish: ${item.color}%0a- Size: ${item.size}%0a- Qty: ${item.qty}%0a- Price: ₹${item.subtotal}%0a%0a`;
    });
    msg += `*GRAND TOTAL: ₹${document.getElementById('cart-total').innerText}*`;
    window.open(`https://wa.me/919980056119?text=${msg}`);
}

window.onload = () => initProducts();
