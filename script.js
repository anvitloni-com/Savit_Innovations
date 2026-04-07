// Sample Product Data
const products = [
    { id: 1, name: "Modern Brass Handle", price: "$12.00", img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=80" },
    { id: 2, name: "Matte Black Knob", price: "$8.50", img: "https://images.unsplash.com/photo-1594913785162-e67850625324?auto=format&fit=crop&w=500&q=80" },
    { id: 3, name: "Concealed Wardrobe Handle", price: "$15.00", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80" },
    { id: 4, name: "Polished Chrome Pull", price: "$10.00", img: "https://images.unsplash.com/photo-1520699049698-acd2fccb8cc8?auto=format&fit=crop&w=500&q=80" }
];

let cartCount = 0;

function displayProducts() {
    const grid = document.getElementById('product-display');
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="btn" onclick="addToCart()">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

function addToCart() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    alert("Item added to cart!");
}

// Initialize
document.addEventListener('DOMContentLoaded', displayProducts);

// Simple Form Submission Handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Thank you for contacting Savit Innovations! We will get back to you soon.");
    this.reset();
});
