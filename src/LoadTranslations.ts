import {FileListLoader} from "file-list-loader/index";
import {Languages} from "./Languages";

export class LoadTranslations {

    public static async load(fileListLoader: FileListLoader, languages: Languages) {
        const files = fileListLoader.getListOfFiles();

        for (let fileName in files){
            const file = files[fileName];
            const languageOfFile = file.id.split('_').pop();

            if (languageOfFile && languages.hasOwnProperty(languageOfFile)) {
                const fileContent = await fileListLoader.getFileContent(file.id, true);
                languages[languageOfFile].buildKeysFromFileContent(JSON.parse(fileContent));
            } else {
                this.throwError(file);
            }
        }
    }

    private static throwError(file: any): never {
        throw new Error(
        'The file with id \'' +file.id+ '\' has not a valid language ' +
        'file name or is not in the list of languages supported.'
        );
    }
}