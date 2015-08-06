import Promise from 'promise';
import { PathFormatter } from 'mosaic-pathmapper';
import { Intents } from 'mosaic-intents';
import AppRouter from './AppRouter';

/**
 * Navigation is responsible for transforming URLs to the internal application
 * state.
 */
export default class AppNavigation {
    
    /**
     * @param options.app
     *            the application
     * @param options.locationOptions
     *            location bar options
     */
    constructor(options){
        const that = this; 
        that.options = options || {};
        that.app = that.options.app;
        that._router = new AppRouter();
    }

    /** Provides access to the current URL */
    get url() {
        const module = this._router.module;
        let url;
        if (module) {
            const urlMask = module.urlMask;
            const params = this.app.state;
            params.path = this.app.path;
            url = PathFormatter.formatPath(urlMask, params);
        }
        return url;
    }
    set url(url) { return this.setUrl(url); }
    setUrl(url, force){
        if (this._router.path !== url || force) {
            return this._router.setPath(url).then(function(){
                return url;
            });
        } else {
            return Promise.resolve(url);
        }
    }

    addUrlMask(urlMask){
        const that = this;
        that._router.registerModule(urlMask, {
            urlMask,
            _setState(params){ return that.app.setState(params); },
            activate(params){ return this._setState(params); }, 
            update(params){ return this._setState(params); } 
        });
    }
    
}