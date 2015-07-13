export default class Screen {
    constructor(options) {
        this.options = options || {}; 
        this.app = this.options.app;
    }
    get name() { return this.options.name; }
    activate(params){
        return Promise.resolve();
    }
    update(params){
        return Promise.resolve();
    }
    deactivate(params){
        return Promise.resolve();
    }
}