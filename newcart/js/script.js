document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const addToCartButtons = document.querySelectorAll('.btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const button = event.target;
        const bookItem = button.closest('.book-item');
        const title = bookItem.querySelector('h3').textContent;
        const price = parseFloat(bookItem.querySelector('p').textContent.replace('$', ''));
        const image = bookItem.querySelector('img').src;

        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        if (totalQuantity >= 10) {
            alert('Cart can hold a maximum of 10 books.');
            return;
        }

        const cartItem = cart.find(item => item.title === title);
        if (cartItem) {
            if (totalQuantity + 1 > 10) {
                alert('Adding this item exceeds the cart limit of 10 books.');
                return;
            }
            cartItem.quantity += 1;
        } else {
            cart.push({ title, price, image, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart');
    }

    if (document.querySelector('.cart-items')) {
        renderCart();
    }

    function renderCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-btn">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.remove-btn').addEventListener('click', () => {
                removeFromCart(item.title);
            });

            total += item.price * item.quantity;
        });

        document.querySelector('.cart-total h3').textContent = `Total: $${total.toFixed(2)}`;
    }

    function removeFromCart(title) {
        const cartIndex = cart.findIndex(item => item.title === title);
        if (cartIndex > -1) {
            cart.splice(cartIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }
});
