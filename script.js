const myNumber = "919980056119";
let cart = [];

const products = [
    { id: 1, name: "Modern Brass Handle", price: "₹950" },
    { id: 2, name: "Matte Black Knob", price: "₹450" },
    { id: 3, name: "Concealed Wardrobe Handle", price: "₹1200" },
    { id: 4, name: "Polished Chrome Pull", price: "₹800" }
];

// 1. Display Products on Page
function displayProducts() {
    const grid = document.getElementById('product-display');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

// 2. Add Item to Cart Array
function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    cart.push(item);
    updateCartUI();
}

// 3. Update Cart Count and List
function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('total-items').innerText = cart.length;
    
    const list = document.getElementById('cart-items-list');
    list.innerHTML = ""; // Clear list
    
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price}</span>
            <button onclick="removeItem(${index})" style="color:red; border:none; background:none; cursor:pointer;">Remove</button>
        `;
        list.appendChild(div);
    });
}

// 4. Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 5. Open/Close Modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === "block") ? "none" : "block";
}

// 6. Checkout: Generate WhatsApp Message
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let itemNames = cart.map(item => `- ${item.name} (${item.price})`).join('\n');
    const message = `Hello Savit Innovations, I would like to order:\n\n${itemNames}\n\nTotal Items: ${cart.length}`;
    
    const whatsappUrl = `https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', displayProducts);
