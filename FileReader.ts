import * as path from "path";
import fs from "fs";
import {parse} from "csv-parse/sync";
import {Transaction} from "./Models";
import moment from "moment/moment";


export class FileReader {
    private filePath: string = '';
    private fileType: string | undefined = '';
    private transactions: any[] = [];

    constructor(filePath: string) {
        this.fileType = filePath.split('.').pop();
        this.filePath = path.resolve(filePath);

        switch (this.fileType) {
            case 'csv': {
                this.readCSVFile(this.filePath);
            }
        }
    }

    private readCSVFile = (csvFilePath: string): void => {
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
        this.transactions = transactions;
    }

    public getFileContents = (): any[] => {
        return this.transactions;
    }

}