// 1. Updated Product Data with Color-Specific Pricing
const products = [
    { 
        id: 1, 
        name: "Premium Cabinet Handle", 
        category: "handels", 
        img: "https://images.unsplash.com/photo-1623073344440-6216f9f30e9d?w=600", 
        // Different prices for different colors
        colors: [
            { name: "Silver", price: 450 },
            { name: "Gold", price: 550 },
            { name: "Antique Brass", price: 600 },
            { name: "Matte Black", price: 480 }
        ], 
        sizes: ["96mm", "128mm", "160mm"] 
    },
    { 
        id: 2, 
        name: "Modern Designer Knob", 
        category: "knobs", 
        img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600", 
        colors: [
            { name: "Chrome", price: 120 },
            { name: "Rose Gold", price: 180 },
            { name: "Black", price: 140 }
        ], 
        sizes: ["25mm", "30mm"] 
    }
];

let cart = [];
let currentCategory = 'all';

// 2. Initialize Products
function initProducts(list = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    list.forEach(p => {
        // Default to the first color's price
        const defaultPrice = p.colors[0].price;

        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p class="price">₹<span id="display-price-${p.id}">${defaultPrice}</span></p>
                
                <div class="selectors">
                    <div class="select-group">
                        <label>Color</label>
                        <select id="color-${p.id}" onchange="updateDisplayedPrice(${p.id})">
                            ${p.colors.map(c => `<option value="${c.name}" data-price="${c.price}">${c.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="select-group">
                        <label>Size</label>
                        <select id="size-${p.id}">${p.sizes.map(s => `<option value="${s}">${s}</option>`).join('')}</select>
                    </div>
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

// 3. NEW FUNCTION: Updates price on screen when user clicks a different color
function updateDisplayedPrice(productId) {
    const colorSelect = document.getElementById(`color-${productId}`);
    const selectedOption = colorSelect.options[colorSelect.selectedIndex];
    const newPrice = selectedOption.getAttribute('data-price');
    
    document.getElementById(`display-price-${productId}`).innerText = newPrice;
}

function adjustQty(id, change) {
    let input = document.getElementById(`qty-${id}`);
    let val = parseInt(input.value) + change;
    if(val >= 1) input.value = val;
}

// 4. Updated Add to Cart (Captures the specific color's price)
function addToCart(id) {
    const p = products.find(x => x.id === id);
    const qty = parseInt(document.getElementById(`qty-${id}`).value);
    const colorSelect = document.getElementById(`color-${id}`);
    const colorName = colorSelect.value;
    const colorPrice = parseInt(colorSelect.options[colorSelect.selectedIndex].getAttribute('data-price'));
    const size = document.getElementById(`size-${id}`).value;
    
    cart.push({ 
        name: p.name, 
        qty, 
        color: colorName, 
        size, 
        price: colorPrice,
        subtotal: colorPrice * qty 
    });
    
    updateCartUI();
    if(!document.getElementById('cart-sidebar').classList.contains('active')) toggleCart();
}

// --- KEEP ALL OTHER FUNCTIONS (updateCartUI, toggleCart, filterProducts, etc.) THE SAME AS BEFORE ---

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
