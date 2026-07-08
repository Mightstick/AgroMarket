/* ==========================================================================
   AGROMARKET SECURITY & ACCESS VALIDATION SCHEMA - auth.js
   ========================================================================== */

const AuthController = {
    togglePassword(fieldId) {
        const field = document.getElementById(fieldId);
        if(!field) return;
        field.type = field.type === 'password' ? 'text' : 'password';
    },
    validateLogin(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        
        if(!email || !pass) {
            window.Toast.show("Please cross check structural login matrices.", "error");
            return false;
        }
        window.Toast.show("Authentication verified. Redirecting to access terminal...");
        setTimeout(() => { window.location.href = 'farmer-dashboard.html'; }, 1500);
    },
    validateRegister(event) {
        event.preventDefault();
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-password').value;
        const terms = document.getElementById('reg-terms').checked;

        if(!name || !email || pass.length < 6 || !terms) {
            window.Toast.show("Registration rejected. Please verify parameters.", "error");
            return false;
        }
        window.Toast.show("Account registration authorized!");
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    }
};