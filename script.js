const products = [
    { id: 1, name: "Premium Brass Handle", price: 450, img: "https://images.unsplash.com/photo-1623073344440-6216f9f30e9d?auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Modern Black Knob", price: 120, img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=60" },
    { id: 3, name: "Concealed Sliding Handle", price: 850, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=60" },
    { id: 4, name: "Luxury Gold Cabinet Knob", price: 300, img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=60" }
];

let cart = [];

function initProducts() {
    const grid = document.getElementById('product-grid');
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

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsDiv = document.getElementById('cart-items');
    let total = 0;
    itemsDiv.innerHTML = '';
    
    cart.forEach((item, index) => {
        total += item.price;
        itemsDiv.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>${item.name}</span>
                <span>₹${item.price}</span>
            </div>
        `;
    });
    document.getElementById('cart-total').innerText = total;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Your cart is empty!");
    
    let message = "Hello Savit Innovations! I want to place an order:%0a%0a";
    cart.forEach(item => {
        message += `- ${item.name} (₹${item.price})%0a`;
    });
    message += `%0a*Total: ₹${document.getElementById('cart-total').innerText}*`;
    
    const whatsappURL = `https://wa.me/919980056119?text=${message}`;
    window.open(whatsappURL, '_blank');
}

initProducts();
