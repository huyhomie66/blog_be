module.exports = {
  // ...
  testEnvironment: "node",
  transform: {},
  moduleFileExtensions: ["js", "ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  },
  testMatch: ["**/__tests__/**/*.+(ts|js)", "**/?(*.)+(spec|test).+(ts|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testEnvironment: "node",
  testTimeout: 30000,
  testRunner: "jest-circus/runner",
  // add the following line:
  testEnvironment: "node"
};
