import { checkAuth } from './config.js';

const user = checkAuth();

document.getElementById('account-username').textContent = user.username;
document.getElementById('account-vip').textContent = user.vip_level;
document.getElementById('account-balance').textContent = parseFloat(user.balance).toFixed(2);
document.getElementById('account-deposit').textContent = parseFloat(user.deposit).toFixed(1);
