// Ensure this matches your actual WhatsApp number
const myWhatsAppNumber = "919980056119";
let shoppingCart = [];

// Function to open the cart (Adds the 'open' class)
function openCart() {
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('active');
    renderCartItems();
}

// Function to close the cart
function closeCart() {
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('active');
}

function addToCart(id) {
    const product = inventory.find(p => p.id === id);
    shoppingCart.push(product);
    document.getElementById('cart-count').innerText = shoppingCart.length;
    
    // Optional: Open cart automatically when item is added
    openCart();
}

function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = "";
    
    if (shoppingCart.length === 0) {
        list.innerHTML = "<p style='text-align:center;'>Your Savit Innovations cart is empty.</p>";
    } else {
        shoppingCart.forEach((item, index) => {
            list.innerHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <div>
                        <strong style="display:block;">${item.name}</strong>
                        <span style="color:#555;">${item.price}</span>
                    </div>
                    <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">Remove</button>
                </div>
            `;
        });
    }
    document.getElementById('cart-total-qty').innerText = shoppingCart.length + " items";
}

function removeFromCart(index) {
    shoppingCart.splice(index, 1);
    document.getElementById('cart-count').innerText = shoppingCart.length;
    renderCartItems();
}

function sendOrderToWhatsApp() {
    if (shoppingCart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    
    let message = "New Order from Savit Innovations Website:\n\n";
    shoppingCart.forEach((item, i) => {
        message += `${i + 1}. ${item.name} - ${item.price}\n`;
    });
    
    const url = `https://wa.me/${myWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
