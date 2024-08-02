const testConfig = {
  root: "src",
  globals: true,
  testEnvironment: "jsdom",
  reporters: [
    "default",
    [
      "jest-junit",
      { suiteName: "jest tests", outputDirectory: "./.build/test" },
    ],
  ],
};

export default testConfig;
