import { AdapterManager } from 'mosaic-adapters';
import { Navigation, NavHandler } from 'mosaic-navigation';
import { I18N } from 'mosaic-i18n';
import { Intents } from 'mosaic-intents';
import { PathMapper } from 'mosaic-pathmapper';

class AppNavHandler {
    constructor(options) {
        this.app = options.app;
        this.key = options.key;
        this.app.on('navupdate', function(){ this._onAppChange(); }.bind(this));
    }
    _setAppValues(params) {
        let key = this.key;
        let value = this[key];
        if (value !== params[key]) {
            this.app[key] = this[key] = params[key];
        }
    }
    _getAppValues() {
        let key = this.key;
        if (this[key] !== this.app[key]) {
            let state = {};
            state[key] = this.app[key];
        }
    }
    activate(params){ return this._setAppValues(params); }
    update(params, prevParams){ return this._setAppValues(params); }
    _onAppChange(){
        let params = this._getAppValues();
        if (params){
            this.nav.setState(params);
        }
    }
}

class ScreenHandler extends AppNavHandler {
    _callScreen(method, params) {
        let info = this.app._findScreen(params.path);
        return Promise.resolve().then(function(){
            if (!info) return ;
            let screen = info.obj;
            if (typeof screen[method] !== 'function') return ;
            return screen[method](info.params);            
        });
    }
    activate(params){ return this._callScreen('activate', params);  }
    update(params){ return this._callScreen('update', params);  }
    deactivate(params){ return this._callScreen('deactivate', params);  }
    _onAppChange(){ }
}

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
        this.nav.register('screen', '*path', new ScreenHandler({app}));
        this.nav.setDependencies({
            'screen' : [ 'theme', 'mode', 'locale' ]
        });
        let modules = this.options.modules || [];
        modules.forEach(function(module){
            module(this);
        }, this);
    }
    
    registerScreen(pathMask, screen){
        this._screens.add(pathMask, screen);
        return this;
    }
    registerScreens(screenMapping){
        for (let pathMask in screenMapping){
            this.registerScreen(pathMask, screenMapping[pathMask]);
        }
        return this;
    }
    _findScreen(path) {
        let info = this._screens.find(path);
        return info;
    }
    
    get mode() { return this._mode; }
    set mode(mode) { return this.setMode(mode); }
    setMode(mode){ return this._updateField('_mode', mode); }
    
    get locale() { return this._locale; }
    set locale(locale) { return this.setLocale(locale); }
    setLocale(locale){ return this._updateField('_locale', locale); }

    get theme() { return this._theme; }
    set theme(theme) { return this.setTheme(theme); }
    setTheme(theme){ return this._updateField('_theme', theme); }

    getMessages(bundleKey, bundle) {
        return this.i18n.getMessages(this._locale, bundleKey, bundle);
    }
 
    _updateField(field, value) {
        let oldValue = this[field];
        if (oldValue !== value) {
            this[field] = value;
            this.emit('navupdate', {
                oldValue,
                newValue : value
            });
        }
        return this;
    }
    
}

