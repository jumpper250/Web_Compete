document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // ป้องกันการส่งฟอร์มแบบเดิม

        const usernameInput = document.getElementById('username').value.trim();
        const passwordInput = document.getElementById('password').value;

        // ดึงข้อมูลผู้ใช้จาก LocalStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            // ตรวจสอบ username หรือ email และ password
            if ((usernameInput === storedUser.username || usernameInput === storedUser.email) && passwordInput === storedUser.password) {
                loginMessage.textContent = 'เข้าสู่ระบบสำเร็จ!';
                loginMessage.className = 'message success';
                setTimeout(() => {
                    window.location.href = 'index.html'; // พาไปยังหน้าหลัก
                }, 2000);
            } else {
                loginMessage.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
                loginMessage.className = 'message error';
            }
        } else {
            loginMessage.textContent = 'ยังไม่มีบัญชีผู้ใช้นี้ โปรดสมัครสมาชิกก่อน';
            loginMessage.className = 'message error';
        }
    });
});
