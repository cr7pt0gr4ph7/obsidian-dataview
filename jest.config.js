module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^\\.\\./data-import/web-worker/import-manager\\.js$": "<rootDir>/__mocks__/data-import/web-worker/import-manager.ts",
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
};
