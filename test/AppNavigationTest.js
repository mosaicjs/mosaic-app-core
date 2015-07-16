import expect from 'expect.js';
import { Application, AppNavigation } from '../';
import { delay } from './TestUtils';

describe('AppNavigation', function(){
    let state;
    let traces = [];
    let app;
    let nav;

    afterEach(function(){
        app = undefined;
        nav = undefined;
    });

    beforeEach(function(){
        app = new Application();
        app.on('state', function(intent){
            intent.then(function(s){
                state = s;
                expect(app.state).to.eql(s);
            });
        });
        nav = new AppNavigation({app});
    });

    class MyModule {
        constructor(options){
            this.options = options || {};
        }
        printParams(stage, params){
            traces.push({
                name : this.options.name,
                stage : stage,
                params : params
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
    
    function test(controls){
        expect(nav.url).to.eql(controls.url);
        expect(app.state).to.eql(controls.state);
        expect(state).to.eql(controls.state);
        expect(traces).to.eql(controls.traces);
        traces = [];
        state = undefined;
    }

    it('should update application state by changing URLs', function(done) {
        app.registerModule('a/*x', new MyModule({name:'a'}));
        app.registerModule('b/*y', new MyModule({name:'b'}));
        app.registerModule('*z', new MyModule({name:'root'}));
        
        // Updates the internal state (theme and mode)
        // but does not change modules
        nav.addUrlMask('config/:theme/:mode');
        // Updates the internal state (locale) and updates modules
        nav.addUrlMask(':locale/*path');
        
        return nav.setUrl('fr/a/foo/bar').then(function(){
            test({
                url : 'fr/a/foo/bar',
                state : {
                    locale : 'fr',
                    path : 'a/foo/bar'
                },
                traces : [{
                    name: 'a',
                    stage : 'activate',
                    params : {  x : 'foo/bar' }
                }],
            });
            return nav.setUrl('en/b/toto/titi');
        }).then(function(){
            test({
                url : 'en/b/toto/titi',
                state : {
                    locale : 'en',
                    path : 'b/toto/titi'
                },
                traces : [{
                    name: 'a',
                    stage : 'deactivate',
                    params : {  x : 'foo/bar' }
                }, {
                    name: 'b',
                    stage : 'activate',
                    params : {  y : 'toto/titi' }
                }],
            });
            return nav.setUrl('config/light/mobile');
        }).then(function(){
            test({
                url : 'config/light/mobile',
                state : {
                    locale : 'en',
                    theme : 'light',
                    mode : 'mobile',
                    // The last URL change don't touch the path
                    path : 'b/toto/titi'
                },
                traces : [{
                    name : 'b',
                    stage : 'update',
                    params : { y : 'toto/titi' }
                }],
            });
            return nav.setUrl('fr/blah-blah-blah/xxx');
        }).then(function(){
            test({
                url : 'fr/blah-blah-blah/xxx',
                state : {
                    locale : 'fr',
                    theme : 'light',
                    mode : 'mobile',
                    path : 'blah-blah-blah/xxx'
                },
                traces : [{
                    name: 'b',
                    stage : 'deactivate',
                    params : {  y : 'toto/titi' }
                },{
                    name: 'root',
                    stage : 'activate',
                    params : {  z : 'blah-blah-blah/xxx' }
                }],
            });
            // Check that direct state changes lead to path changes
            return app.setState({
                locale : 'en',
                theme : 'dark',
                mode : 'desktop'
            });
        }).then(function(){
            test({
                url : 'en/blah-blah-blah/xxx',
                state : {
                    locale : 'en',
                    theme : 'dark',
                    mode : 'desktop',
                    path : 'blah-blah-blah/xxx'
                },
                traces : [{
                    name : 'root',
                    stage : 'update',
                    params : { z : 'blah-blah-blah/xxx' }
                }],
            });
        })
        //
        .then(function(){}).then(done,done);
    });

});
