// babel.config.js
module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // 1) load your .env → @env
        ['module:react-native-dotenv', {
          moduleName: '@env',
          path: '.env',
          allowUndefined: true,
        }],
        // 2) reanimated (if you’re using it; otherwise you can drop this line)
        'react-native-reanimated/plugin',
      ],
    };
  };
  