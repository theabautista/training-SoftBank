import {Transaction, TransactionFromCSV, Account} from './Models';
import moment from "moment/moment";

export class SupportBankInterface {
    private accountNames: string[] = [];
    private transactionsFromFile: TransactionFromCSV[] = [];
    private accounts: Account[] = [];

    constructor(transactionsFromFile: TransactionFromCSV[]) {
        this.transactionsFromFile = transactionsFromFile;
        this.accountNames = [...new Set(this.transactionsFromFile.map(item => item.from))];
        this.accounts = this.getAllAccountTransactions();
    }

    private getAllAccountTransactions = (): Account[] => {
        let allAccounts = [];
        for (let name in this.accountNames) {
            let allTransactions: Transaction[] = this.transactionsFromFile.reduce((transactions: Transaction[], currentTransaction: TransactionFromCSV) => {
                if (currentTransaction.from === name) {
                    let mappedValue = this.mapTransactionFromCSVToTransaction(currentTransaction);
                    transactions.push(mappedValue);
                }
                return transactions;
            }, []);
            allAccounts.push({
                name: name,
                transactions: allTransactions,
            })
        }
        return allAccounts;
    }

    private mapTransactionFromCSVToTransaction = (transactionFromCSV: TransactionFromCSV): Transaction => {
        return {
            date: transactionFromCSV.date,
            to: transactionFromCSV.to,
            narrative: transactionFromCSV.narrative,
            amount: transactionFromCSV.amount,
        }
    }

    public ListAll(): void {
        return
    }

    public ListAccount = (name: string): void => {
        console.log("Showing all transactions for ", name);
        let relevantAccount = this.accounts.find(account => account.name === name);
        console.log(relevantAccount? relevantAccount.transactions : "Account does not exist");
    }
};
