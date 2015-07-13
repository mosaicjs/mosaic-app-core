import { AdapterManager } from 'mosaic-adapters';
import { PathMapper, PathFormatter } from 'mosaic-pathmapper';
import { Navigation } from 'mosaic-navigation';
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
        this._registerStatesHandlers();
        this.urlMask = this.options.urlMask;
    }
    
    // -----------------------------------------------------------------------
    // URL management
    
    /**
     * Returns an URL mask used to format URLs when the app changes its state.
     * This mask is initialized using the 'urlMask' field in the application
     * options.
     */ 
    get urlMask() { return this._urlMask || ''; }
    /** Sets a new URL mask */
    set urlMask(mask) { this.setUrlMask(mask); }
    /** Sets a new URL mask and activates application state change. */
    setUrlMask(mask) {
        this._urlMask = mask || '';
        this._urlMapper = new PathMapper();
        this._urlMapper.add(this._urlMask, {});
        return this.setUrl(this.url);
    }
    
    /**
     * Returns the current URL reflecting the application state. To format this
     * URL the 'urlMask' field is used.
     */
    get url() {
        let state = this.getState();
        let url = PathFormatter.formatPath(this.urlMask, state);
        return url;
    }
    /**
     * Sets a new URL reflecting the application state. To extract individual
     * state values from this URL the 'urlMask' field is used. This method
     * initializes the application state change.
     */
    set url(url) { this.setUrl(url); }
    setUrl(url) {
        let promise;
        if (this._urlMapper) {
            let result = this._urlMapper.find(url);
            if (result) {
                promise = this.setState(result.params);
            }        
        }
        return promise || Promise.resolve();
    }
    
    // -----------------------------------------------------------------------
    // Modules
    
    /**
     * Adds a new module (a AppModule class instance) to activate when the
     * specified path mask is changed.
     */
    registerModule(pathMask, module){
        this.nav.register('path', pathMask, module);
        return this;
    }
    
    /**
     * Registers multiple modules at once.
     */
    registerModules(moduleMapping){
        for (let pathMask in moduleMapping){
            let module = moduleMapping[pathMask];
            this.nav.register('path', pathMask, module);
        }
        return this;
    }
    
    // -----------------------------------------------------------------------

    /**
     * Returns the current application state.
     */
    getState(){
        let result = {};
        let slots = this.nav.getAllActiveHandlers();
        for (let type in slots){
            let slot = slots[type];
            result[type] = slot.path;
        }
        return result;
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
                        const state = that._nextState; 
                        delete that._nextState;
                        delete that._nextStateIntent;
                        return that.nav.setState(state);
                    });
                }
            );
        }
        return that._nextStateIntent;
    }
    
    /**
     * This method defines active fields (mode, locale, theme, path etc) and
     * dependencies between them.
     */ 
    _registerStatesHandlers(){
        this.nav = new Navigation();
        this._addStateFields('mode', 'locale', 'theme');
        this._setStateFieldsDependencies({
            'path' : [ 'theme', 'mode', 'locale' ]
        });
        Object.defineProperty(this, 'path', {
            enumerable : false,
            configurable : false,
            get : function(){
                let slot = this.nav.getActiveHandler('path');
                return slot ? slot.path : null;
            }.bind(this),
            set : function(value) {
                this.setState({ 'path' : value });
                return value;
            }.bind(this)
        });
    }
    
    /**
     * Defines dependencies between fields.
     */
    _setStateFieldsDependencies(key, dependencies){
        this.nav.setDependencies(key, dependencies);
    }
    
    /**
     * Adds multiple active fields.
     * 
     * @param keys
     *            an array of active field names
     */
    _addStateFields(keys){
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
        let app = this;
        let properties;
        app.nav.register(key, ':' + key, {
            activate : function(props){ properties = props || {}; },
            deactivate : function(props){ properties = {}; },
            update : function(props){ properties = props || {}; },
        });
        Object.defineProperty(app, key, {
            enumerable : false,
            configurable : false,
            get : function(){ return properties[key]; },
            set : function(value) {
                let state = {};
                state[key] = value;
                app.setState(state);
                return value;
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

