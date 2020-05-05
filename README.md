# curli-intl

[![Build Status](https://travis-ci.org/CarlosCraviotto/curli-intl.svg?branch=master)](https://travis-ci.com/github/CarlosCraviotto/curli-intl)

Typed internationalization (intl/i18n) library for TypeScript/JavaScript apps and Curli Framework.


### Installation

Install by `npm`

```sh
npm install --save curli-intl
```

#### Basic Usage

**1 - In the configurations file, declare  de followings properties:**

**@SUPPORT_LANGUAGES**: (Array<string>) A list with the supported languages.
**@DEFAULT_LANGUAGE** (string) The default language we will use if we aren't providing it in the get method.


**2 - Add the module definer:**

```typescript
import {TranslationsModuleDefiner} from "curli-intl";

  app.addModules(new TranslationsModuleDefiner(app));

```


**3 - Attach translation files paths to the service**

```typescript
public registerTranslations(translationsService: TranslationsService): void {
    dataMappers.registerPath({path: 'languages/'});
}
```

**4 - Get the translation**

```typescript
const name = this.container.get('translations').get('name');
```



#### Commands

 - `npm run build`: Build the project (Translations).
 - `npm run build:clean`: Delete first the dist folder and build it.
 - `npm run clean`: Delete the dist folder.
 - `npm run test`: Execute the tests.
 - `npm run test:coverage`:  Execute the tests and calculate the coverage.
 - `npm run lint`: Check the code using the rules in .eslintre.js
 - `npm run lint:fix`: Check the code and try to fix it.



#### Contributing

When submitting your pull-request try to follow those guides:

- https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github
- https://medium.com/@vadimdemedes/making-your-first-contribution-de6576ddb190

  
#### License

MIT