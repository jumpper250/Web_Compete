
    const images = [
      "https://down-th.img.susercontent.com/file/th-11134207-7r98p-lve9gjf4nfux31.webp",
      "https://down-th.img.susercontent.com/file/th-11134207-7r98z-lve9gjf49ebe7f.webp",
      "https://down-th.img.susercontent.com/file/th-11134207-7r98z-lve9gjeu9ssp15.webp"
    ];

    let currentIndex = 0;
    const img = document.getElementById("product-img");

    function showImage(index) {
      img.src = images[index];
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }

    setInterval(nextImage, 3000);

    let startX = 0;
    const touchArea = document.getElementById("touch-area");

    touchArea.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    });

    touchArea.addEventListener("touchend", function (e) {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextImage();
      else if (endX - startX > 50) prevImage();
    });

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

    let selectedColor = '';
    let selectedImage = '';
    const colorButtons = document.querySelectorAll('.color-option');

    colorButtons.forEach(button => {
      button.addEventListener('click', () => {
        colorButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedColor = button.dataset.value;
        selectedImage = button.dataset.img;
        document.getElementById('product-img').src = selectedImage;
        console.log('เลือกสี:', selectedColor);
      });
    });

    document.querySelector('.btn-buy').addEventListener('click', () => {
      if (!selectedColor) {
        alert('กรุณาเลือกสีสินค้าก่อนสั่งซื้อ');
        return;
      }
      window.location.href = "http://127.0.0.1:5500/buy/%E0%B8%B4buy.html";
    });

    document.querySelector('.btn-cart').addEventListener('click', () => {
  if (!selectedColor) {
    alert('กรุณาเลือกสีสินค้าก่อนเพิ่มลงรถเข็น');
    return;
  }

  const product = {
    id: 'K1' + selectedColor, // ใช้รหัสสินค้ารวมกับสีเพื่อไม่ให้ซ้ำกัน
    name: document.querySelector('.product-title').textContent.trim(),
    price: 129,
    quantity: 1,
    color: selectedColor,
    image: document.getElementById('product-img').src
  };

  // โหลดตะกร้าจาก LocalStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // เช็คว่ามีสินค้าเดิมหรือยัง
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1; // ถ้ามีแล้วเพิ่มจำนวน
  } else {
    cart.push(product); // ถ้ายังไม่มีให้เพิ่มใหม่
  }

  // บันทึกตะกร้ากลับลง LocalStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`เพิ่มสินค้าเข้าสู่รถเข็นเรียบร้อย! (${selectedColor})`);

  // Redirect ไปหน้า index.html
  window.location.href = "/index.html";  // <-- ปรับ path ให้ตรงกับตำแหน่งจริงของ index.html ในโปรเจกต์
});


    