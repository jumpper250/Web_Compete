// โหลดสินค้าจาก LocalStorage และสร้างรายการสินค้า
function loadCartItems() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const container = document.getElementById('order-items-container');
  container.innerHTML = ''; // เคลียร์ของเก่า

  if (cart.length === 0) {
    container.innerHTML = '<p class="text">ไม่มีสินค้าในตะกร้า</p>';
    document.getElementById('total-price').textContent = 0;
    return;
  }

  let total = 0;
  const shippingCost = 35;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `
      <p class="item-name">${item.name}</p>
      ${item.color ? `<p class="text">สี: ${item.color}</p>` : ''}
      <p class="text">จำนวน: ${item.quantity}</p>
      <p class="item-price">฿${item.price} x ${item.quantity} = ฿${item.price * item.quantity}</p>
    `;
    container.appendChild(div);
    total += item.price * item.quantity;
  });

  // รวมค่าจัดส่ง
  total += shippingCost;
  document.getElementById('total-price').textContent = total;
}

// โหลดสินค้าตอนหน้าโหลด
window.addEventListener('DOMContentLoaded', () => {
  // โหลดที่อยู่จาก localStorage ถ้ามี
  const savedAddress = JSON.parse(localStorage.getItem('address')) || {};
  if (savedAddress.name) document.getElementById("current-address").textContent = savedAddress.name;
  if (savedAddress.detail) document.getElementById("current-address-detail").textContent = savedAddress.detail;

  loadCartItems();
});

// แก้ไขที่อยู่
function editAddress() {
  document.getElementById("address-display").style.display = "none";
  document.getElementById("edit-form").style.display = "block";

  // โหลดค่าเก่าไป input
  document.getElementById("new-address").value = document.getElementById("current-address").textContent;
  document.getElementById("new-address-detail").value = document.getElementById("current-address-detail").textContent;
}

function saveAddress() {
  const newAddress = document.getElementById("new-address").value.trim();
  const newDetail = document.getElementById("new-address-detail").value.trim();

  if(newAddress === "" || newDetail === "") {
    alert("กรุณากรอกชื่อและที่อยู่ให้ครบ");
    return;
  }

  document.getElementById("current-address").textContent = newAddress;
  document.getElementById("current-address-detail").textContent = newDetail;

  // บันทึกที่อยู่ลง localStorage
  localStorage.setItem('address', JSON.stringify({ name: newAddress, detail: newDetail }));

  cancelEdit();
}

function cancelEdit() {
  document.getElementById("edit-form").style.display = "none";
  document.getElementById("address-display").style.display = "block";
}

// สั่งซื้อสินค้า
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if(cart.length === 0) {
    alert("ไม่มีสินค้าให้สั่งซื้อ");
    return;
  }

  if (confirm("คุณต้องการสั่งซื้อสินค้าทั้งหมดหรือไม่?")) {
    alert("สั่งซื้อเรียบร้อย!");
    localStorage.removeItem('cart'); // ล้างตะกร้าหลังสั่งซื้อ
    window.location.href = "finish/finish.html";
  }
}

// ยกเลิกการสั่งซื้อ
function cancelOrder() {
  if (confirm("คุณต้องการยกเลิกการสั่งซื้อใช่หรือไม่?")) {
    window.location.href = "index.html";
  }
}
//เมื่อกดแก้ไข ที่อยู่จดส่งจะล้างข้อความให้ว่างเปล่า
 function editAddress() {
      document.getElementById("address-display").style.display = "none";
      document.getElementById("edit-form").style.display = "block";
    }

    function saveAddress() {
      const newAddress = document.getElementById("new-address").value;
      const newDetail = document.getElementById("new-address-detail").value;

      document.getElementById("current-address").textContent = newAddress;
      document.getElementById("current-address-detail").textContent = newDetail;

      cancelEdit();
    }