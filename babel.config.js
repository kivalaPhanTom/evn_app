module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Plugin dotenv để load biến môi trường
      // ['module:react-native-dotenv', {
      //   moduleName: '@env',
      //   path: '.env',
      //   safe: false,       // true nếu muốn kiểm tra tất cả biến có trong .env.example
      //   allowUndefined: true
      // }],
      // Plugin module-resolver hiện tại của bạn
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': './src',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      ],
      'expo-router/babel',   // 🚨 BẮT BUỘC — đặt cuối danh sách
    ],
  };
};
