import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        home: 'home.html',
        trade: 'trade.html',
        account: 'account.html',
        transfer: 'transfer.html',
        membership: 'membership.html',
        deposit: 'deposit.html',
        withdraw: 'withdraw.html'
      }
    }
  }
});
