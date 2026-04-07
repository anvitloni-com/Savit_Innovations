const products = [
    { 
        id: 1, 
        name: "Premium Brass Handle", 
        category: "handels",
        price: 450, 
        img: "https://images.unsplash.com/photo-1623073344440-6216f9f30e9d?auto=format&fit=crop&w=500&q=60",
        colors: ["Gold", "Silver", "Antique", "Black"],
        sizes: ["96mm", "128mm", "160mm", "192mm"]
    },
    { 
        id: 2, 
        name: "Modern Black Knob", 
        category: "knobs",
        price: 120, 
        img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=60",
        colors: ["Matte Black", "Glossy Black", "Grey", "White"],
        sizes: ["20mm", "25mm", "30mm", "35mm"]
    },
    { 
        id: 3, 
        name: "Concealed Sliding Handle", 
        category: "concealed",
        price: 850, 
        img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=60",
        colors: ["Satin Nickel", "Chrome", "Bronze", "Graphite"],
        sizes: ["100mm", "150mm", "200mm", "250mm"]
    },
    { 
        id: 4, 
        name: "Luxury Gold Cabinet Knob", 
        category: "knobs",
        price: 300, 
        img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=60",
        colors: ["Rose Gold", "Polished Gold", "Champagne", "Brushed Brass"],
        sizes: ["Small", "Medium", "Large", "XL"]
    }
];

let currentCategory = 'all';
let cart = [];

function initProducts(filterList = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    filterList.forEach(p => {
        let colorOptions = p.colors.map(c => `<option value="${c}">${c}</option>`).join('');
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

// Search and Filter Logic
function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                              p.colors.some(c => c.toLowerCase().includes(searchTerm));
        const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    initProducts(filtered);
}

function setCategory(cat, btn) {
    currentCategory = cat;
    
    // Update active button style
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    filterProducts();
}

// Keep your existing addToCart, updateCart, and checkoutWhatsApp functions below...
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const selectedColor = document.getElementById(`color-${id}`).value;
    const selectedSize = document.getElementById(`size-${id}`).value;
    cart.push({...product, chosenColor: selectedColor, chosenSize: selectedSize});
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
            </div>`;
    });
    document.getElementById('cart-total').innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Your cart is empty!");
    let message = "*New Order from Savit Innovations*%0a%0a";
    cart.forEach((item, index) => {
        message += `*${index + 1}. ${item.name}*%0aColor: ${item.chosenColor}%0aSize: ${item.chosenSize}%0aPrice: ₹${item.price}%0a%0a`;
    });
    message += `*Total Payable: ₹${document.getElementById('cart-total').innerText}*`;
    window.open(`https://wa.me/919980056119?text=${message}`, '_blank');
}

initProducts();
