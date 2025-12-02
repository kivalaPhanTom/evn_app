// require('dotenv').config(); // Load .env

// module.exports = ({ config }) => ({
//   ...config,
//   name: "evn_app",
//   slug: "evn_app",
//   extra: {
//     ...config.extra,
//     API_BASE_URL: process.env.API_BASE_URL,
//   },
// });
import 'dotenv/config'; // load .env tự động

module.exports = ({ config }) => ({
  ...config,
  name: "evn_app",
  slug: "evn_app",
  android: {
    ...config.android,
    package: "com.duynguyendinh.evnapp", // <--- Bắt buộc
  },
  extra: {
    ...config.extra,
    API_BASE_URL: process.env.API_BASE_URL,
  },
});
