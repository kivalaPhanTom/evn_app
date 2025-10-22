module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // ...existing plugins...
        ['module-resolver', {
          root: ['./'],
          alias: {
            '@': './src'
          }
        }]
      ],
    };
  };