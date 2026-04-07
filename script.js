let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// CHANGE QTY
function changeQty(id, change) {
    let el = document.getElementById(id);
    let qty = Number(el.innerText);

    qty += change;
    if (qty < 1) qty = 1;

    el.innerText = qty;
}

// ADD TO CART (FIXED)
function addToCart(name, price, qtyId, colorId, sizeId) {

    let qtyEl = document.getElementById(qtyId);
    let colorEl = document.getElementById(colorId);
    let sizeEl = document.getElementById(sizeId);

    if (!qtyEl || !colorEl || !sizeEl) {
        alert("Error: IDs not found");
        return;
    }

    let quantity = Number(qtyEl.innerText);
    let color = colorEl.value;
    let size = sizeEl.value;

    cart.push({
        name: name,
        price: Number(price),
        quantity: quantity,
        color: color,
        size: size
    });

    saveCart();
    displayCart();
}

// DISPLAY CART
function displayCart() {
    let list = document.getElementById("cart-items");
    let total = 0;

    if (!list) return;

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

// REMOVE
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// LOAD
window.onload = displayCart;
