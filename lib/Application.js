import { AdapterManager } from 'mosaic-adapters';
import { Navigation } from 'mosaic-navigation';
import { I18N } from 'mosaic-i18n';
import { Intents } from 'mosaic-intents';

/**
 * The main super-class for applications. It accepts a list of modules in
 * application parameters. Each module should register additional "screens" in
 * the application (see the Screen class). The internal state of this
 * application is managed using the "setState" method which changes values of
 * the following (dynamic) application fields: 1) "path" - it reflects the
 * current active path of the application; path changes update screens 2) "mode" -
 * this field reflects a application visualization mode - like mobile, tablet,
 * desktop, embedded etc.; this field is just a string 3) "locale" defines
 * application internationalization (i18n); it defines the current application
 * locale and changes all messages provided by the "getMessages" object 4)
 */
export default class Application extends Intents {
    
    constructor(options){
        super(options);
        this.options = options || {};
        this.adapters = new AdapterManager();
        this.i18n = new I18N();
        this._registerStatesHandlers();
        let modules = this.options.modules || [];
        modules.forEach(function(module){
            module(this);
        }, this);
    }
    
    // -----------------------------------------------------------------------
    // Screens
    
    /**
     * Adds a new screen (a Screen class instance) to activate when the
     * specified path mask is changed.
     */
    registerScreen(pathMask, screen){
        this.nav.register('screen', pathMask, screen);
        return this;
    }
    /**
     * Registers multiple screens at once.
     */
    registerScreens(screenMapping){
        for (let pathMask in screenMapping){
            let screen = screenMapping[pathMask];
            this.nav.register('screen', pathMask, screen);
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
    setState(params){
        this._nextState = this._nextState || {};
        for (let key in params) {
            if (key === 'path') {
                key = 'screen';
            }
            this._nextState[key] = params[key];
        }
        if (!this._nextStatePromise) {
            this._nextStatePromise = Promise.resolve().then(function(){
                let state = this._nextState;
                delete this._nextState;
                delete this._nextStatePromise;
                return this.nav.setState(state);
            }.bind(this));
        }
        return this._nextStatePromise;
    }
    
    /**
     * This method defines active fields (mode, locale, theme, path etc) and
     * dependencies between them. The "path" field is bound to the "screen"
     * field - path changes leads to the screens activation/deactivation/etc.
     */ 
    _registerStatesHandlers(){
        this.nav = new Navigation();
        this._addStateFields('mode', 'locale', 'theme');
        this._setStateFieldsDependencies({
            'screen' : [ 'theme', 'mode', 'locale' ]
        });
        Object.defineProperty(this, 'screen', {
            enumerable : false,
            configurable : false,
            get : function(){
                let slot = this.nav.getActiveHandler('screen');
                return slot ? slot.handler : null;
            }.bind(this),
            set : function() {
                throw new Error('The "screen" field is read-only.');
            }
        });
        Object.defineProperty(this, 'path', {
            enumerable : false,
            configurable : false,
            get : function(){
                let slot = this.nav.getActiveHandler('screen');
                return slot ? slot.path : null;
            }.bind(this),
            set : function(value) {
                this.setState({
                    screen : value
                });
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

