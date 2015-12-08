import URL from 'url';

export default class NavigationBar {
    
    constructor(options){
        this.options = options || {};
        this._onUrlChange = this._onUrlChange.bind(this);
    }
    
    start(){
        window.addEventListener('popstate', this._onUrlChange, this);
        this._onUrlChange();
    }
    
    stop(){
        window.removeEventListener('popstate', this._onUrlChange, this);
    }
    
    // ------------------------------------------------------------------------

    _onUrlChange(ev) {
        const urlFormatted = this.currentUrlFormatted;
        if (this._currentUrlFormatted !== urlFormatted) {
            this._currentUrlFormatted = urlFormatted;
            if (typeof this.options.onChange === 'function') {
                this.options.onChange(this.currentUrl, this);
            }
        }
    }
    
    // ------------------------------------------------------------------------
    
    get relativeUrl(){
        const current = this.currentUrlFormatted;
        const base = this.baseUrlFormatted;
        return URL.parse(current.substring(base.length));
    }

    get relativeUrlFormatted(){
        return URL.format(this.relativeUrl);
    }

    // ------------------------------------------------------------------------
    
    /** Returns the current URL. */
    get currentUrl() {
        const url = URL.parse(this.currentUrlFormatted, true);
        return url;
    }
    get currentUrlFormatted(){
        return window.location.href + '';
    }
    
    set currentUrl(url) {
        url = url || '';
        if (typeof url === 'object') {
            url = URL.format(url);
        }
        if (window.history) {
            const formattedUrl = URL.resolve(this.baseUrlFormatted, url);
            console.log('XXXXXXXXXXXX', this.baseUrlFormatted, '[' + url + ']', formattedUrl);
            const objUrl = URL.parse(formattedUrl);
            window.history.replaceState(objUrl, formattedUrl, formattedUrl);
        }
    }
    
    // ------------------------------------------------------------------------

    /** Returns the base URL. */
    get baseUrl() {
        return URL.parse(this.baseUrlFormatted);
    }
    
    get baseUrlFormatted() {
        if (!this._baseUrl) {
            const url = this.currentUrlFormatted;
            const baseUrl = this.options.baseUrl || '';
            this._baseUrl = URL.resolve(url, baseUrl);
        }
        return this._baseUrl;
    }

    // ------------------------------------------------------------------------
    
}