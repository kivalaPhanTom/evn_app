import 'dotenv/config'; // load .env tự động

export default ({ config }) => ({
  ...config,
  extra: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
});
