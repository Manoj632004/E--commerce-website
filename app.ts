interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

// Fetch all products and display them
async function fetchProducts(): Promise<void> {
    const response = await fetch('/api/products');
    const products: Product[] = await response.json();
    displayProducts(products);
}

// Display products on the page
function displayProducts(products: Product[]): void {
    const productsContainer = document.querySelector('.products');
    if (productsContainer) {
        productsContainer.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h2>${product.name}</h2>
                <p>$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }
}

// Add item to the cart
async function addToCart(productId: number): Promise<void> {
    const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
    });
    if (response.ok) {
        alert('Product added to cart');
    } else {
        alert('Failed to add product to cart');
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});
