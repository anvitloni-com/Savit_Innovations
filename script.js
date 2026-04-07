const products = [
    { 
        id: 1, 
        name: "Premium Brass Handle", 
        price: 450, 
        img: "https://images.unsplash.com/photo-1623073344440-6216f9f30e9d?auto=format&fit=crop&w=500&q=60",
        colors: ["Gold", "Silver", "Antique", "Black"],
        sizes: ["96mm", "160mm", "224mm", "288mm"]
    },
    { 
        id: 2, 
        name: "Modern Black Knob", 
        price: 120, 
        img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=60",
        colors: ["Matte Black", "Glossy Black", "Grey", "White"],
        sizes: ["96mm", "160mm", "224mm", "288mm"]
    },
    { 
        id: 3, 
        name: "Concealed Sliding Handle", 
        price: 850, 
        img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=60",
        colors: ["Satin Nickel", "Chrome", "Bronze", "Graphite"],
        sizes: ["96mm", "160mm", "224mm", "288mm"]
    },
    { 
        id: 4, 
        name: "Luxury Gold Cabinet Knob", 
        price: 300, 
        img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=60",
        colors: ["Rose Gold", "Polished Gold", "Champagne", "Brushed Brass"],
        sizes: ["96mm", "160mm", "224mm", "288mm"]
    }
];

let cart = [];

function initProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    products.forEach(p => {
        // Generate Color Options
        let colorOptions = p.colors.map(c => `<option value="${c}">${c}</option>`).join('');
        // Generate Size Options
        let sizeOptions = p.sizes.map(s => `<option value="${s}">${s}</option>`).join('');

        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">₹${p.price}</p>
                
                <div class="selectors">
                    <div class="select-group">
                        <label>Color:</label>
                        <select id="color-${p.id}">${colorOptions}</select>
                    </div>
                    <div class="select-group">
                        <label>Size:</label>
                        <select id="size-${p.id}">${sizeOptions}</select>
                    </div>
                </div>

                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const selectedColor = document.getElementById(`color-${id}`).value;
    const selectedSize = document.getElementById(`size-${id}`).value;

    // Create a unique item entry for the cart
    const cartItem = {
        ...product,
        chosenColor: selectedColor,
        chosenSize: selectedSize,
        cartId: Date.now() // Unique ID to help with removal
    };

    cart.push(cartItem);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
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
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <small>${item.chosenColor} | ${item.chosenSize}</small>
                    <span class="cart-item-price">₹${item.price}</span>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
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
    
    let message = "*New Order from Savit Innovations*%0a%0a";
    cart.forEach((item, index) => {
        message += `*${index + 1}. ${item.name}*%0a`;
        message += `   Color: ${item.chosenColor}%0a`;
        message += `   Size: ${item.chosenSize}%0a`;
        message += `   Price: ₹${item.price}%0a%0a`;
    });
    message += `*Total Payable: ₹${document.getElementById('cart-total').innerText}*`;
    
    const whatsappURL = `https://wa.me/919980056119?text=${message}`;
    window.open(whatsappURL, '_blank');
}

initProducts();
