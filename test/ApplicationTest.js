import expect from 'expect.js';
import { Application, AppModule } from '../';
import { delay } from './TestUtils';

describe('Application', function(){
    let app;
    let prev;
    let next;
    beforeEach(function(){
        app = new Application({ stateFields: ['theme', 'locale', 'mode'] });
        app.on('state', function(intent){
            prev = app.state;
            intent.then(function(state){
                next = app.state;
                expect(state).to.eql(next);
            });
        });
    });
    
    function test(p, n){
        expect(p).to.eql(prev);
        expect(n).to.eql(next);
        for (let key in n) {
            expect(app[key]).to.eql(n[key]);
        }
        prev = undefined;
        next = undefined;
    }
    
    it('should change the application state using the setState method', function(done) {
        app.setState({
             'mode': 'mobile',
             'theme' : 'dark',
             'locale' : 'fr'
        }).then(function(){
            test({}, {
                'mode' : 'mobile',
                'theme' : 'dark',
                'locale' : 'fr'
            });
            return app.setState({
                'locale': 'en',
                'mode' : 'desktop'
            });
        }).then(function(){
            test({
                'mode' : 'mobile',
                'theme' : 'dark',
                'locale' : 'fr'
            }, {
                'locale' : 'en',
                'theme' : 'dark',
                'mode' : 'desktop'
            });
            return app.setState({
                'locale' : 'fr',
                'theme': 'light'
            });
        }).then(function(){
            test({
                locale: 'en',
                theme: 'dark',
                mode: 'desktop'
            }, {
                locale: 'fr',
                theme: 'light',
                mode: 'desktop'
            });
        }).then(done, done);
    });
    
    it('should change the application state using fields', function(done) {
        app.setState({
            'mode': 'mobile',
            'theme' : 'dark',
            'locale' : 'fr'
       }).then(function(){
           test({}, {
               'mode' : 'mobile',
               'theme' : 'dark',
               'locale' : 'fr'
           });           
           app.locale = 'en';
           app.mode = 'desktop';
           app.theme = 'light';
       }).then(function(){
           // We have to use a timeout because the state notifications
           // arrive using promises (with delays; in the next clock tick)
           return delay(10, function(){
               test({
                   'mode' : 'mobile',
                   'theme' : 'dark',
                   'locale' : 'fr'
               }, {
                   'mode' : 'desktop',
                   'theme' : 'light',
                   'locale' : 'en'
               });
           });
       }).then(function(){}).then(done, done);
    });

});
