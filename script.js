let cart = [];

function addToCart(name, price) {
    cart.push({name, price});
    displayCart();
}

function displayCart() {
    let list = document.getElementById("cart-items");
    let total = 0;

    list.innerHTML = "";

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item.name + " - ₹" + item.price;
        list.appendChild(li);
        total += item.price;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

function checkout() {
    let message = "I want to order:\n";

    cart.forEach(item => {
        message += item.name + " - ₹" + item.price + "\n";
    });

    let url = "https://wa.me/919XXXXXXXXX?text=" + encodeURIComponent(message);
    window.open(url);
}

function searchProducts() {
    let input = document.getElementById("search").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(p => {
        let name = p.innerText.toLowerCase();
        p.style.display = name.includes(input) ? "block" : "none";
    });
}

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
