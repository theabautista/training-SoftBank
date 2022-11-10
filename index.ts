import moment from 'moment';
import { parse } from 'csv-parse/sync';
import { SupportBankInterface } from './SupportBankInterface';
import * as path from 'path';
import * as fs from 'fs';
import {Transaction} from "./Models";
let readlineSync = require('readline-sync');
moment().format();

( () => {
    const csvFilePath = path.resolve('./Transactions2014.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    let transactionsList = parse(fileContent, { delimiter: '\n'});
    transactionsList.shift();

    let transactions: Transaction[] = [];
    for (let i = 0; i < transactionsList.length; i++) {
        let entry = parse(transactionsList[i][0], {delimiter: ','});
        let t: Transaction = {
            date: moment(entry[0][0], 'DD-MM-YYYY'),
            from: entry[0][1],
            to: entry[0][2],
            narrative: entry[0][3],
            amount: parseFloat(entry[0][4]),
        }
        transactions.push(t);
    }

    let supportBankInterface = new SupportBankInterface(transactions);

    let command = readlineSync.question('Enter command: ');
    command = command.toLowerCase();
    if (command.includes("list")) {
        let name = command.replace("list ","")
        if ( name === "all") {
            supportBankInterface.ListAll();
        } else {
            supportBankInterface.ListAccount(name);
        }
    } else{
        console.error('Enter correct command');
    }

}) ();



