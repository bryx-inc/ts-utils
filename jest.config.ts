import type { JestConfigWithTsJest } from "ts-jest";

// Config options -- https://jestjs.io/docs/configuration
const config: JestConfigWithTsJest = {
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.test.{ts, tsx}"],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  roots: ["src"],
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default config;
