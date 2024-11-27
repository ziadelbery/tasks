function showRegistration() {
  document.getElementById('login').classList.add('hidden');
  document.getElementById('register').classList.remove('hidden');
}

function showLogin() {
  document.getElementById('register').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
}

function register() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (!name || !email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  if (!email.includes('@')) {
    alert('Invalid email address.');
    return;
  }

  if (localStorage.getItem(email)) {
    alert('Email is already registered. Please use another email.');
    return;
  }

  const user = { name, email, password };
  localStorage.setItem(email, JSON.stringify(user));
  alert('Registration successful! Please login.');
  showLogin();
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  const user = localStorage.getItem(email);

  if (!user) {
    alert('User not found. Please register first.');
    return;
  }

  const parsedUser = JSON.parse(user);

  if (parsedUser.password !== password) {
    alert('Incorrect password.');
    return;
  }

  document.getElementById('welcome-message').textContent = `Welcome, ${parsedUser.name}!`;
  document.getElementById('login').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');
}

function logout() {
  document.getElementById('home').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}
