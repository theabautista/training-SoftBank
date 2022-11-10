"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accounts = void 0;
class Accounts {
    calculateBalance(account) {
        let totalAmount = 0;
        account.transactions.forEach(rec => {
            if (rec.to === account.name) {
                totalAmount += rec.amount;
            }
            else {
                totalAmount -= rec.amount;
            }
        });
        return totalAmount;
    }
}
exports.Accounts = Accounts;
//# sourceMappingURL=Account.js.map