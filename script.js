let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// CHANGE QUANTITY
function changeQty(id, change) {
    let el = document.getElementById(id);
    let qty = Number(el.innerText);

    qty += change;
    if (qty < 1) qty = 1;

    el.innerText = qty;
}

// ADD TO CART
function addToCart(name, price, qtyId, colorId, sizeId) {

    let quantity = Number(document.getElementById(qtyId).innerText);
    let color = document.getElementById(colorId).value;
    let size = document.getElementById(sizeId).value;

    let item = { name, price, quantity, color, size };

    cart.push(item);

    saveCart();
    displayCart();
}

// DISPLAY CART
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

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// CHECKOUT
function checkout() {
    let message = "Order:\n";

    cart.forEach(item => {
        message += `${item.name} (${item.color}, ${item.size}) x ${item.quantity}\n`;
    });

    let url = "https://wa.me/919XXXXXXXXX?text=" + encodeURIComponent(message);
    window.open(url);
}

// LOAD ON START
window.onload = displayCart;
