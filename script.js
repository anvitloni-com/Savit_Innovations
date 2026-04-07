const products = [
    { id: 1, name: "Solid Brass Pull Handle", category: "handels", price: 450, img: "https://images.unsplash.com/photo-1623073344440-6216f9f30e9d?w=600", colors: ["Gold", "Silver", "Antique"], sizes: ["96mm", "128mm", "160mm"] },
    { id: 2, name: "Modern Round Knob", category: "knobs", price: 120, img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600", colors: ["Matte Black", "Brushed Silver"], sizes: ["25mm", "30mm"] },
    { id: 3, name: "Concealed Wardrobe Handle", category: "concealed", price: 850, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600", colors: ["Satin Nickel", "Chrome"], sizes: ["150mm", "200mm"] },
    { id: 4, name: "Designer Main Door Handle", category: "handels", price: 1250, img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600", colors: ["Antique Gold", "Rose Gold"], sizes: ["250mm", "300mm"] }
];

let cart = [];
let currentCategory = 'all';

function initProducts(list = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    list.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p class="price">₹${p.price}</p>
                <div class="selectors">
                    <div class="select-group"><label>Color</label><select id="color-${p.id}">${p.colors.map(c=>`<option>${c}</option>`).join('')}</select></div>
                    <div class="select-group"><label>Size</label><select id="size-${p.id}">${p.sizes.map(s=>`<option>${s}</option>`).join('')}</select></div>
                </div>
                <div class="qty-container">
                    <button class="qty-btn" onclick="adjustQty(${p.id}, -1)">-</button>
                    <input type="number" id="qty-${p.id}" class="qty-input" value="1" min="1">
                    <button class="qty-btn" onclick="adjustQty(${p.id}, 1)">+</button>
                </div>
                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>`;
    });
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
    
    cart.push({ ...p, qty, color, size, subtotal: p.price * qty });
    updateCartUI();
    if(!document.getElementById('cart-sidebar').classList.contains('active')) toggleCart();
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
                <div><strong>${item.name}</strong><br><small>${item.color} | ${item.size} | Qty: ${item.qty}</small></div>
                <div>₹${item.subtotal} <button class="remove-btn" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button></div>
            </div>`;
    });
    document.getElementById('cart-total').innerText = total;
}

function removeItem(index) { cart.splice(index, 1); updateCartUI(); }
function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('active'); }

function setCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
}

function filterProducts() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(p => {
        const matchCat = currentCategory === 'all' || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(term);
        return matchCat && matchSearch;
    });
    initProducts(filtered);
}

function checkoutWhatsApp() {
    if(cart.length === 0) return alert("Cart is empty");
    let msg = "*ORDER FROM SAVIT INNOVATIONS*%0a%0a";
    cart.forEach((item, i) => {
        msg += `${i+1}. ${item.name}%0a- Color: ${item.color}%0a- Size: ${item.size}%0a- Qty: ${item.qty}%0a- Subtotal: ₹${item.subtotal}%0a%0a`;
    });
    msg += `*GRAND TOTAL: ₹${document.getElementById('cart-total').innerText}*`;
    window.open(`https://wa.me/919980056119?text=${msg}`);
}

window.onload = () => initProducts();
