const myNumber = "919980056119"; // Your WhatsApp number with country code

const products = [
    { id: 1, name: "Modern Brass Handle", price: "₹950", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500" },
    { id: 2, name: "Matte Black Knob", price: "₹450", img: "https://images.unsplash.com/photo-1594913785162-e67850625324?w=500" },
    { id: 3, name: "Concealed Wardrobe Handle", price: "₹1200", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500" },
    { id: 4, name: "Polished Chrome Pull", price: "₹800", img: "https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?w=500" }
];

function displayProducts() {
    const grid = document.getElementById('product-display');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="btn" style="background:#25D366; color:white;" 
                onclick="orderProduct('${product.name}')">
                <i class="fab fa-whatsapp"></i> Order on WhatsApp
            </button>
        `;
        grid.appendChild(card);
    });
}

// Function for specific product ordering
function orderProduct(productName) {
    const message = `Hello Savit Innovations, I am interested in buying the *${productName}*. Please provide more details.`;
    const whatsappUrl = `https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Function for general contact form
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cust-name').value;
    const msg = document.getElementById('cust-msg').value;
    
    const generalMsg = `Hello, my name is ${name}. ${msg}`;
    const whatsappUrl = `https://wa.me/${myNumber}?text=${encodeURIComponent(generalMsg)}`;
    window.open(whatsappUrl, '_blank');
});

document.addEventListener('DOMContentLoaded', displayProducts);
