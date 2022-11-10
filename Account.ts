import { Account, Transaction } from './Models';

export class Accounts {

    public calculateBalance(account: Account): Number {
        let totalAmount = 0;
        account.transactions.forEach(rec => {
            if (rec.to === account.name) {
                totalAmount += rec.amount;
            } else {
                totalAmount -= rec.amount;
            }
        })
        return totalAmount;
    }
}
