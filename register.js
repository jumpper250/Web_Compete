document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // ป้องกันการส่งฟอร์มแบบเดิม

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password !== confirmPassword) {
            registerMessage.textContent = 'รหัสผ่านไม่ตรงกัน';
            registerMessage.className = 'message error';
            return;
        }

        // เก็บข้อมูลผู้ใช้ใน LocalStorage
        const user = { username, email, password };
        localStorage.setItem('user', JSON.stringify(user));

        // แสดงข้อความสำเร็จ
        registerMessage.textContent = 'สมัครสมาชิกสำเร็จ!';
        registerMessage.className = 'message success';
        registerForm.reset(); // ล้างแบบฟอร์ม

        // หลัง 2 วินาที → ไปหน้า login.html
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
});
