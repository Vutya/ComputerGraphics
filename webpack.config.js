const path= require('path');

module.exports = {
    mode: 'development',
    entry: './balls_easel/src/index.js',
    output: {
        filename: 'balls_easel.js',
        path: path.resolve(__dirname, 'balls_easel'),
        libraryTarget: 'var',
        library: 'mylib'
    }
};