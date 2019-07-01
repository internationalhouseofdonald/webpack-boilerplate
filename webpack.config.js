module.exports = (env, argv) => {  
  if (argv.mode === 'development' && argv.hotOnly === true) {
    return require(`./webpack.hmr.config.js`);
  }
  if (argv.mode === 'development') {
    return require(`./webpack.development.config.js`);
  }
  if (argv.mode === 'production') {
    return require(`./webpack.production.config.js`);
  }
};