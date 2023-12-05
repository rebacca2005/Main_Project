document.addEventListener('DOMContentLoaded', function () {
    // Function to add a product to the cart
    function addToCart(productName, price) {
        // Retrieve the existing cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Create a new product object
        const newProduct = { name: productName, price: price };

        // Add the new product to the cart
        cartItems.push(newProduct);

        // Save the updated cart items back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        console.log('Added to cart:', { name: productName, price: price });

        // Redirect to the cart page
        window.location.href = 'cart.html';
    }

    // Example: Adding an event listener to a button with the class 'add-to-cart-button'
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Extract product details from the clicked product card
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h6').innerText;
            const productPrice = parseFloat(productCard.querySelector('p').innerText.slice(1));

            // Call the addToCart function with the extracted details
            addToCart(productName, productPrice);
        });
    });

    // Get the cart content container
    const cartContent = document.getElementById('cart-content');

    // Hide the cart pop-up initially
    cartContent.style.display = 'block';

    // Close the cart pop-up when clicking outside it
    window.addEventListener('click', function (event) {
        if (event.target === cartContent) {
            cartContent.style.display = 'none';
        }
    });

    // Close the cart pop-up when clicking the close button
    const closeCartButton = document.createElement('div');
    closeCartButton.classList.add('close-cart');
    closeCartButton.innerHTML = '&times;';
    cartContent.appendChild(closeCartButton);
    closeCartButton.addEventListener('click', function () {
        cartContent.style.display = 'none';
    });

    // Handle the initial display of the cart
    handleCartDisplay();

    // Function to handle the display of the cart
    function handleCartDisplay() {
        // Retrieve the cart items from localStorage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Clear the existing content
        cartContent.innerHTML = '';

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <button class="delete-item" data-index="${index}">Delete</button>
            `;
            cartContent.appendChild(cartItem);
        });

        if (cartItems.length > 0) {
            // Calculate and display the total
            const total = cartItems.reduce((acc, item) => acc + item.price, 0);
            const cartTotal = document.createElement('div');
            cartTotal.classList.add('cart-total');
            cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
            cartContent.appendChild(cartTotal);

            // Add Checkout button
            const checkoutButton = document.createElement('button');
            checkoutButton.classList.add('checkout-button');
            checkoutButton.textContent = 'Checkout';
            cartContent.appendChild(checkoutButton);

            // Add event listener to Checkout button
            checkoutButton.addEventListener('click', function () {
                // Redirect to the checkout page
                window.location.href = 'checkout.html';
            });
        } else {
            // Handle the case when the cart is empty
            const emptyCartMessage = document.createElement('p');
            emptyCartMessage.textContent = 'Your cart is empty.';
            cartContent.appendChild(emptyCartMessage);
        }

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-item').forEach(deleteButton => {
            deleteButton.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                // Remove the item from the cart
                cartItems.splice(index, 1);
                // Update localStorage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                // Refresh the cart display
                handleCartDisplay();
            });
        });
    }
});
