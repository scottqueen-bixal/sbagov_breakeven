const testConfig = {
  root: "src",
  environment: "jsdom",
  globals: true,
  setupFiles: "setupTests.js",
  include: ["./utils/helpers.test.js"],
};

export default testConfig;
