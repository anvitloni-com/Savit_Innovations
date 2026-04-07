let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Change quantity buttons
function changeQty(button, amount) {
    let container = button.parentElement;
    let qtySpan = container.querySelector(".qty");

    let qty = parseInt(qtySpan.innerText);
    qty += amount;

    if (qty < 1) qty = 1;

    qtySpan.innerText = qty;
}

// Add to cart with options + quantity
anvitloni-com.github.io/savit-innovations/
function displayCart() {
    let list = document.getElementById("cart-items");
    let total = 0;

    list.innerHTML = "";

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;

        let li = document.createElement("li");

        li.innerHTML = `
            ${item.name} (${item.color}, ${item.size}) 
            - ₹${item.price} × ${item.quantity} = ₹${itemTotal}
            <button onclick="removeItem(${index})">❌</button>
        `;

        list.appendChild(li);
        total += itemTotal;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}
function removeItem(index) {
    cart.splice(index, 1);   // remove item
    saveCart();              // update storage
    displayCart();           // refresh UI
}

// Checkout
function checkout() {
    let message = "I want to order:\n";

    cart.forEach(item => {
        message +=
            item.name +
            " (" + item.color + ", " + item.size + ")" +
            " x" + item.qty +
            " - ₹" + (item.price * item.qty) + "\n";
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
function changeQty(id, change) {
    let el = document.getElementById(id);
    let qty = Number(el.innerText);

    qty += change;
    if (qty < 1) qty = 1;

    el.innerText = qty;
}

// Load cart on start
window.onload = function () {
    displayCart();
};
