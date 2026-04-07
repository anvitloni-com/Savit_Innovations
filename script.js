const myWhatsApp = "919980056119";
let cart = [];

// Your Product Database
const inventory = [
    { id: 1, name: "Savit Modern Brass Handle", price: 1250 },
    { id: 2, name: "Concealed Wardrobe Pull", price: 1800 },
    { id: 3, name: "Matte Black Designer Knob", price: 450 },
    { id: 4, name: "Polished Chrome Lever", price: 950 },
    { id: 5, name: "Antique Finish Main Door Handle", price: 2500 }
];

// Initialize Website
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-display');
    inventory.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p class="price">₹${item.price}</p>
            <button class="btn-add" onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
});

// Cart Functions
function addToCart(id) {
    const product = inventory.find(p => p.id === id);
    cart.push(product);
    updateCartDisplay();
    // Quick visual feedback
    document.getElementById('live-cart').scrollIntoView({ behavior: 'smooth' });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function updateCartDisplay() {
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('cart-empty-msg');
    const summary = document.getElementById('cart-summary');
    const countBadge = document.getElementById('cart-count');
    const totalSpan = document.getElementById('total-amount');

    countBadge.innerText = cart.length;
    container.innerHTML = "";
    
    if (cart.length === 0) {
        emptyMsg.style.display = "block";
        summary.style.display = "none";
    } else {
        emptyMsg.style.display = "none";
        summary.style.display = "block";
        
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            container.innerHTML += `
                <div class="cart-item-row">
                    <span><strong>${item.name}</strong></span>
                    <span>₹${item.price} <button class="remove-btn" onclick="removeFromCart(${index})">| Remove</button></span>
                </div>
            `;
        });
        totalSpan.innerText = total;
    }
}

// WhatsApp Checkout
function sendOrderToWhatsApp() {
    if (cart.length === 0) return;

    let total = document.getElementById('total-amount').innerText;
    let message = "Hello Savit Innovations! I want to place an order for:\n\n";
    
    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.name} - ₹${item.price}\n`;
    });
    
    message += `\n*Grand Total: ₹${total}*`;
    message += `\nPlease let me know the delivery timeframe.`;

    const url = `https://wa.me/${myWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
