export default {
    // preset: 'ts-jest',
    preset: 'rollup-jest',
    testEnvironment: 'node',
    "testMatch": [
        "**/tests/**/*.js?(x)"
    ],
    "moduleDirectories": [
        "node_modules",
        "lib"
    ],
    "testPathIgnorePatterns": [
        "/node_modules/"
    ]
};
