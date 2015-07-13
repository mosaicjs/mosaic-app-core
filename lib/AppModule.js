export default class Screen {
    constructor(options) {
        this.options = options || {}; 
        this.app = this.options.app;
        const fields = this.options.fields || {};
        for (let key in fields) {
            this[key] = fields[key];
        }
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