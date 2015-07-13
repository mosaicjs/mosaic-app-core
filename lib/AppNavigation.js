import Promise from 'promise';
import { PathMapper, PathFormatter } from 'mosaic-pathmapper';

/**
 * This class provides mapping of URLs to the internal application state. It is
 * possible to define multiple URL mappings for one application.
 */ 
export default class AppModule {
    
    constructor(options) {
        this.options = options || {}; 
        this.app = this.options.app;
        this.urlMask = this.options.urlMask;
    }

    /** Adds a new URL listener. */
    addListener(listener){
        this.app.on('state', listener);
    }
    /** Removes an URL listener. */
    removeListener(listener){
        this.app.off('state', listener);
    }
    
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
        let state = this.app.getState();
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
                promise = this.app.setState(result.params);
            }        
        }
        return promise || Promise.resolve();
    }
    
}