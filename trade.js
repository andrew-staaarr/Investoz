import { checkAuth, supabase } from './config.js';

const user = checkAuth();

document.getElementById('username').textContent = user.username;
document.getElementById('vip-level').textContent = user.vip_level;
document.getElementById('balance-amount').textContent = parseFloat(user.balance).toFixed(2) + ' USDT';

const vipLimits = {
    'VIP1': { daily: 10, monthly: 50 },
    'VIP2': { daily: 100, monthly: 3000 },
    'VIP3': { daily: 30000, monthly: 900000 },
    'VIP4': { daily: 100000, monthly: 3000000 },
    'VIP5': { daily: 200000, monthly: 6000000 },
    'VIP6': { daily: 2000000, monthly: 50000000 }
};

const limits = vipLimits[user.vip_level] || vipLimits['VIP1'];
document.getElementById('daily-limit').textContent = limits.daily.toFixed(2) + ' USDT';
document.getElementById('monthly-limit').textContent = limits.monthly.toFixed(2) + ' USDT';

const dayButtons = document.querySelectorAll('.day-btn');
dayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        dayButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const days = btn.dataset.days;
        const yield_rate = btn.dataset.yield;

        document.getElementById('annual-yield').textContent = yield_rate + '%';
        document.getElementById('investment-period').textContent = days + 'Day';
    });
});

const usernames = ['3o***', 't9***', 'cl***', 'pd***', 'p1***', '3h***', 'v4***', 'dc***', 'n3***', 'e7***',
                   'kx***', 'mn***', 'qw***', 'zx***', 'rt***', 'uy***', 'fg***', 'jk***', 'lp***', 'bn***'];
const actions = ['withdraw', 'recharge'];

function generateRandomRecord() {
    const username = usernames[Math.floor(Math.random() * usernames.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const amount = Math.floor(Math.random() * 50000) + 1000;
    const date = new Date();

    return { username, action, amount, date };
}

async function loadPlatformRecords() {
    const recordList = document.getElementById('record-list');
    recordList.innerHTML = '';

    try {
        const { data, error } = await supabase
            .from('platform_records')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) throw error;

        const records = data || [];

        while (records.length < 15) {
            const randomRecord = generateRandomRecord();
            records.push({
                username: randomRecord.username,
                action: randomRecord.action,
                amount: randomRecord.amount,
                created_at: randomRecord.date.toISOString()
            });
        }

        records.forEach(record => {
            const item = document.createElement('div');
            item.className = 'record-item';

            const date = new Date(record.created_at);
            const dateStr = date.toISOString().split('T')[0];

            item.innerHTML = `
                <div class="record-left">
                    <div class="record-icon ${record.action}">
                        ${record.action === 'withdraw' ? '💳' : '💰'}
                    </div>
                    <div class="record-info">
                        <div class="record-username">${record.username}</div>
                        <div class="record-action">${record.action}</div>
                    </div>
                </div>
                <div class="record-right">
                    <div class="record-amount">${parseFloat(record.amount).toFixed(0)} USDT</div>
                    <div class="record-date">${dateStr}</div>
                </div>
            `;

            recordList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading platform records:', error);
    }
}

function updateRecordsLive() {
    const recordList = document.getElementById('record-list');

    if (Math.random() > 0.7) {
        const randomRecord = generateRandomRecord();

        const item = document.createElement('div');
        item.className = 'record-item';

        const dateStr = randomRecord.date.toISOString().split('T')[0];

        item.innerHTML = `
            <div class="record-left">
                <div class="record-icon ${randomRecord.action}">
                    ${randomRecord.action === 'withdraw' ? '💳' : '💰'}
                </div>
                <div class="record-info">
                    <div class="record-username">${randomRecord.username}</div>
                    <div class="record-action">${randomRecord.action}</div>
                </div>
            </div>
            <div class="record-right">
                <div class="record-amount">${randomRecord.amount.toFixed(0)} USDT</div>
                <div class="record-date">${dateStr}</div>
            </div>
        `;

        recordList.insertBefore(item, recordList.firstChild);

        if (recordList.children.length > 20) {
            recordList.removeChild(recordList.lastChild);
        }
    }
}

loadPlatformRecords();
setInterval(updateRecordsLive, 5000);
