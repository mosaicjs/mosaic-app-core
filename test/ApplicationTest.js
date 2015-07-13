import expect from 'expect.js';
import { Application, Screen } from '../';

describe('Application', function(){
    let states = [];
    class MyScreen extends Screen {
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
    let app;
    beforeEach(function(){
        app = new Application({
            modules: [function(app) {
                app.registerScreen('admin/*path', new MyScreen({app, name: 'admin'}));
                app.registerScreen('map/*path', new MyScreen({app, name: 'map'}));
                app.registerScreen('*path', new MyScreen({app, name: 'root'}));
            }]
        });
    });
    
    function delay(timeout, method){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                try {
                    resolve(method());
                } catch (err){
                    reject(err);
                }
            }, timeout);
        });
    }
    
    it('should change the application state using the setState method', function(done) {
        states = [];
        app.setState({
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
            expect(app.locale).to.eql('fr');
            expect(app.theme).to.eql('dark');
            expect(app.mode).to.eql('mobile');
            expect(app.getState()).to.eql({
                'locale': 'fr',
                'theme' : 'dark',
                'mode' : 'mobile',
                'screen' : 'admin/path/to/my/file.txt'
            });
            states = [];
            return app.setState({
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
            expect(app.path).to.eql('admin/path/to/my/file.txt');
            expect(app.locale).to.eql('en');
            expect(app.theme).to.eql('dark');
            expect(app.mode).to.eql('desktop');
            expect(app.getState()).to.eql({
                'locale': 'en',
                'theme' : 'dark',
                'mode' : 'desktop',
                'screen' : 'admin/path/to/my/file.txt'
            });
            states = [];
            return app.setState({
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
            expect(app.path).to.eql('map/company/ubimix.md');
            expect(app.locale).to.eql('en');
            expect(app.theme).to.eql('light');
            expect(app.mode).to.eql('desktop');
            expect(app.getState()).to.eql({
                'locale': 'en',
                'theme' : 'light',
                'mode' : 'desktop',
                'screen' : 'map/company/ubimix.md'
            });
            states = [];
            return app.setState({
                'screen' : 'foo/bar'
            });
        }).then(function(){
            expect(states).to.eql([
              {
                name: 'map',
                stage: 'deactivate',
                params: { path: 'company/ubimix.md' },
                locale: 'en',
                theme: 'light',
                mode: 'desktop'
              },{
                name: 'root',
                stage: 'activate',
                params: { path: 'foo/bar' },
                locale: 'en',
                theme: 'light',
                mode: 'desktop'
              }
            ]);
            expect(app.path).to.eql('foo/bar');
            expect(app.locale).to.eql('en');
            expect(app.theme).to.eql('light');
            expect(app.mode).to.eql('desktop');
            expect(app.getState()).to.eql({
                'locale': 'en',
                'theme' : 'light',
                'mode' : 'desktop',
                'screen' : 'foo/bar'
            });
        }).then(done, done);
    });
    
    it('should change the application state using fields', function(done) {
        states = [];
        app.setState({
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
           app.locale = 'en';
           app.mode = 'desktop';
           app.theme = 'light';
           app.path = 'map/company/ubimix.md';
       }).then(function(){
           // We have to use a timeout because the state notifications
           // arrive using promises (with delays; in the next clock tick)
           return delay(10, function(){
               expect(states).to.eql([{
                   stage: 'deactivate',
                   name: 'admin',
                   params: { path : 'path/to/my/file.txt' } ,
                   locale: 'en',
                   theme: 'light',
                   mode: 'desktop'
               }, {
                   stage : 'activate',
                   name : 'map',
                   params : { path : 'company/ubimix.md' },
                   locale : 'en',
                   theme : 'light',
                   mode : 'desktop'
               }]);
               expect(app.path).to.eql('map/company/ubimix.md');
               expect(app.locale).to.eql('en');
               expect(app.mode).to.eql('desktop');
               expect(app.theme).to.eql('light');
               states = [];
               app.locale = 'it';
           });
       }).then(function(){
           // We have to use a timeout because the state notifications
           // arrive using promises (with delays; in the next clock tick)
           return delay(10, function(){
               expect(states).to.eql([{
                   stage : 'update',
                   name : 'map',
                   params : { path : 'company/ubimix.md' },
                   locale : 'it',
                   theme : 'light',
                   mode : 'desktop'
               }]);
               expect(app.path).to.eql('map/company/ubimix.md');
               expect(app.locale).to.eql('it');
               expect(app.mode).to.eql('desktop');
               expect(app.theme).to.eql('light');
               states = [];
           });
       }).then(function(){}).then(done, done);
    });

});
