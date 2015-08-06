module.exports = {
    entry : __dirname + '/index.js',
    output : {
        path : __dirname + '/dist',
        filename : 'index.js',
        libraryTarget : 'umd'
    },
    module : {
        loaders : [ {
            test : /\.jsx?$/,
            exclude : /node_modules/,
            loader : 'babel?optional[]=runtime'
        } ]
    },
    externals : [ "promise", "mosaic-adapters", "mosaic-i18n",
            "mosaic-intents", "mosaic-pathmapper", "node-libs-browser" ]
};
