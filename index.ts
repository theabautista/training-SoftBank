import moment from 'moment';
import { SupportBankInterface } from './SupportBankInterface';
import {FileReader} from "./FileReader";
let readlineSync = require('readline-sync');
moment().format();

( () => {
    let filePath = './Transactions2014.csv';
    let fileReader = new FileReader(filePath);
    let transactions = fileReader.getFileContents();

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



