module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^\\.\\./data-import/web-worker/import-manager$": "<rootDir>/__mocks__/data-import/web-worker/import-manager.ts",
    },
};
