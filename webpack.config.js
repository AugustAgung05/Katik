const path = require('path');

module.exports = {
    entry: './public/src/script.js',  // Path ke file JavaScript utama
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),  // Output file akan berada di folder 'dist'
    },
    mode: 'production', //  Dapat diisi 'development' atau 'production'
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',  // Pastikan Babel terpasang jika menggunakan fitur ES6+
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
    