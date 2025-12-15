function showSkeleton(type) {
    const skel = document.getElementById("skeletonLoader");

    skel.querySelectorAll(".skel").forEach(s => s.style.display = "none");
    skel.querySelector(".skel-" + type).style.display = "block";

    skel.style.display = "flex";
    document.querySelector(".auth-container:not(.skeleton)").style.display = "none";
}


function hideSkeleton() {
    document.getElementById("skeletonLoader").style.display = "none";
    document.querySelector(".auth-container:not(.skeleton)").style.display = "flex";
}


window.addEventListener("load", () => {
    showSkeleton("login");

    setTimeout(() => {
        hideSkeleton();
    }, 800);
});

function showPage(pageId) {

    const map = {
        loginPage: "login",
        registerPage: "register",
        forgotPage: "forgot",
        otpPage: "otp",
        resetPasswordPage: "reset"
    };

    // ✅ Step 1: Show skeleton FIRST
    showSkeleton(map[pageId]);

    // ✅ Step 2: Delay page switch
    setTimeout(() => {

        // hide all pages
        document.querySelectorAll(".page").forEach(p => {
            p.classList.remove("active");
        });

        // show selected page
        document.getElementById(pageId).classList.add("active");

        clearAllErrors();

        // ✅ Step 3: NOW hide skeleton
        hideSkeleton();

    }, 800); // 👈 MUST be >= 800ms
}





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

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (!email || !validateEmail(email)) {
        showError('loginEmail', 'loginEmailError', 'Enter a valid email');
        return;
    }
    if (!password) {
        showError('loginPassword', 'loginPasswordError', 'Enter password');
        return;
    }

    if (!registeredUser) {
        showError('loginEmail', 'loginEmailError', 'No account found. Please register first.');
        return;
    }

    if (registeredUser.email === email && registeredUser.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(registeredUser));
        showSuccess('loginSuccessMsg', 'Login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = './home.html';
        }, 1500);
    } else {
        showError('loginPassword', 'loginPasswordError', 'Invalid email or password');
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

    if (!email || !validateEmail(email)) {
        showError('registerEmail', 'registerEmailError', 'Enter a valid email');
        isValid = false;
    }

    if (!password || password.length < 8) {
        showError('registerPassword', 'registerPasswordError', 'Password must be at least 8 characters');
        isValid = false;
    }

    if (password !== confirmPassword) {
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
        const userData = { name, email, password };
        localStorage.setItem('registeredUser', JSON.stringify(userData));

        showSuccess('registerSuccessMsg', 'Account created successfully!');
        setTimeout(() => {
            showPage('loginPage'); // 👈 Redirect directly to login
        }, 1500);
    }
}



// Forgot Password Handler
function handleForgotPassword(event) {
    event.preventDefault();
    clearAllErrors();

    const email = document.getElementById('forgotEmail').value.trim();
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (!email || !validateEmail(email)) {
        showError('forgotEmail', 'forgotEmailError', 'Enter valid email');
        return;
    }

    if (!registeredUser || registeredUser.email !== email) {
        showError('forgotEmail', 'forgotEmailError', 'Email not found.');
        return;
    }

    // ✅ If email matches — show OTP page
    document.getElementById('otpEmail').textContent = email;
    showPage('otpPage');
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

    // ✅ OTP verified - go to Reset Password page
    showSuccess('otpSuccessMsg', 'OTP verified successfully!');
    setTimeout(() => {
        showPage('resetPasswordPage');
    }, 1000);
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
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('error');
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        });
    });

    document.getElementById('agreeTerms').addEventListener('change', function () {
        const termsError = document.getElementById('termsError');
        termsError.classList.remove('show');
    });
});

//confirm password
function handleResetPassword(event) {
    event.preventDefault();
    clearAllErrors();

    const oldPassword = document.getElementById('oldPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmNewPassword = document.getElementById('confirmNewPassword').value.trim();

    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (!oldPassword) {
        showError('oldPassword', 'oldPasswordError', 'Enter your old password');
        return;
    }
    if (!newPassword || newPassword.length < 8) {
        showError('newPassword', 'newPasswordError', 'New password must be at least 8 characters');
        return;
    }
    if (newPassword !== confirmNewPassword) {
        showError('confirmNewPassword', 'confirmNewPasswordError', 'Passwords do not match');
        return;
    }

    if (registeredUser && registeredUser.password === oldPassword) {
        registeredUser.password = newPassword;
        localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
        showSuccess('resetSuccessMsg', 'Password updated successfully! Redirecting to login...');
        setTimeout(() => {
            showPage('loginPage');
        }, 1500);
    } else {
        showError('oldPassword', 'oldPasswordError', 'Old password is incorrect');
    }
}
