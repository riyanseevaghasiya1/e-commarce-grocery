// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    clearAllErrors();
}

// Toggle Password Visibility
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.add('error');
    error.textContent = message;
    error.classList.add('show');
}

function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.remove('error');
    error.classList.remove('show');
}

function clearAllErrors() {
    document.querySelectorAll('.form-input, .otp-input').forEach(input => {
        input.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });
    document.querySelectorAll('.success-message').forEach(msg => {
        msg.classList.remove('show');
    });
}

function showSuccess(msgId, message) {
    const msg = document.getElementById(msgId);
    msg.textContent = message;
    msg.classList.add('show');
    setTimeout(() => {
        msg.classList.remove('show');
    }, 5000);
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    clearAllErrors();
    let isValid = true;

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email) {
        showError('loginEmail', 'loginEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('loginEmail', 'loginEmailError', 'Please enter a valid email');
        isValid = false;
    }

    if (!password) {
        showError('loginPassword', 'loginPasswordError', 'Password is required');
        isValid = false;
    }

    if (isValid) {
        showSuccess('loginSuccessMsg', 'Login successful! Redirecting...');
        setTimeout(() => {
            alert('Login successful! You are now logged in.');
            document.getElementById('loginForm').reset();
        }, 1500);
    }
}

// Register Handler
function handleRegister(event) {
    event.preventDefault();
    clearAllErrors();
    let isValid = true;

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    if (!name) {
        showError('registerName', 'registerNameError', 'Full name is required');
        isValid = false;
    } else if (name.length < 3) {
        showError('registerName', 'registerNameError', 'Name must be at least 3 characters');
        isValid = false;
    }

    if (!email) {
        showError('registerEmail', 'registerEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('registerEmail', 'registerEmailError', 'Please enter a valid email');
        isValid = false;
    }

    if (!password) {
        showError('registerPassword', 'registerPasswordError', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('registerPassword', 'registerPasswordError', 'Password must be at least 8 characters');
        isValid = false;
    }

    if (!confirmPassword) {
        showError('registerConfirmPassword', 'registerConfirmPasswordError', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('registerConfirmPassword', 'registerConfirmPasswordError', 'Passwords do not match');
        isValid = false;
    }

    if (!agreeTerms) {
        const termsError = document.getElementById('termsError');
        termsError.textContent = 'You must agree to the Terms & Conditions';
        termsError.classList.add('show');
        isValid = false;
    }

    if (isValid) {
        document.getElementById('otpEmail').textContent = email;
        showSuccess('registerSuccessMsg', 'Account created! Redirecting to OTP verification...');
        setTimeout(() => {
            showPage('otpPage');
            document.getElementById('otp1').focus();
        }, 1500);
    }
}

// Forgot Password Handler
function handleForgotPassword(event) {
    event.preventDefault();
    clearAllErrors();
    let isValid = true;

    const email = document.getElementById('forgotEmail').value.trim();

    if (!email) {
        showError('forgotEmail', 'forgotEmailError', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('forgotEmail', 'forgotEmailError', 'Please enter a valid email');
        isValid = false;
    }

    if (isValid) {
        showSuccess('forgotSuccessMsg', 'Reset link sent to your email!');
        setTimeout(() => {
            document.getElementById('forgotForm').reset();
        }, 2000);
    }
}

// OTP Input Handler
function handleOTPInput(event, currentId) {
    const current = document.getElementById(currentId);
    const value = current.value;

    current.value = value.replace(/[^0-9]/g, '');

    if (current.value.length === 1) {
        const currentNum = parseInt(currentId.replace('otp', ''));
        if (currentNum < 6) {
            const nextInput = document.getElementById('otp' + (currentNum + 1));
            nextInput.focus();
        }
    }
}

function handleOTPKeydown(event, currentId) {
    const current = document.getElementById(currentId);
    
    if (event.key === 'Backspace' && !current.value) {
        const currentNum = parseInt(currentId.replace('otp', ''));
        if (currentNum > 1) {
            const prevInput = document.getElementById('otp' + (currentNum - 1));
            prevInput.focus();
        }
    }
}

// OTP Verify Handler
function handleOTPVerify(event) {
    event.preventDefault();
    clearAllErrors();

    let otp = '';
    for (let i = 1; i <= 6; i++) {
        const value = document.getElementById('otp' + i).value;
        if (!value) {
            const otpError = document.getElementById('otpError');
            otpError.textContent = 'Please enter all 6 digits';
            otpError.classList.add('show');
            return;
        }
        otp += value;
    }

    showSuccess('otpSuccessMsg', 'Email verified successfully!');
    setTimeout(() => {
        alert('Email verified! You can now login.');
        showPage('loginPage');
        for (let i = 1; i <= 6; i++) {
            document.getElementById('otp' + i).value = '';
        }
    }, 1500);
}

// Resend OTP
function resendOTP() {
    alert('OTP resent to your email!');
    for (let i = 1; i <= 6; i++) {
        document.getElementById('otp' + i).value = '';
    }
    document.getElementById('otp1').focus();
}

// Add input listeners
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        });
    });

    document.getElementById('agreeTerms').addEventListener('change', function() {
        const termsError = document.getElementById('termsError');
        termsError.classList.remove('show');
    });
});