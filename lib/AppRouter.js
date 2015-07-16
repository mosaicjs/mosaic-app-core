import Promise from 'promise';
import { PathMapper } from 'mosaic-pathmapper';

/**
 * This class allows to activate/deactivate/update modules associated with the
 * specified path masks by changing paths. It could be considered as a simple
 * "router" transforming paths changes into method calls.
 * 
 * <pre>
 * Example:
 *     const modules = new AppRouter();
 *     modules.registerModule('about', {
 *         activate(params) { console.log('Hello everybody!'); }
 *     });
 *     modules.registerModule('about/:member', {
 *         activate(params) { console.log('Hello ' + params.member + '!'); },
 *         deactivate(params) { console.log('Goodbye ' + params.member + '!'); },
 *         update(params, oldParams) {
 *             console.log('Goodbye ' + oldParams.member + 
 *             ' and hello ' + params.member + '!');
 *         }
 *     });
 *     modules.registerModule('info/*path', {
 *         activate(params) {
 *             console.log('Show content of the &quot;' + params.path + '&quot; file.');
 *         }
 *     });
 *     let promise = Promise.resolve();
 *     promise.then(function(){
 *         // Should print 'Hello everybody!' 
 *         return modules.setPath('about')
 *     }).then(function(){
 *         // Should print 'Hello John!' 
 *         return modules.setPath('about/John');
 *     }).then(function(){
 *         // Should print 'Goodbye John and hello Mary!' 
 *         return modules.setPath('about/Mary');
 *     }).then(function(){
 *         // Should print:
 *         // - 'Goodbye Mary!' 
 *         // - 'Show content of the &quot;path/to/my/file.txt&quot; file.'
 *         return modules.setPath('info/path/to/my/file.txt');
 *     });
 * </pre>
 */
export default class AppRouter {
    
    constructor(){
        this._modules = new PathMapper();
    }
    
    // -----------------------------------------------------------------------
    // Modules registration
    
    /**
     * Adds a new module (a AppModule class instance) to activate when the
     * specified path mask is changed.
     */
    registerModule(pathMask, module){
        this._modules.add(pathMask, module);
        return this;
    }
    
    /**
     * Registers multiple modules at once.
     */
    registerModules(moduleMapping){
        for (let pathMask in moduleMapping){
            let module = moduleMapping[pathMask];
            this.registerModule(pathMask, module);
        }
        return this;
    }

    // -----------------------------------------------------------------------
    // Module path

    get path(){ return this._activeSlot ? this._activeSlot.path : null; }
    set path(path) { return this.setPath(path); }
    setPath(path) {
        path = path || '';
        let slot = this._modules.find(path) || {
            obj: undefined,
            params : {}
        };
        if (slot) {
            slot.path = path;
        }
        return this._updateActiveSlot(slot);
    }
    
    // -----------------------------------------------------------------------
    // Currently active module and its parameters

    /** Returns the currently active module. */
    get module() { return this._activeSlot ? this._activeSlot.obj : null; }
    set module(m){
        throw new Error('Modules can not be changed directly. ' + 
                'Use the setPath(path) method instead.');
    }
    /** Returns parameters of the currently active module. */
    get moduleParams() { return this._activeSlot ? this._activeSlot.params : {}; }
    set moduleParams(m){
        throw new Error('Module parameters can not be changed directly. ' + 
                'Use the setPath(path) method instead. ' +
                'Module parameters are extracted from the specified path.' );
    }

    // -----------------------------------------------------------------------
    // Internal methods
    
    /**
     * This method activates/deactivates/updates application modules and returns
     * a promise with the result of the method executions.
     * Activation/de-activation/update methods are called in chain. It is called
     * when this router changes the path.
     */
    _updateActiveSlot(newSlot) {
        let prevModule = this._activeSlot ? this._activeSlot.obj : null;
        let prevParams = this._activeSlot ? this._activeSlot.params : null;
        this._activeSlot = newSlot;
        let module = this._activeSlot ? this._activeSlot.obj : null;
        let params = this._activeSlot ? this._activeSlot.params : null;
        let promise = Promise.resolve();
        if (prevModule === module){
            if (module && typeof module.update === 'function') {
                promise = promise.then(function(){
                    return module.update(params, prevParams);
                });
            }
        } else {
            if (prevModule && typeof prevModule.deactivate === 'function'){
                promise = promise.then(function(){
                    return prevModule.deactivate(prevParams);
                });
            }
            if (module && typeof module.activate === 'function') {
                promise = promise.then(function(){
                    return module.activate(params);
                });
            }
        }
        return promise;
    }

}