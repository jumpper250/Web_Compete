const img = document.getElementById("product-img");
let startX = 0;
const touchArea = document.getElementById("touch-area");

touchArea.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
});

touchArea.addEventListener("touchend", function (e) {
  const endX = e.changedTouches[0].clientX;
});

// รีวิวและดาว
const form = document.getElementById('comment-form');
const input = document.getElementById('comment-input');
const usernameInput = document.getElementById('username-input');
const list = document.getElementById('comment-list');
const stars = document.querySelectorAll('#star-rating span');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = star.dataset.value;
    stars.forEach(s => s.classList.remove('selected'));
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add('selected');
    }
  });
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = usernameInput.value.trim();
  const text = input.value.trim();
  const date = new Date().toLocaleString();

  if (text && name) {
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerHTML = `
      <strong>${name}</strong>
      <span>${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</span>
      <p>${text}</p>
      <small>${date}</small>
    `;
    list.prepend(comment);
    input.value = '';
    usernameInput.value = '';
    selectedRating = 0;
    stars.forEach(s => s.classList.remove('selected'));
  }
});

// ปุ่มซื้อสินค้า
document.querySelector('.btn-buy').addEventListener('click', () => {
  window.location.href = "http://127.0.0.1:5500/buy3/%E0%B8%B4buy3.html";
});

// ปุ่มเพิ่มไปตะกร้า
document.querySelector('.btn-cart').addEventListener('click', () => {
  const product = {
    id: 'K3', // เปลี่ยนเป็นรหัสสินค้าเฉพาะ
    name: document.querySelector('.product-title').textContent.trim(),
    price: 590, // ราคาสินค้า
    quantity: 1,
    image: document.getElementById('product-img').src
  };

  // โหลดตะกร้าจาก LocalStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // ถ้ามีสินค้านี้แล้วเพิ่มจำนวน
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }

  // บันทึกตะกร้าใหม่ลง LocalStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert('เพิ่มสินค้าเข้าสู่รถเข็นเรียบร้อย!');

  // พาไปหน้า index.html
  window.location.href = "/index.html";
});
