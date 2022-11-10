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
exports.FileReader = void 0;
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
const sync_1 = require("csv-parse/sync");
const moment_1 = __importDefault(require("moment/moment"));
class FileReader {
    constructor(filePath) {
        this.filePath = '';
        this.fileType = '';
        this.transactions = [];
        this.readCSVFile = (csvFilePath) => {
            const fileContent = fs_1.default.readFileSync(csvFilePath, { encoding: 'utf-8' });
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
            this.transactions = transactions;
        };
        this.getFileContents = () => {
            return this.transactions;
        };
        this.fileType = filePath.split('.').pop();
        this.filePath = path.resolve(filePath);
        switch (this.fileType) {
            case 'csv': {
                this.readCSVFile(this.filePath);
            }
        }
    }
}
exports.FileReader = FileReader;
//# sourceMappingURL=FileReader.js.map