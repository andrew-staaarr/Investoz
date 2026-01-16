import { checkAuth } from './config.js';

const user = checkAuth();

document.getElementById('transfer-balance').textContent = parseFloat(user.balance).toFixed(2) + ' tether(USDT)';
