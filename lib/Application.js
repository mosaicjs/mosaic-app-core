import { AdapterManager } from 'mosaic-adapters';
import { PathMapper } from 'mosaic-pathmapper';
import { I18N } from 'mosaic-i18n';
import { Intents } from 'mosaic-intents';

/**
 * The main super-class for applications. The internal state of this application
 * is managed using the "setState" method which changes values of the following
 * (dynamic) application fields: 1) "path" - it reflects the current active path
 * of the application; path changes lead to module activation/de-activation or
 * an update 2) "mode" - this field reflects an application visualization mode -
 * like mobile, tablet, desktop, embedded etc.; this field is just a string 3)
 * "locale" defines application internationalization (i18n); it defines the
 * current application locale and changes all messages provided by the
 * "getMessages" object 4) "theme" field is used to update
 */
export default class Application extends Intents {
    
    constructor(options){
        super(options);
        this.options = options || {};
        this.adapters = new AdapterManager();
        this.i18n = new I18N();
        this._modules = new PathMapper();
        
        // Internal application state initialization
        this._state = {};
        this.on('state', this._onUpdateState.bind(this));
        this._initStateFields();
    }
    
    // -----------------------------------------------------------------------
    // Modules
    
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

    /**
     * Returns the current application state.
     */
    getState(){
        return JSON.parse(JSON.stringify(this._state));
    }
    
    /**
     * Updates the internal state of the application.
     */
    setState(state){
        let that = this;
        that._nextState = that._nextState || {};
        for (let type in state) {
            that._nextState[type] = state[type];
        }
        if (!that._nextStateIntent) {
            that._nextStateIntent = that.action('state', that._nextState,
            function(intent){
                return Promise.resolve().then(function(){
                    for (let type in that._nextState) {
                        that._state[type] = that._nextState[type];
                    }
                    delete that._nextState;
                    delete that._nextStateIntent;
                    return that._state;
                })
            });
        }
        return that._nextStateIntent;
    }
    
    /**
     * This method is called when the application changes its internal state.
     */
    _onUpdateState(intent) {
        const that = this;
        intent.after(function(){
            let prevModule = that._activeSlot ? that._activeSlot.obj : null;
            let prevParams = that._activeSlot ? that._activeSlot.params : null;
            delete that._activeSlot;
            
            that._activeSlot = that._modules.find(that.path);
            let module = that._activeSlot ? that._activeSlot.obj : null;
            let params = that._activeSlot ? that._activeSlot.params : null;
            
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
        });
    }    
    
    /**
     * This method defines active fields (path, mode, locale, theme etc) and
     * dependencies between them.
     */ 
    _initStateFields(){
        const index = {};
        const stateFields = this.options.stateFields || [];
        ['path', ...stateFields].forEach(function(key){
            index[key] = true;
        });
        this._setStateFields(Object.keys(index));
    }
    
    /**
     * Adds multiple active fields.
     * 
     * @param keys
     *            an array of active field names
     */
    _setStateFields(keys){
        if (!Array.isArray(keys)) {
            keys = arguments;
        }
        for (let i=0, len=keys.length; i<len; i++) {
            this._addStateField(keys[i]);
        }
    }
    
    /**
     * Adds a new active field. Changes of active fields leads to updates in
     * hierarchy of dependent modules.
     */
    _addStateField(key){
        const that = this;
        Object.defineProperty(that, key, {
            enumerable : false,
            configurable : false,
            get : function(){
                return that._state[key];
            },
            set : function(value) {
                const state = {};
                state[key] = value;
                return that.setState(state);
            }
        });
    }

    // -----------------------------------------------------------------------
    
    /**
     * Returns internationalized messages for the specified bundle.
     */
    getMessages(bundleKey, bundle) {
        return this.i18n.getMessages(this._locale, bundleKey, bundle);
    }
 
}

