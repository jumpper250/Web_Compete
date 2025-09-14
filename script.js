document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartButton = document.getElementById('close-cart-btn');
    const openCartButton = document.getElementById('open-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const cartItemCountElement = document.getElementById('cart-item-count');

    // โหลดตะกร้าจาก LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartItemCount() {
        cartItemCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function openCart() {
        cartOverlay.style.display = 'flex';
        renderCartItems();
    }

    function closeCart() {
        cartOverlay.style.display = 'none';
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function addItemToCart(event) {
        event.preventDefault();

        const productItem = event.target.closest('.product-item');
        const productId = productItem.dataset.productId;
        const productName = productItem.dataset.productName;
        const productPrice = parseFloat(productItem.dataset.productPrice);
        const productImage = productItem.querySelector('img').src;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1, image: productImage });
        }

        saveCart();
        updateCartItemCount();
        renderCartItems();

        alert(`เพิ่ม ${productName} ลงตะกร้าเรียบร้อย!`);
    }

    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartItemCount();
        renderCartItems();
    }

    function changeItemQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = parseInt(newQuantity);
            if (item.quantity <= 0) {
                removeItemFromCart(productId);
            }
            saveCart();
            updateCartItemCount();
            renderCartItems();
        }
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">฿${item.price.toFixed(2)}</div>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                    <span class="item-qty">${item.quantity}</span>
                    <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                    <button class="quantity-btn remove-btn" data-id="${item.id}">ลบ</button>
                </div>
            `;
            cartItemsContainer.appendChild(listItem);
            total += item.price * item.quantity;
        });
        cartTotalPriceElement.textContent = total.toFixed(2);

        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const item = cart.find(item => item.id === productId);
                if (!item) return;

                if (event.target.classList.contains('plus-btn')) {
                    changeItemQuantity(productId, item.quantity + 1);
                } else if (event.target.classList.contains('minus-btn')) {
                    changeItemQuantity(productId, item.quantity - 1);
                } else if (event.target.classList.contains('remove-btn')) {
                    removeItemFromCart(productId);
                }
            });
        });
    }

    // bind ปุ่มทั้งหมด
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addItemToCart);
    });

    openCartButton.addEventListener('click', openCart);
    closeCartButton.addEventListener('click', closeCart);

    // อัปเดตตะกร้าเริ่มต้นเมื่อโหลดหน้า
    updateCartItemCount();
    renderCartItems();
});

// ปุ่มเลือกอุปกรณ์ (ไปหน้ารายละเอียดสินค้า)
document.querySelectorAll('.add-to-cart-btn1').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productItem = e.target.closest('.product-item');
        const productLink = productItem.querySelector('a').href;
        alert('กรุณาเลือกอุปกรณ์');
        window.location.href = productLink;
    });
});
