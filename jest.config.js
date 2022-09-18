export default {
  preset: "ts-jest",
  // testEnvironment: "node",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^src/(.*)": "<rootDir>/src/$1",
  },
};
