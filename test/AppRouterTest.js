import expect from 'expect.js';
import { AppRouter } from '../';
import { delay } from './TestUtils';

describe('AppRouter', function(){
    let array = [];
    class MyModule {
        constructor(options){
            this.options = options || {};
        }
        printParams(stage, params){
            array.push({
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
    let m;
    let modules;
    const paths = {
        admin : ':locale/admin/*path',
        map: ':locale/map/*path',
        root: ':locale/*path'
    };
    beforeEach(function(){
        m = new AppRouter();
        modules = {};
        for (let name in paths){
            let path = paths[name];
            let module = modules[name] = new MyModule({name});
            m.registerModule(path, module);
        }
    });
    
    it('should change the module state using the setState method', function(done) {
        array = [];
        m.setPath('fr/foo/bar').then(function(){
            expect(m.module).to.be(modules.root);
            expect(m.moduleParams).to.eql({
                path : 'foo/bar',
                locale : 'fr' 
            });
            // Check that the module handlers were really called
            expect(array).to.eql([{
                name : 'root',
                stage : 'activate',
                params : {
                    path : 'foo/bar',
                    locale : 'fr'
                }
            }]);
            array = [];
            return m.setPath('en/map/path/to/my/file.pdf');
        }).then(function(){
            expect(m.module).to.be(modules.map);
            expect(m.moduleParams).to.eql({
                path : 'path/to/my/file.pdf',
                locale : 'en' 
            });
            // Check that the module handlers were really called
            expect(array).to.eql([{
                name : 'root',
                stage: 'deactivate',
                params : {
                    path : 'foo/bar',
                    locale : 'fr'
                }
            }, {
                name : 'map',
                stage: 'activate',
                params : {
                    path : 'path/to/my/file.pdf',
                    locale : 'en'
                }
            }]);
            // Check that changes in the "moduleManager.path" field lead
            // to module activation/deactivation
            array = [];
            m.path = 'ru/admin/my/russian/ui';
        }).then(function(){
            return delay(10, function(){
                expect(m.module).to.be(modules.admin);
                expect(m.moduleParams).to.eql({
                    path : 'my/russian/ui',
                    locale : 'ru' 
                });
                // Check that the module handlers were really called
                expect(array).to.eql([{
                    name : 'map',
                    stage: 'deactivate',
                    params : {
                        path : 'path/to/my/file.pdf',
                        locale : 'en'
                    }
                }, {
                    name : 'admin',
                    stage: 'activate',
                    params : {
                        path : 'my/russian/ui',
                        locale : 'ru'
                    }
                }]);
            }).then(function(){
                // Check module updates
                array = [];
                m.path = 'en/admin/my/english/ui';
            });
        }).then(function(){
            return delay(10, function(){
                expect(m.module).to.be(modules.admin);
                expect(m.moduleParams).to.eql({
                    path : 'my/english/ui',
                    locale : 'en' 
                });
                // Check that the module handlers were really called
                expect(array).to.eql([{
                    name : 'admin',
                    stage: 'update',
                    params : {
                        path : 'my/english/ui',
                        locale : 'en'
                    }
                }]);
            });
        })
        //
        .then(function(){}).then(done, done);
    });
    it ('should accept partial methods implementations in module handlers', function(done){
        const modules = new AppRouter();
        let messages = [];
        function print(msg){
            messages.push(msg);
        }
        modules.registerModule('about', {
            activate(params) { print('Hello everybody!'); }
        });
        modules.registerModule('about/:member', {
            activate(params) { print('Hello ' + params.member + '!'); },
            deactivate(params) { print('Goodbye ' + params.member + '!'); },
            update(params, oldParams) {
                print('Goodbye ' + oldParams.member + 
                ' and hello ' + params.member + '!');
            }
        });
        modules.registerModule('info/*path', {
            activate(params) {
                print('Show content of the "' + params.path + '" file.');
            }
        });
        let promise = Promise.resolve();
        promise.then(function(){
            // Should print 'Hello everybody!' 
            return modules.setPath('about').then(function(){
                expect(messages).to.eql(['Hello everybody!']);
                messages = [];
            });
        }).then(function(){
            // Should print 'Hello John!' 
            return modules.setPath('about/John').then(function(){
                expect(messages).to.eql(['Hello John!']);
                messages = [];
            });
        }).then(function(){
            // Should print 'Goodbye John and hello Mary!' 
            return modules.setPath('about/Mary').then(function(){
                expect(messages).to.eql(['Goodbye John and hello Mary!']);
                messages = [];
            });
        }).then(function(){
            // Should print:
            // - 'Goodbye Mary!' 
            // - 'Show content of the "path/to/my/file.txt" file.'
            return modules.setPath('info/path/to/my/file.txt').then(function(){
                expect(messages).to.eql([
                    'Goodbye Mary!',
                    'Show content of the "path/to/my/file.txt" file.'
                ]);
                messages = [];
            });
        }).then(done, done);
    })

});
