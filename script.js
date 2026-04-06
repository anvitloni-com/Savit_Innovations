// Load cart from browser storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to storage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item
function addToCartWithOptions(button, name, price) {
    let product = button.parentElement;

    let color = product.querySelector(".color").value;
    let size = product.querySelector(".size").value;
    let qty = parseInt(product.querySelector(".qty").innerText);

    if (!color || !size) {
        alert("Please select color and size");
        return;
    }

    let itemName = name + " (" + color + ", " + size + ")";
    
    // Save quantity separately
    cart.push({
        name: itemName,
        price: price,
        qty: qty
    });

    saveCart();
    displayCart();
}



// Display cart
function displayCart() {
    let list = document.getElementById("cart-items");
    let total = 0;

    list.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");

        let itemTotal = item.price * item.qty;

        li.innerText = item.name + " x" + item.qty + " - ₹" + itemTotal;

        list.appendChild(li);
        total += itemTotal;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

// Checkout
function checkout() {
    let message = "I want to order:\n";

    cart.forEach(item => {
        message += item.name + " - ₹" + item.price + "\n";
    });

    let url = "https://wa.me/919XXXXXXXXX?text=" + encodeURIComponent(message);
    window.open(url);
}

// Search
function searchProducts() {
    let input = document.getElementById("search").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(p => {
        let name = p.innerText.toLowerCase();
        p.style.display = name.includes(input) ? "block" : "none";
    });
}

// Filter
function filterCategory(category) {
    let products = document.querySelectorAll(".product");

    products.forEach(p => {
        if (category === "all" || p.dataset.category === category) {
            p.style.display = "block";
        } else {
            p.style.display = "none";
        }
    });
}

// Load cart when page opens
window.onload = function() {
    displayCart();
};
function addToCartWithOptions(button, name, price) {
    let product = button.parentElement;

    let color = product.querySelector(".color").value;
    let size = product.querySelector(".size").value;

    if (!color || !size) {
        alert("Please select color and size");
        return;
    }

    let itemName = name + " (" + color + ", " + size + ")";
    cart.push({name: itemName, price});

    saveCart();
    displayCart();
}
function changeQty(button, amount) {
    let container = button.parentElement;
    let qtySpan = container.querySelector(".qty");

    let qty = parseInt(qtySpan.innerText);
    qty += amount;

    if (qty < 1) qty = 1;

    qtySpan.innerText = qty;
}
