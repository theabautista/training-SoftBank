import path from "path";


export class FileReader {
    private filePath: string = '';
    private fileType: string | undefined = '';

    constructor(filePath: string) {
        this.fileType = filePath.split('.').pop();
        this.filePath = path.resolve(filePath);
    }

    public getFileContents = () => {

    }

}