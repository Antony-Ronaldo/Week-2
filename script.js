const form = document.getElementById('registerForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

const userError = document.getElementById('userError');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');
const successMsg = document.getElementById('successMsg');

// Simple, robust email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  validateForm();
});

// Clear individual field error on input
[username, email, password].forEach((el) => {
  el.addEventListener('input', () => {
    const errorEl = document.getElementById(el.id + 'Error');
    if (errorEl) { errorEl.textContent = ''; }
    el.removeAttribute('aria-invalid');
    successMsg.textContent = '';
  });
});

function focusFirstInvalid() {
  const firstInvalid = document.querySelector('[aria-invalid="true"]');
  if (firstInvalid) firstInvalid.focus();
}

function validateForm() {
  let isValid = true;

  userError.textContent = '';
  emailError.textContent = '';
  passError.textContent = '';
  successMsg.textContent = '';

  if (username.value.trim() === '') {
    userError.textContent = 'Username cannot be empty';
    username.setAttribute('aria-invalid', 'true');
    isValid = false;
  }

  if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = 'Invalid email format';
    email.setAttribute('aria-invalid', 'true');
    isValid = false;
  }

  if (password.value.length < 6) {
    passError.textContent = 'Minimum 6 characters required';
    password.setAttribute('aria-invalid', 'true');
    isValid = false;
  }

  if (!isValid) {
    focusFirstInvalid();
    return;
  }

  // On success
  successMsg.textContent = 'Registration successful';
  form.reset();
  // remove any lingering aria-invalid
  [username, email, password].forEach(el => el.removeAttribute('aria-invalid'));
}
