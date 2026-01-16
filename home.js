import { checkAuth } from './config.js';

checkAuth();

const cryptoData = {
    'BTC/USDT': { price: 95521.16, change: -0.01, icon: '₿' },
    'ETH/USDT': { price: 3338.7, change: 0, icon: 'Ξ' },
    'DOGE/USDT': { price: 0.149194, change: -0.04, icon: 'Ð' },
    'EOS/USDT': { price: 0.5284, change: -0.25, icon: 'E' },
    'LTC/USDT': { price: 78.88, change: 0, icon: 'Ł' },
    'BCH/USDT': { price: 618.08, change: 0.02, icon: 'B' },
    'XRP/USDT': { price: 2.17724, change: -0.02, icon: 'X' },
    'ETC/USDT': { price: 13.2782, change: 0, icon: 'E' }
};

function updateCryptoPrices() {
    Object.keys(cryptoData).forEach(symbol => {
        const data = cryptoData[symbol];
        const randomChange = (Math.random() - 0.5) * 0.5;
        data.price = data.price * (1 + randomChange / 100);
        data.change = data.change + (Math.random() - 0.5) * 0.1;
    });

    document.getElementById('btc-price').textContent = cryptoData['BTC/USDT'].price.toFixed(2);
    document.getElementById('btc-change').textContent = cryptoData['BTC/USDT'].change.toFixed(2) + '%';
    document.getElementById('btc-change').className = 'crypto-change ' + (cryptoData['BTC/USDT'].change >= 0 ? 'positive' : 'negative');

    document.getElementById('eth-price').textContent = cryptoData['ETH/USDT'].price.toFixed(1);
    document.getElementById('eth-change').textContent = cryptoData['ETH/USDT'].change.toFixed(2) + '%';
    document.getElementById('eth-change').className = 'crypto-change ' + (cryptoData['ETH/USDT'].change >= 0 ? 'positive' : 'negative');

    document.getElementById('doge-price').textContent = cryptoData['DOGE/USDT'].price.toFixed(6);
    document.getElementById('doge-change').textContent = cryptoData['DOGE/USDT'].change.toFixed(2) + '%';
    document.getElementById('doge-change').className = 'crypto-change ' + (cryptoData['DOGE/USDT'].change >= 0 ? 'positive' : 'negative');

    renderMarketList();
}

function renderMarketList() {
    const marketList = document.getElementById('market-list');
    marketList.innerHTML = '';

    Object.keys(cryptoData).forEach(symbol => {
        const data = cryptoData[symbol];
        const item = document.createElement('div');
        item.className = 'market-item';

        item.innerHTML = `
            <div class="market-currency">
                <div class="currency-icon">${data.icon}</div>
                <span class="currency-name">${symbol}</span>
            </div>
            <div class="market-price">${data.price.toFixed(data.price < 1 ? 6 : 2)}</div>
            <div class="market-change ${data.change >= 0 ? 'positive' : 'negative'}">${data.change.toFixed(2)}%</div>
        `;

        marketList.appendChild(item);
    });
}

renderMarketList();
setInterval(updateCryptoPrices, 3000);
