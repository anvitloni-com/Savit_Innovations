const products = [
    { id: 1, name: "Premium Brass Handle", category: "handels", price: 450, img: "https://images.unsplash.com/photo-1623073344440-6216f9f30e9d?auto=format&fit=crop&w=500&q=60", colors: ["Gold", "Silver", "Antique"], sizes: ["96mm", "128mm"] },
    { id: 2, name: "Modern Black Knob", category: "knobs", price: 120, img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=60", colors: ["Matte Black", "Grey"], sizes: ["25mm", "30mm"] },
    { id: 3, name: "Concealed Handle", category: "concealed", price: 850, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=60", colors: ["Satin Nickel", "Chrome"], sizes: ["150mm", "200mm"] }
];

let currentCategory = 'all';
let cart = [];

function initProducts(filterList = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    filterList.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p class="price">₹${p.price}</p>
                <div class="selectors">
                    <div class="select-group"><label>Color:</label><select id="color-${p.id}">${p.colors.map(c=>`<option>${c}</option>`).join('')}</select></div>
                    <div class="select-group"><label>Size:</label><select id="size-${p.id}">${p.sizes.map(s=>`<option>${s}</option>`).join('')}</select></div>
                </div>
                <div class="qty-container">
                    <button class="qty-btn" onclick="updateQtyUI(${p.id}, -1)">-</button>
                    <input type="number" id="qty-${p.id}" class="qty-input" value="1" min="1">
                    <button class="qty-btn" onclick="updateQtyUI(${p.id}, 1)">+</button>
                </div>
                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>`;
    });
}

function updateQtyUI(id, change) {
    const input = document.getElementById(`qty-${id}`);
    let val = parseInt(input.value) + change;
    if (val < 1) val = 1;
    input.value = val;
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const color = document.getElementById(`color-${id}`).value;
    const size = document.getElementById(`size-${id}`).value;
    const qty = parseInt(document.getElementById(`qty-${id}`).value);

    const item = { ...product, chosenColor: color, chosenSize: size, quantity: qty, subtotal: product.price * qty };
    cart.push(item);
    updateCart();
    toggleCart(); // Show cart when item added
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsDiv = document.getElementById('cart-items');
    let total = 0;
    itemsDiv.innerHTML = '';
    
    cart.forEach((item, index) => {
        total += item.subtotal;
        itemsDiv.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.chosenColor} | ${item.chosenSize} | Qty: ${item.quantity}</small><br>
                    <span>₹${item.subtotal}</span>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
            </div>`;
    });
    document.getElementById('cart-total').innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('active'); }

function filterProducts() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(p => (p.name.toLowerCase().includes(term) || p.category.includes(term)) && (currentCategory === 'all' || p.category === currentCategory));
    initProducts(filtered);
}

function setCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Cart is empty!");
    let msg = "*Order from Savit Innovations*%0a%0a";
    cart.forEach((item, i) => {
        msg += `*${i+1}. ${item.name}*%0a- Color: ${item.chosenColor}%0a- Size: ${item.chosenSize}%0a- Qty: ${item.quantity}%0a- Price: ₹${item.subtotal}%0a%0a`;
    });
    msg += `*Grand Total: ₹${document.getElementById('cart-total').innerText}*`;
    window.open(`https://wa.me/919980056119?text=${msg}`, '_blank');
}

initProducts();
