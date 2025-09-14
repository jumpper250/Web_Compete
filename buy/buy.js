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

    function cancelEdit() {
      document.getElementById("edit-form").style.display = "none";
      document.getElementById("address-display").style.display = "block";
    }

    function placeOrder() {
        window.location.href = "http://127.0.0.1:5500/finish/finish.html";
    }

    function cancelOrder() {
      if (confirm("คุณต้องการยกเลิกการสั่งซื้อใช่หรือไม่?")) {
        window.location.href = "http://127.0.0.1:5501/index.html"; // หรือเปลี่ยนเป็นหน้าก่อนหน้าที่เหมาะสม
      }
    }
    
function placeOrder() {
  if (confirm("คุณต้องการสั่งซื้อสินค้าทั้งหมดหรือไม่?")) {
    alert("สั่งซื้อเรียบร้อย!");
    localStorage.removeItem('cart'); // ล้างตะกร้าหลังสั่งซื้อ
    window.location.href = "../finish/finish.html"; // ไปหน้า finish
  }
}

function cancelOrder() {
  if (confirm("คุณต้องการยกเลิกการสั่งซื้อใช่หรือไม่?")) {
    window.location.href = "../index.html"; // กลับไปหน้า index
  }
}


    
