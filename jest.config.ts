import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Path aliases from tsconfig.json
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@public/(.*)$": "<rootDir>/public/$1",
  },
};

export default createJestConfig(config);
