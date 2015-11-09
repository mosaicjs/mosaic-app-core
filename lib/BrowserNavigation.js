import Promise from 'promise';
import LocationBar from 'location-bar';

export default class BrowserNavigation {
    
    constructor(options){
        this.options = options || {};
        this.app = this.options.app;
        this._locationBar = new LocationBar(); 
        this._locationBar.onChange(function(path) {
            const state = this.parseState(path);
            this.app.setState(state);
        }.bind(this));
        this._onAppStateUpdated = this._onAppStateUpdated.bind(this);
        ['serializeState', 'parseState'].forEach(function(name) {
            if (typeof this.options[name] === 'function') {
                this[name] = this.options[name];
            }
        }.bind(this)); 
    }
    get locationOptions() {
        return this.options.locationOptions || {
            // pushState: true,
            hashChange: true,
            root: "/",
        };
    } 
    start() {
        const that = this;
        return Promise.resolve().then(function(){
            that.app.addListener('state', that._onAppStateUpdated);
            return that.app.start();
        }).then(function(){
            that._locationBar.start(that.locationOptions);
        });
    }
    stop() {
        const that = this;
        return Promise.resolve().then(function(){
            that.app.removeListener('state', this._onAppStateUpdated);
            return that.app.stop();
        });
    }
    _onAppStateUpdated(intent){
        const that = this;
        intent.then(function(){
            const state = that.app.state;
            const url = that.serializeState(state);
            that._locationBar.update(url, {
                trigger : false,
                replace : true
            }); 
        });
    }
    
    /**
     * Serializes and returns the specified application state object as a
     * string.
     */
    serializeState(state){
        return "";
    }
    /** Parses the specified path and returns an application state object. */ 
    parseState(path){
        return {};
    }
}
