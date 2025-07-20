document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Here you can add code to send the registration data to a backend server
    console.log('Register:', { username, email, password });
    alert('Registered successfully!');
});

document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Here you can add code to send the login data to a backend server
    console.log('Login:', { email, password });
    alert('Logged in successfully!');
});

const books = [
    { title: 'Book 1', author: 'Author 1', description: 'Description 1', price: 10, coverImage: 'images/book1.jpg' },
    { title: 'Book 2', author: 'Author 2', description: 'Description 2', price: 15, coverImage: 'images/book2.jpg' },
    { title: 'Book 3', author: 'Author 3', description: 'Description 3', price: 20, coverImage: 'images/book3.jpg' },
    { title: 'Book 4', author: 'Author 4', description: 'Description 1', price: 10, coverImage: 'images/book4.jpg' },
    { title: 'Book 5', author: 'Author 5', description: 'Description 1', price: 10, coverImage: 'images/book5.jpg' },
    { title: 'Book 6', author: 'Author 6', description: 'Description 2', price: 15, coverImage: 'images/book6.jpg' },
    { title: 'Book 7', author: 'Author 7', description: 'Description 3', price: 20, coverImage: 'images/book7.jpg' },
    { title: 'Book 8', author: 'Author 8', description: 'Description 1', price: 10, coverImage: 'images/book8.jpg' },
    { title: 'Book 9', author: 'Author 9', description: 'Description 1', price: 10, coverImage: 'images/book9.jpg' },
    { title: 'Book 10', author: 'Author 10', description: 'Description 2', price: 15, coverImage: 'images/book10.jpg' },
    { title: 'Book 11', author: 'Author 11', description: 'Description 3', price: 20, coverImage: 'images/book11.jpg' },
    { title: 'Book 12', author: 'Author 12', description: 'Description 1', price: 10, coverImage: 'images/book12.jpg' }
]

function displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    books.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <img src="${book.coverImage}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p>${book.description}</p>
            <p><strong>Price:</strong> $${book.price}</p>
            <button onclick="addToCart('${book.title}')">Add to Cart</button>
        `;
        bookList.appendChild(bookItem);
    });
}

function addToCart(title) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const book = books.find(b => b.title === title);
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${title} has been added to your cart.`);
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.coverImage}" alt="${item.title}">
            <span>${item.title}</span>
            <span>$${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

if (document.getElementById('book-list')) {
    displayBooks();
}

if (document.getElementById('cart-items')) {
    displayCart();
}
