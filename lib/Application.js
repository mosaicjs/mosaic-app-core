import Promise from 'promise';
import { AdapterManager } from 'mosaic-adapters';
import { PathMapper } from 'mosaic-pathmapper';
import { I18N } from 'mosaic-i18n';
import { Intents, Singleton } from 'mosaic-intents';
import AppRouter from './AppRouter';

/**
 * The main super-class for applications. The internal state of this application
 * is managed using the "setState" method which changes values. Users can define
 * their own state fields. The application notify about state changes by firing
 * the 'state' intent.
 * <p>
 * There are the following important fields defined internally:
 * </p>
 * <ol>
 * <li> "path" - it reflects the current active path of the application; path
 * changes lead to activation/de-activation/update of modules registered with
 * the "registerModule" method.</li>
 * <li>"locale" defines application internationalization (i18n); it defines the
 * current application locale and changes all messages provided by the
 * "getMessages" method</li>
 * </ol>
 */
export default class Application {
    
    constructor(options){
        Intents(this);
        this.options = options || {};
        this.adapters = new AdapterManager();
        this.modules = new AppRouter();
        this.i18n = new I18N();
        this.initI18N();

        // Internal application state initialization
        this._state = {};
        this._initStateFields();
    }
    
    // -----------------------------------------------------------------------
    // Starts/stops application.
    // These methods should be overloaded in subclasses
    
    start(){ return Promise.resolve(); }
    stop(){ return Promise.resolve(); }
    
    // -----------------------------------------------------------------------

    registerModule(pathMask, module){
        this.modules.registerModule(pathMask, module);
    }
    
    // -----------------------------------------------------------------------
    // Internal state management

    /**
     * Returns the current application state.
     */
    getState(){ return this.state; }
    get state(){ return copy(this._state); }
    
    /**
     * Updates the internal state of the application.
     */
    setState(state){
        const that = this;
        for (let type in state) {
            that._state[type] = state[type];
        }
        return that.action('state', function(intent){
            return that.modules.setPath(that._state.path)
            .then(function(){
                intent.resolve(that._state);
                return that._state;
            });
        });
    }
    
    /**
     * This method defines active fields (path, mode, locale, theme etc) and
     * dependencies between them.
     */ 
    _initStateFields(){
        const index = {};
        const stateFields = this.options.stateFields || [];
        ['path', 'locale', ...stateFields].forEach(function(key){
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

    initI18N(){
        const i18n = this.options.i18n || {};
        for (let locale in i18n) {
            let batches = i18n[locale] || {};
            for (let batchKey in batches){
                let batch = batches[batchKey];
                this.i18n.registerTranslations(locale, batchKey, batch); 
            }
        }
    }
    
    /**
     * Returns internationalized messages for the specified bundle.
     */
    getMessages(bundleKey, bundle) {
        const locale = this.getState().locale;
        return this.i18n.getMessages(locale, bundleKey, bundle);
    }
 
}
Intents.addTo(Application);

function copy(obj){
    return JSON.parse(JSON.stringify(obj));
}
