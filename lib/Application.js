import { AdapterManager } from 'mosaic-adapters';
import { Navigation, NavHandler } from 'mosaic-navigation';
import { I18N } from 'mosaic-i18n';
import { Intents } from 'mosaic-intents';
import { PathMapper } from 'mosaic-pathmapper';

export default class Application extends Intents {
    
    constructor(options){
        super(options);
        this.options = options || {};
        this.adapters = new AdapterManager();
        this.i18n = new I18N();
        this.nav = new Navigation();
        this._screens = new PathMapper();
        let app = this;
        this.nav.register('mode', ':mode', new AppNavHandler({app,key:'mode'}));
        this.nav.register('theme', ':theme', new AppNavHandler({app,key:'theme'}));
        this.nav.register('locale', ':locale', new AppNavHandler({app,key:'locale'}));
        this.nav.setDependencies({
            'screen' : [ 'theme', 'mode', 'locale' ]
        });
        let modules = this.options.modules || [];
        modules.forEach(function(module){
            module(this);
        }, this);
    }
    
    registerScreen(pathMask, screen){
        this.nav.register('screen', pathMask, screen);
        return this;
    }
    registerScreens(screenMapping){
        for (let pathMask in screenMapping){
            let screen = screenMapping[pathMask];
            this.nav.register('screen', pathMask, screen);
        }
        return this;
    }
    
    setState(params){
        this.nav.setState(params);
    }
    
    get mode() { return this._mode; }
    set mode(mode) { this._forbidden('mode'); }
    
    get locale() { return this._locale; }
    set locale(locale) { this._forbidden('locale'); }

    get theme() { return this._theme; }
    set theme(theme) { this._forbidden('theme'); }

    getMessages(bundleKey, bundle) {
        return this.i18n.getMessages(this._locale, bundleKey, bundle);
    }
 
    _forbidden(field, value) {
        throw new Error(`The field '${field}' can not be changed directly. ` +
                `Use the app.setState({ ${field}:'value' }) method instead. `);
    }
    
}

class AppNavHandler {
    constructor(options) {
        this.app = options.app;
        this.key = options.key;
    }
    _setAppValues(params) {
        let key = this.key;
        let value = this[key];
        if (value !== params[key]) {
            this.app['_' + key] = this[key] = params[key];
        }
    }
    _getAppValues() {
        let key = this.key;
        if (this[key] !== this.app['_' + key]) {
            let state = {};
            state[key] = this.app['_' + key];
        }
    }
    activate(params){ return this._setAppValues(params); }
    update(params, prevParams){ return this._setAppValues(params); }
}

