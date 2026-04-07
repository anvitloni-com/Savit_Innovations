const products = [
    { id: 1, name: "Premium Brass Handle", price: 450, img: "https://images.unsplash.com/photo-1623073344440-6216f9f30e9d?auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Modern Black Knob", price: 120, img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=60" },
    { id: 3, name: "Concealed Sliding Handle", price: 850, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=60" },
    { id: 4, name: "Luxury Gold Cabinet Knob", price: 300, img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=60" }
];

let cart = [];

// Initialize Products on Page
function initProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; // Clear grid first
    products.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>₹${p.price}</p>
                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    // We use spread to create a unique instance so we can remove by index later
    cart.push({...product}); 
    updateCart();
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1); // Removes the specific item at that position
    updateCart();
}

// Update Cart UI
function updateCart() {
    const countElement = document.getElementById('cart-count');
    const itemsDiv = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    countElement.innerText = cart.length;
    itemsDiv.innerHTML = '';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        itemsDiv.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">₹${item.price}</span>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });
    
    totalElement.innerText = total;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

// WhatsApp Checkout
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    let message = "Hello Savit Innovations! I would like to order:%0a%0a";
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ₹${item.price}%0a`;
    });
    message += `%0a*Total Amount: ₹${document.getElementById('cart-total').innerText}*`;
    
    const whatsappURL = `https://wa.me/919980056119?text=${message}`;
    window.open(whatsappURL, '_blank');
}

initProducts();
