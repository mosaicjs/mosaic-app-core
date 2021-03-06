import Promise from 'promise';
import NavigationBar from './NavigationBar';

export default class BrowserNavigation {
    
    constructor(options){
        this.options = options || {};
        this.app = this.options.app;
        this._onUrlChange = this._onUrlChange.bind(this);
        this.nav = new NavigationBar({
            baseUrl : this.options.baseUrl,
            onChange : this._onUrlChange
        });
        this._onAppStateUpdated = this._onAppStateUpdated.bind(this);
        ['serializeState', 'parseState'].forEach(function(name) {
            if (typeof this.options[name] === 'function') {
                this[name] = this.options[name];
            }
        }.bind(this)); 
    }
    start() {
        const that = this;
        return Promise.resolve().then(function(){
            that.state = {};
            return that.nav.start();
        }).then(function(){
            that.app.addListener('state', that._onAppStateUpdated);
            return that.app.start(that.state).then(function(){
                that._started = true;
            });
        });
    }
    stop() {
        const that = this;
        return Promise.resolve().then(function(){
            return that.app.stop();
        }).then(function(){
            that.nav.stop();
            that.app.removeListener('state', this._onAppStateUpdated);
        });
    }

    // ------------------------------------------------------------------------
    
    _onUrlChange(url, nav) {
        const path = this.nav.relativeUrlFormatted;
        this.state = this.parseState(path);
        if (this._started){
            this.app.setState(this.state);
        }
    }
    
    _onAppStateUpdated(intent){
        const that = this;
        intent.then(function(){
            const state = that.app.state;
            const url = that.serializeState(state);
            that.nav.currentUrl = url;
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
