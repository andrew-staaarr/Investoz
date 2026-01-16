// login.js - auto login with fake/test user

// Hardcoded fake user (matches your existing test data)
const fakeUser = {
  id: "7bc186b1-1545-43ce-bd6f-ac948ae399aa",
  username: "cek622",
  password: "password123",     // can keep it or remove
  balance: 7660222.00,
  deposit: 184497.5,
  vip_level: "VIP6",
  created_at: "2026-01-14 04:18:54.476489+00"
};

// Save to localStorage immediately
localStorage.setItem('currentUser', JSON.stringify(fakeUser));

// Redirect to home page right away
window.location.href = 'home.html';