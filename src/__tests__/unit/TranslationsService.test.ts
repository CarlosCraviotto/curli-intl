import chai = require('chai');
//import { ImportMock } from 'ts-mock-imports';

import {TranslationsService} from '../../TranslationsService';

let translation: TranslationsService;

describe('TranslationsService class tests', function () {

    beforeEach(() => {
        translation = new TranslationsService(['en', 'es'], 'en');
    });

    it('Should get normals keys', async function () {
        await translation.registerPath({path: 'src/__tests__/files/user'});
        chai.assert.deepEqual('Name', translation.get('name'));
        chai.assert.deepEqual('Nombre', translation.get('name','es'));
    });

    it('Should get template keys', async function () {
        await translation.registerPath({path: 'src/__tests__/files/user'});

        chai.assert.deepEqual(
            'El nombre santo no es valido.',
            translation.get('invalidName', 'es', {name: 'santo'})
        );
    });

    it('Should throw error cos it is loading files with same keys', async function () {
        await translation.registerPath({path: 'src/__tests__/files/user'});

        await translation.registerPath({path: 'src/__tests__/files/otherUser'}).catch((e: Error)=>{
            chai.assert.deepEqual('The key name already exist.', e.message);
        });
    });

    it('Should throw error when try to open a file with a language not supported', async function () {
        const errorMessage = 'The file with id \'fr\' has not a valid language ' +
                                'file name or is not in the list of languages supported.'

        await translation.registerPath({path: 'src/__tests__/files/noLanguageFind'}).catch((e: Error)=>{
            chai.assert.deepEqual(errorMessage, e.message);
        });
    });


//    it('Should throw an error if the TranslationsService', function () {
//        chai.assert.throws(function () {
//            TranslationsService.otherMehotd();
//        }, 'Unexpected end of JSON input');
//    });

});
