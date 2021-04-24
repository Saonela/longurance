module.exports = {
    preset: 'jest-expo',
    testEnvironment: "jsdom",
    setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js', './jestSetup.js'],
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|@react-native-picker/picker)"
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx'
    ]
}
