import {PathOfTranslations} from './PathOfTranslations';
import {FileListLoaderConfig, FileListLoader} from 'file-list-loader';
import {LanguageCollection} from './LanguageCollection';
import {Languages} from './Languages';
import {LoadTranslations} from './LoadTranslations';

const DEFAULT_NAME = 'default';

export class TranslationsService {

    private languages: Languages;

    public constructor (
        private supportLanguages: string[],
        private defaultLanguage: string
    ) {

        this.languages = {};
        this.initializeLanguageCollections();
    }

    public async registerPath (path: PathOfTranslations) {
        const fileListLoader = this.buildFileLoader();
        await fileListLoader.addPaths(path);
        await LoadTranslations.load(fileListLoader, this.languages);
    }

    public get (key: string, language?: string, data?: { [key: string]: string }) {
        language = (language) ? language : DEFAULT_NAME;
        const languageCollection = this.languages[language];

        if (!languageCollection) {
            throw new Error('The language (' + language + ') doesn\'t exist in translation service.');
        }

        return languageCollection.get(key, data);
    }

    private initializeLanguageCollections () {
        this.supportLanguages.forEach((lang: string) => {
            this.languages[lang] = new LanguageCollection(lang);
            if (lang === this.defaultLanguage) {
                this.languages[DEFAULT_NAME] = this.languages[lang];
            }
        });
    }

    private buildFileLoader (): FileListLoader {
        const config: FileListLoaderConfig = {
            extensions: ['json'],
            useFilePathInId: true,
        };
        return new FileListLoader(config);
    }

}
