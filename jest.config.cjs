/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = config;
