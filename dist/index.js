"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const SupportBankInterface_1 = require("./SupportBankInterface");
const FileReader_1 = require("./FileReader");
let readlineSync = require('readline-sync');
(0, moment_1.default)().format();
(() => {
    // const csvFilePath = path.resolve('./Transactions2014.csv');
    // const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    // let transactionsList = parse(fileContent, { delimiter: '\n'});
    // transactionsList.shift();
    //
    // let transactions: Transaction[] = [];
    // for (let i = 0; i < transactionsList.length; i++) {
    //     let entry = parse(transactionsList[i][0], {delimiter: ','});
    //     let t: Transaction = {
    //         date: moment(entry[0][0], 'DD-MM-YYYY'),
    //         from: entry[0][1],
    //         to: entry[0][2],
    //         narrative: entry[0][3],
    //         amount: parseFloat(entry[0][4]),
    //     }
    //     transactions.push(t);
    // }
    let filePath = './Transactions2014.csv';
    let fileReader = new FileReader_1.FileReader(filePath);
    let transactions = fileReader.getFileContents();
    let supportBankInterface = new SupportBankInterface_1.SupportBankInterface(transactions);
    let command = readlineSync.question('Enter command: ');
    command = command.toLowerCase();
    if (command.includes("list")) {
        let name = command.replace("list ", "");
        if (name === "all") {
            supportBankInterface.ListAll();
        }
        else {
            supportBankInterface.ListAccount(name);
        }
    }
    else {
        console.error('Enter correct command');
    }
})();
//# sourceMappingURL=index.js.map