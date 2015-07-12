import expect from 'expect.js';
import { Application } from '../';

describe('Application', function(){
    it('should return default values', function(done) {
        let states = [];
        class MyScreen {
            constructor(options) {
                this.options = options || {}; 
                this.app = this.options.app;
            }
            get name() { return this.options.name; }
            printParams(stage, params){
                states.push({
                    name: this.options.name,
                    stage: stage,
                    params: params,
                    locale: this.app.locale,
                    theme: this.app.theme,
                    mode: this.app.mode
                });
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
            expect(states).to.eql([{
                stage: 'activate',
                name: 'admin',
                params: { path : 'path/to/my/file.txt' } ,
                locale: 'fr',
                theme: 'dark',
                mode: 'mobile'
            }]);
            states = [];
            return app.nav.setState({
                'locale': 'en',
                'mode' : 'desktop'
            });
        }).then(function(){
            expect(states).to.eql([{
                stage: 'update',
                name: 'admin',
                params: { path : 'path/to/my/file.txt' } ,
                locale: 'en',
                theme: 'dark',
                mode: 'desktop'
            }]);
            states = [];
            return app.nav.setState({
                'theme': 'light',
                'mode' : 'desktop',
                'screen' : 'map/company/ubimix.md'
            });
        }).then(function(){
            expect(states).to.eql([{
                stage: 'deactivate',
                name: 'admin',
                params: { path : 'path/to/my/file.txt' } ,
                locale: 'en',
                theme: 'light',
                mode: 'desktop'
            },{
                stage: 'activate',
                name: 'map',
                params: { path : 'company/ubimix.md' } ,
                locale: 'en',
                theme: 'light',
                mode: 'desktop'
            }]);
        }).then(done, done);
    });
});
