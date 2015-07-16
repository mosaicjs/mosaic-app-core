import Promise from 'promise';
export default {
    delay(timeout, method){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                try {
                    resolve(method());
                } catch (err){
                    reject(err);
                }
            }, timeout);
        });
    }
}
    