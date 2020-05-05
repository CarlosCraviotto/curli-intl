import {DTOType} from 'curli-types';


export class LanguageCollection {

    private keys: DTOType;

    public constructor(private lang: string) {
        this.keys = {};
    }

    public buildKeysFromFileContent(fileContent: DTOType) {

        for (let key in fileContent) {

            if (this.keys.hasOwnProperty(key)) {
                throw new Error('The key ' + key + ' already exist.');
            }
            this.keys[key] = fileContent[key];
        }

    }

    public getLang(): string {
        return this.lang;
    }

    public get(key: string, data?: DTOType): string | undefined {
        let content = this.keys[key];
        if (data && content) {
            content = this.injectDataIntoContent(content, data);
        }
        return content;
    }


    private injectDataIntoContent (content: string, data: DTOType) {
        const matches = content.match(/\{\{([a-z]+)\}\}/gi);

        if (matches) {
            content = this.applyMatchesInItem(matches, data, content);
        }

        return content;
    }

    private applyMatchesInItem (matches: RegExpMatchArray, data: DTOType, content: string) {

        for (let i = 0; i < matches.length; i++) {
            //get the name of the var without {{}} ( {name} => name )
            let varName = matches[i].replace(/(\{\{)([a-z]+)(\}\})/gi, "$2");
            //check if the name of the var exist into the options
            content = this.applyMatchInItem(data, varName, matches, i, content);
        }
        return content;
    }

    private applyMatchInItem (data: DTOType, varName:string, matches: RegExpMatchArray, i: number, content: string) {
        if (data.hasOwnProperty(varName)) {
            let regExpression = new RegExp(matches[i], "gi");
            //replace the the name of the var with the content of thar var into options
            content = content.replace(regExpression, data[varName]);
        }
        return content;
    }

}