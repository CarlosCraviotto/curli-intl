import chai = require('chai');
//import { ImportMock } from 'ts-mock-imports';

import {TranslationsModuleDefiner} from '../../TranslationsModuleDefiner';
import {
    CurliApplication,
    DependencyInjection,
    DependencyInjectionMock,
    CurliApplicationMock
} from 'curli-types';

let translationsModuleDefiner: TranslationsModuleDefiner;
let curliApplication: CurliApplication;
let container: DependencyInjection;

describe('TranslationsModuleDefiner class tests', function () {

    beforeEach(() => {
        curliApplication = new CurliApplicationMock();
        container = new DependencyInjectionMock();
        curliApplication.setContainer(container);
        translationsModuleDefiner = new TranslationsModuleDefiner(curliApplication);
    });

    it('Should return right static values', function () {
        chai.assert.deepEqual('registerTranslations', translationsModuleDefiner.getMethodName());
        chai.assert.deepEqual('TranslationsModuleDefiner', translationsModuleDefiner.getName());
        chai.assert.deepEqual('before:start', translationsModuleDefiner.whenCallMethodInModules());
    });


//    it('Should throw an error if the TemplatesModuleDefiner', function () {
//        chai.assert.throws(function () {
//            templatesModuleDefiner.otherMehotd();
//        }, 'Unexpected end of JSON input');
//    });

});
