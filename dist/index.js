"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const sync_1 = require("csv-parse/sync");
const SupportBankInterface_1 = require("./SupportBankInterface");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let readlineSync = require('readline-sync');
(0, moment_1.default)().format();
(() => {
    const csvFilePath = path.resolve('./Transactions2014.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    let transactionsList = (0, sync_1.parse)(fileContent, { delimiter: '\n' });
    transactionsList.shift();
    let transactions = [];
    for (let i = 0; i < transactionsList.length; i++) {
        let entry = (0, sync_1.parse)(transactionsList[i][0], { delimiter: ',' });
        let t = {
            date: (0, moment_1.default)(entry[0][0], 'DD-MM-YYYY'),
            from: entry[0][1],
            to: entry[0][2],
            narrative: entry[0][3],
            amount: parseFloat(entry[0][4]),
        };
        transactions.push(t);
    }
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