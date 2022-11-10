import {Transaction, Account} from './Models';
import { Accounts } from './Account';

export class SupportBankInterface {
    private accountNames: string[] = [];
    private transactionsFromFile: Transaction[] = [];
    private accounts: Account[] = [];

    constructor(transactionsFromFile: Transaction[]) {
        this.transactionsFromFile = transactionsFromFile;
        this.accountNames = [...new Set(this.transactionsFromFile.map(item => item.from))];
        this.accounts = this.getAllAccountTransactions();
    }

    private getAllAccountTransactions = (): Account[] => {
        let allAccounts = [];
        for (let i=0; i < this.accountNames.length; i++) {
            let allTransactions: Transaction[] = this.transactionsFromFile.reduce((transactions: Transaction[], currentTransaction: Transaction) => {
                if (currentTransaction.from === this.accountNames[i] || currentTransaction.to === this.accountNames[i]) {
                    transactions.push(currentTransaction);
                }
                return transactions;
            }, []);
            allAccounts.push({
                name: this.accountNames[i],
                transactions: allTransactions,
            })
        }
        return allAccounts;
    }

    public ListAll(): void {
        let accountsCalc = new Accounts();
        this.accounts.forEach(rec => {
            console.log(rec.name, ':', accountsCalc.calculateBalance(rec).toFixed(2))
        })
    }

    public ListAccount = (name: string): void => {
        console.log("Showing all transactions for ", name);
        let relevantAccount = this.accounts.find(account => account.name.toLowerCase() === name);
        console.log(relevantAccount? relevantAccount.transactions : "Account does not exist");
    }
};
