// 1. Updated Data: Each product has "variants" for every color/size combo
const products = [
    { 
        id: 1, 
        name: "AH-001", 
        category: "handels", 
        img: "C:\Agrawal Hardware\Individual Images\AH 001 CP SATIN (1)",
        // Define available options for the dropdowns
        colorOptions: ["RG-BS", "CP-SATIN"],
        sizeOptions: ["96mm", "160mm", "224mm", "288mm"],
        // Specific pricing for every possible combination
        variants: [
            { color: "RG-BS", size: "96mm", price: 389 },
            { color: "RG-BS", size: "160mm", price: 613 },
            { color: "RG-BS", size: "224mm", price: 856 },
            { color: "RG-BS", size: "288mm", price: 1026 },
            { color: "CP-SATIN", size: "96mm", price: 389 },
            { color: "CP-SATIN", size: "160mm", price: 613 }
            { color: "CP-SATIN", size: "224mm", price: 856 },
            { color: "CP-SATIN", size: "288mm", price: 1026 }
        ]
    },
    { 
        id: 2, 
        name: "AH-006", 
        category: "handels", 
        img: "C:\Agrawal Hardware\Individual Images\AH 001 CP SATIN (1)",
        colorOptions: ["CP", "SATIN", "ROSE-GOLD", "BLACK-SATIN"],
        sizeOptions: ["96mm", "160mm", "224mm", "288mm"],
        variants: [
            { color: "CP", size: "96mm", price: 267 },
            { color: "CP", size: "160mm", price: 395 },
            { color: "CP", size: "224mm", price: 512 },
            { color: "CP", size: "288mm", price: 624 }
            { color: "SATIN", size: "96mm", price: 267 },
            { color: "SATIN", size: "160mm", price: 395 },
            { color: "SATIN", size: "224mm", price: 512 },
            { color: "SATIN", size: "288mm", price: 624 }
            { color: "ROSE-GOLD", size: "96mm", price: 267 },
            { color: "ROSE-GOLD", size: "160mm", price: 395 },
            { color: "ROSE-GOLD", size: "224mm", price: 512 },
            { color: "ROSE-GOLD", size: "288mm", price: 624 }
            { color: "BLACK-SATIN", size: "96mm", price: 284 },
            { color: "BLACK-SATIN", size: "160mm", price: 427 },
            { color: "BLACK-SATIN", size: "224mm", price: 552 },
            { color: "BLACK-SATIN", size: "288mm", price: 673 }
        ]
    }
    { 
        id: 3, 
        name: "AH-009", 
        category: "handels", 
        img: "C:\Agrawal Hardware\Individual Images\AH 001 CP SATIN (1)",
        colorOptions: ["RG-BS", "GOLD-BLACK", "CP-SATIN"],
        sizeOptions: ["96mm", "160mm", "224mm", "288mm"],
        variants: [
            { color: "RG-BS", size: "96mm", price: 368 },
            { color: "RG-BS", size: "160mm", price: 590 },
            { color: "RG-BS", size: "224mm", price: 826 },
            { color: "RG-BS", size: "288mm", price: 996 }
            { color: "GOLD-BLACK", size: "96mm", price:  },
            { color: "GOLD-BLACK", size: "160mm", price: 395 },
            { color: "GOLD-BLACK", size: "224mm", price: 512 },
            { color: "GOLD-BLACK", size: "288mm", price: 624 }
            { color: "CP-SATIN", size: "96mm", price: 267 },
            { color: "CP-SATIN", size: "160mm", price: 395 },
            { color: "CP-SATIN", size: "224mm", price: 512 },
            { color: "CP-SATIN", size: "288mm", price: 624 }
        ]
    }
];

let cart = [];
let currentCategory = 'all';

// 2. Initialize Products
function initProducts(list = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    list.forEach(p => {
        // Default starting price from the first variant
        const defaultPrice = p.variants[0].price;

        grid.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p class="price">₹<span id="display-price-${p.id}">${defaultPrice}</span></p>
                
                <div class="selectors">
                    <div class="select-group">
                        <label>Color</label>
                        <select id="color-${p.id}" onchange="updateVariantPrice(${p.id})">
                            ${p.colorOptions.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>
                    <div class="select-group">
                        <label>Size</label>
                        <select id="size-${p.id}" onchange="updateVariantPrice(${p.id})">
                            ${p.sizeOptions.map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div class="qty-container">
                    <button class="qty-btn" onclick="adjustQty(${p.id}, -1)">-</button>
                    <input type="number" id="qty-${p.id}" class="qty-input" value="1" min="1">
                    <button class="qty-btn" onclick="adjustQty(${p.id}, 1)">+</button>
                </div>

                <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>`;
    });
}

// 3. Update Price based on BOTH Color and Size selection
function updateVariantPrice(productId) {
    const p = products.find(x => x.id === productId);
    const selectedColor = document.getElementById(`color-${productId}`).value;
    const selectedSize = document.getElementById(`size-${productId}`).value;
    
    // Find the variant that matches both chosen values
    const variant = p.variants.find(v => v.color === selectedColor && v.size === selectedSize);
    
    if (variant) {
        document.getElementById(`display-price-${productId}`).innerText = variant.price;
    }
}

function adjustQty(id, change) {
    let input = document.getElementById(`qty-${id}`);
    let val = parseInt(input.value) + change;
    if(val >= 1) input.value = val;
}

// 4. Add to Cart captures the specific variant's price
function addToCart(id) {
    const p = products.find(x => x.id === id);
    const qty = parseInt(document.getElementById(`qty-${id}`).value);
    const color = document.getElementById(`color-${id}`).value;
    const size = document.getElementById(`size-${id}`).value;
    
    // Get the price of the specific selected variant
    const variant = p.variants.find(v => v.color === color && v.size === size);
    const finalPrice = variant ? variant.price : 0;
    
    cart.push({ 
        name: p.name, 
        qty, 
        color, 
        size, 
        price: finalPrice,
        subtotal: finalPrice * qty 
    });
    
    updateCartUI();
    if(!document.getElementById('cart-sidebar').classList.contains('active')) toggleCart();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsDiv = document.getElementById('cart-items');
    let total = 0;
    itemsDiv.innerHTML = '';
    cart.forEach((item, index) => {
        total += item.subtotal;
        itemsDiv.innerHTML += `
            <div class="cart-item">
                <div><strong>${item.name}</strong><br><small>${item.color} | ${item.size} | Qty: ${item.qty}</small></div>
                <div>₹${item.subtotal} <button class="remove-btn" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button></div>
            </div>`;
    });
    document.getElementById('cart-total').innerText = total;
}

function removeItem(index) { cart.splice(index, 1); updateCartUI(); }
function toggleCart() { document.getElementById('cart-sidebar').classList.toggle('active'); }

function setCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
}

function filterProducts() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(p => {
        const matchCat = currentCategory === 'all' || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(term);
        return matchCat && matchSearch;
    });
    initProducts(filtered);
}

function checkoutWhatsApp() {
    if(cart.length === 0) return alert("Cart is empty");
    let msg = "*ORDER FROM SAVIT INNOVATIONS*%0a%0a";
    cart.forEach((item, i) => {
        msg += `${i+1}. ${item.name}%0a- Color: ${item.color}%0a- Size: ${item.size}%0a- Qty: ${item.qty}%0a- Subtotal: ₹${item.subtotal}%0a%0a`;
    });
    msg += `*GRAND TOTAL: ₹${document.getElementById('cart-total').innerText}*`;
    window.open(`https://wa.me/919980056119?text=${msg}`);
}

window.onload = () => initProducts();
