import { checkAuth } from './config.js';

checkAuth();


function openPaymentModal(plan, amount) {
    document.getElementById('modal-plan-level').textContent = plan.toUpperCase();
    document.getElementById('modal-plan-amount').textContent = amount + ' USDT';
    document.getElementById('payment-modal').style.display = 'flex';
}
