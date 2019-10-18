As of version 2.13.0, Moment includes a typescript definition file.

Install via NPM

npm install moment
Import and use in your Typescript file
import * as moment from 'moment';

let now = moment().format('LLLL');
Note: If you have trouble importing moment

For Typescript 2.x try adding "moduleResolution": "node" in compilerOptions in your tsconfig.json file and then use any of the below syntax
import * as moment from 'moment';
import moment = require('moment');


For Typescript 1.x try adding "allowSyntheticDefaultImports": true in compilerOptions in your tsconfig.json file and then use the syntax
import moment from 'moment';
Locale Import

To use moment.locale you first need to import the language you are targeting.

import * as moment from 'moment';
import 'moment/locale/pt-br';

console.log(moment.locale()); // en
moment.locale('fr');
console.log(moment.locale()); // en
moment.locale('pt-BR');
console.log(moment.locale()); // pt-BR