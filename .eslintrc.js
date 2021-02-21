module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        "prettier", // Prettier rules for eslint
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
    },
    rules: {
        // TODO: The following rules are turned off but need to be addressed.
        "@typescript-eslint/no-use-before-define": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/prefer-interface": 0,
        "@typescript-eslint/no-object-literal-type-assertion": 0,
        "@typescript-eslint/naming-convention": ["error", { selector: "variableLike", format: ["camelCase"] }],
    },
};
