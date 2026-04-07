const myWhatsAppNumber = "919980056119";
let shoppingCart = [];

const inventory = [
    { id: 101, name: "Designer Door Handle", price: "₹1,200" },
    { id: 102, name: "Luxury Cabinet Knob", price: "₹350" },
    { id: 103, name: "Concealed Wardrobe Pull", price: "₹1,500" },
    { id: 104, name: "Antique Finish Handle", price: "₹900" }
];

// Load products into the website
function loadProducts() {
    const grid = document.getElementById('product-display');
    inventory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <button class="btn" onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        grid.appendChild(div);
    });
}

// 1. ADD TO CART ONLY (No WhatsApp yet)
function addToCart(id) {
    const product = inventory.find(p => p.id === id);
    shoppingCart.push(product);
    updateCartNotification();
    alert(product.name + " added to cart!");
}

function updateCartNotification() {
    document.getElementById('cart-count').innerText = shoppingCart.length;
}

// 2. SHOW CART ITEMS
function openCart() {
    const modal = document.getElementById('cart-modal');
    const list = document.getElementById('cart-items-list');
    modal.style.display = "block";
    
    list.innerHTML = ""; // Clear current view
    if (shoppingCart.length === 0) {
        list.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        shoppingCart.forEach((item, index) => {
            list.innerHTML += `
                <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:10px;">
                    <span>${item.name}</span>
                    <span>${item.price}</span>
                    <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer;">Remove</button>
                </div>`;
        });
    }
    document.getElementById('cart-total-qty').innerText = shoppingCart.length;
}

function closeCart() {
    document.getElementById('cart-modal').style.display = "none";
}

function removeFromCart(index) {
    shoppingCart.splice(index, 1);
    updateCartNotification();
    openCart(); // Refresh the list
}

// 3. FINAL STEP: SEND TO WHATSAPP
function sendOrderToWhatsApp() {
    if (shoppingCart.length === 0) {
        alert("Please add items to your cart first!");
        return;
    }

    let message = "Hello Savit Innovations! I would like to place an order for:\n\n";
    shoppingCart.forEach((item, i) => {
        message += `${i + 1}. ${item.name} (${item.price})\n`;
    });
    message += `\nTotal Items: ${shoppingCart.length}\nPlease confirm availability.`;

    const url = `https://wa.me/${myWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', loadProducts);
