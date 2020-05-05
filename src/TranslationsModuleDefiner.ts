import {ModulesDefiner, Module, ApplicationEvents, CurliApplication, DependencyInjection} from 'curli-types';
import {TranslationsService} from "./TranslationsService";

const SERVICE_NAME = 'translations';
const SUPPORT_LANGUAGES_PROPERTY_NAME = '@SUPPORT_LANGUAGES';
const DEFAULT_LANGUAGE_PROPERTY_NAME = '@DEFAULT_LANGUAGE';

export class TranslationsModuleDefiner implements ModulesDefiner {

    private container: DependencyInjection | undefined;
    private translationsService: TranslationsService | undefined;

    public constructor(private app: CurliApplication) {
    }

    getName(): string {
        return "TranslationsModuleDefiner";
    }

    beforeCallModules(): void {
        this.container = this.app.getContainer();
        this.container.registerService(SERVICE_NAME,[
            SUPPORT_LANGUAGES_PROPERTY_NAME,
            DEFAULT_LANGUAGE_PROPERTY_NAME
        ],TranslationsService);

        this.translationsService = this.container.get(SERVICE_NAME);
    }

    callMethodInModules(module: Module): void {
        module.registerTemplates(this.translationsService);
    }

    afterCallModules(): void {
    }

    getMethodName(): string {
        return "registerTranslations";
    }

    whenCallMethodInModules(): ApplicationEvents {
        return 'before:start';
    }
}