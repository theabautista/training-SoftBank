"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportBankInterface = void 0;
const Account_1 = require("./Account");
class SupportBankInterface {
    constructor(transactionsFromFile) {
        this.accountNames = [];
        this.transactionsFromFile = [];
        this.accounts = [];
        this.getAllAccountTransactions = () => {
            let allAccounts = [];
            for (let i = 0; i < this.accountNames.length; i++) {
                let allTransactions = this.transactionsFromFile.reduce((transactions, currentTransaction) => {
                    if (currentTransaction.from === this.accountNames[i] || currentTransaction.to === this.accountNames[i]) {
                        transactions.push(currentTransaction);
                    }
                    return transactions;
                }, []);
                allAccounts.push({
                    name: this.accountNames[i],
                    transactions: allTransactions,
                });
            }
            return allAccounts;
        };
        this.ListAccount = (name) => {
            console.log("Showing all transactions for ", name);
            let relevantAccount = this.accounts.find(account => account.name.toLowerCase() === name);
            console.log(relevantAccount ? relevantAccount.transactions : "Account does not exist");
        };
        this.transactionsFromFile = transactionsFromFile;
        this.accountNames = [...new Set(this.transactionsFromFile.map(item => item.from))];
        this.accounts = this.getAllAccountTransactions();
    }
    ListAll() {
        let accountsCalc = new Account_1.Accounts();
        this.accounts.forEach(rec => {
            console.log(rec.name, ':', accountsCalc.calculateBalance(rec).toFixed(2));
        });
    }
}
exports.SupportBankInterface = SupportBankInterface;
;
//# sourceMappingURL=SupportBankInterface.js.map