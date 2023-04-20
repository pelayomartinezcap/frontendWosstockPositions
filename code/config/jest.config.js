// Jest config for TS
/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
const { inProject } = require("@amiga-fwk-web/tools-cli-utils");
const baseConfig = require("@amiga-fwk-web/tools/config/jest.config.js");
const { findFile } = inProject();

module.exports = {
  ...baseConfig,
  preset: "ts-jest",

  // Test all files either suffixed with "-test.js", "-test.jsx", "-test.ts", "-test.tsx", or
  // having ".test.js", ".test.jsx", ".test.ts", ".test.tsx" extensions
  testRegex: ".*[-.]test\\.(js|ts)x?$",

  globals: {
    ...baseConfig.globals,
    "ts-jest": {
      // Configure the typescript configuration file
      tsconfig: findFile("<root>/tsconfig.json"),
    },
  },

  transform: {
    ...baseConfig.transform,
    // Transform all ts and tsx files with ts-jest
    "\\.(ts)x?$": "ts-jest",
  },

  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    // Alias @/ imports
    "@/(.*)": "<rootDir>/src/$1",
    // Alias #/ imports
    "#/(.*)": "<rootDir>/test/$1",
    // Alias config/ imports
    "config/(.*)": "<rootDir>/config/$1",
  },

  // File extensions to be tested
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Project's path which coverage will be reported
  collectCoverageFrom: [...baseConfig.collectCoverageFrom, "src/**/*.ts", "src/**/*.tsx"],
};
