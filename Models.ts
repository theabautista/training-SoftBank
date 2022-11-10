import moment from 'moment';
moment().format();

export type Account = {
    name: string;
    transactions: Transaction[];
}

export type Transaction = {
    date: moment.MomentInput;
    from: string;
    to: string;
    narrative: string;
    amount: number;
}
