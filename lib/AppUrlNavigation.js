import Promise from 'promise';
import LocationBar from 'location-bar';
import AppNavigation from './AppNavigation';

export default class AppUrlNavigation extends AppNavigation {
    constructor(options){
        super(options);
        this._locationBar = new LocationBar(); 
        this._locationBar.onChange(function(path) {
            this.setUrl(path, true);
        }.bind(this));
        this._onAppStateUpdate = this._onAppStateUpdate.bind(this); 
        if (this.options.urlMask){
            this.addUrlMask(this.options.urlMask);
        }
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
            that.app.addListener('state', that._onAppStateUpdate);
            return that.app.start();
        }).then(function(){
            that._locationBar.start(that.locationOptions);
        });
    }
    stop() {
        const that = this;
        return Promise.resolve().then(function(){
            that.app.removeListener('state', this._onAppStateUpdate);
            return that.app.stop();
        });
    }
    _onAppStateUpdate(intent){
        const that = this;
        intent.then(function(){
            that._locationBar.update(that.url, {
                trigger : false,
                replace : true
            }); 
        });
    }
}
