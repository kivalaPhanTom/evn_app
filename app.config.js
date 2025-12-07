import 'dotenv/config';

export default ({ config }) => ({
  ...config,
   android: {
    ...config.android,
    package: "com.evn.evnapp",
  },
  extra: {
    ...config.extra, // giữ các giá trị từ app.json
    API_BASE_URL: process.env.API_BASE_URL || "https://mygenco3-api.genco3.com/"
  }
});
