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
        this.adapters = this.options.adapters || new AdapterManager();
        this.modules = new AppRouter();
        this._i18n = new I18N();
        this.initI18N();

        // Internal application state initialization
        this._state = {};
        this._initStateFields();
        
        this._handleError = this._handleError.bind(this);
    }
    
    // -----------------------------------------------------------------------
    // Starts/stops application.
    // These methods should be overloaded in subclasses
    
    start(state){ return Promise.resolve(); }
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
    get defaultState(){ return this.options.defaultState || { locale: 'en' }; }
    
    /**
     * Updates the internal state of the application.
     */
    setState(state){
        const that = this;
        state = state || {};
        const path = that._state.path || state.path || '';
        return that.action('state', function(intent){
            for (let key in state){
                that._state[key] = state[key];
            }
            return that.modules.setPath(path)
            .then(function(){
                intent.resolve(that._state);
                return that._state;
            }, this._handleError);
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
        const locales = this._getI18NBundles();
        for (let locale in locales) {
            let batches = locales[locale] || {};
            for (let batchKey in batches){
                let batch = batches[batchKey];
                this._i18n.registerTranslations(locale, batchKey, batch); 
            }
        }
    }
    
    locales(){
        const locales = this._getI18NBundles();
        return Object.keys(locales);
    }
    
    /**
     * Returns internationalized messages for the specified bundle.
     */
    getMessages(bundleKey, bundle) {
        const locales = this._getI18NBundles();
        let locale = this.state.locale || this.defaultState.locale;
        if (!(locale in locales)){
            locale = this.defaultState.locale;
        }
        return this._i18n.getMessages(locale, bundleKey, bundle);
    }
    
    _getI18NBundles(){
        return this.options.i18n || {};
    }
    
    // -----------------------------------------------------------------------
    
    _handleError(err){
        console.log('ERROR!', err);
        throw err;
    } 
 
}
Intents.addTo(Application);

function copy(obj){
    return JSON.parse(JSON.stringify(obj));
}
