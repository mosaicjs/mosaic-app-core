import expect from 'expect.js';
import { Application } from '../';

class MyScreen {
    constructor(options) {
        this.options = options || {}; 
        this.app = this.options.app;
    }
    get name() { return this.options.name; }
    printParams(msg, params){
        console.log('---------------------------------');
        console.log('* ', this.options.name, msg);
        console.log('  - params: ', params);
        console.log('  - locale: ', this.app.locale);
        console.log('  -  theme: ', this.app.theme);
        console.log('  -   mode: ', this.app.mode);
    }
    activate(params){
        this.printParams('activate', params);
    }
    update(params){
        this.printParams('update', params);
    }
    deactivate(params){
        this.printParams('deactivate', params);
    }
}

describe('Application', function(){
    it('should return default values', function(done) {
        let app = new Application({
            modules: [function(app) {
                app.registerScreen('admin/*path', new MyScreen({app, name: 'admin'}));
                app.registerScreen('map/*path', new MyScreen({app, name: 'map'}));
            }]
        });
        app.nav.setState({
             'mode': 'mobile',
             'theme' : 'dark',
             'locale' : 'fr',
             'screen' : 'admin/path/to/my/file.txt'
        }).then(function(){
            app.locale = 'en';
            return app.nav.setState({
                'theme': 'light',
                'mode' : 'desktop',
                'screen' : 'map/company/ubimix.md'
            });
        }).then(function(){
            setTimeout(done, 100);
        }).then(null, done);
    });
});
