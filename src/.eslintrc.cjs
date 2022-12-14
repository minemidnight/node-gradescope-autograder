module.exports = {
	env: {
		node: true,
		es2022: true
	},
	parserOptions: { sourceType: "module" },
	rules: {
		// potential logical errors
		"array-callback-return": "error",
		"constructor-super": "error",
		"for-direction": "error",
		"getter-return": "error",
		"no-async-promise-executor": "error",
		"no-class-assign": "error",
		"no-compare-neg-zero": "error",
		"no-cond-assign": "error",
		"no-const-assign": "error",
		"no-constant-condition": "error",
		"no-constructor-return": "error",
		"no-control-regex": "error",
		"no-debugger": "error",
		"no-dupe-args": "error",
		"no-dupe-class-members": "error",
		"no-dupe-else-if": "error",
		"no-dupe-keys": "error",
		"no-duplicate-case": "error",
		"no-duplicate-imports": "error",
		"no-empty-character-class": "error",
		"no-empty-pattern": "error",
		"no-ex-assign": "error",
		"no-fallthrough": "error",
		"no-func-assign": "error",
		"no-import-assign": "error",
		"no-inner-declarations": "error",
		"no-invalid-regexp": "error",
		"no-irregular-whitespace": "error",
		"no-loss-of-precision": "error",
		"no-misleading-character-class": "error",
		"no-new-symbol": "error",
		"no-obj-calls": "error",
		"no-promise-executor-return": "error",
		"no-prototype-builtins": "error",
		"no-self-assign": "error",
		"no-self-compare": "error",
		"no-setter-return": "error",
		"no-sparse-arrays": "error",
		"no-template-curly-in-string": "error",
		"no-this-before-super": "error",
		"no-undef": "error",
		"no-unexpected-multiline": "error",
		"no-unmodified-loop-condition": "error",
		"no-unreachable": "error",
		"no-unreachable-loop": "error",
		"no-unsafe-finally": "error",
		"no-unsafe-negation": ["error", { enforceForOrderingRelations: true }],
		"no-unsafe-optional-chaining": "error",
		"no-unused-private-class-members": "warn",
		"no-unused-vars": ["error", { args: "none" }],
		"no-useless-backreference": "error",
		"require-atomic-updates": ["error", { allowProperties: true }],
		"use-isnan": "error",
		"valid-typeof": "error",

		// encouraging certain ways to write code
		"accessor-pairs": "error",
		"arrow-body-style": ["error", "as-needed", { requireReturnForObjectLiteral: true }],
		camelcase: "error",
		"consistent-return": "error",
		curly: "error",
		"default-case": "error",
		"default-case-last": "error",
		"default-param-last": "error",
		"dot-notation": "error",
		eqeqeq: "error",
		"func-style": ["error", "declaration", { allowArrowFunctions: true }],
		"grouped-accessor-pairs": ["error", "getBeforeSet"],
		"guard-for-in": "warn",
		"max-nested-callbacks": ["error", { max: 3 }],
		"new-cap": ["error", { properties: false }],
		"no-alert": "error",
		"no-array-constructor": "error",
		"no-caller": "error",
		"no-confusing-arrow": ["error", { onlyOneSimpleParam: true }],
		"no-delete-var": "error",
		"no-empty": "error",
		"no-empty-function": "error",
		"no-eval": "warn",
		"no-extend-native": "error",
		"no-extra-bind": "error",
		"no-extra-boolean-cast": "error",
		"no-extra-semi": "error",
		"no-floating-decimal": "error",
		"no-global-assign": "error",
		"no-implicit-coercion": "error",
		"no-implied-eval": "error",
		"no-invalid-this": "error",
		"no-iterator": "error",
		"no-labels": "error",
		"no-lone-blocks": "error",
		"no-lonely-if": "error",
		"no-mixed-operators": "error",
		"no-nested-ternary": "error",
		"no-new": "error",
		"no-new-func": "error",
		"no-new-object": "error",
		"no-new-wrappers": "error",
		"no-nonoctal-decimal-escape": "error",
		"no-octal": "error",
		"no-octal-escape": "error",
		"no-param-reassign": ["warn", { props: false }],
		"no-proto": "error",
		"no-redeclare": "error",
		"no-regex-spaces": "error",
		"no-return-assign": "error",
		"no-return-await": "error",
		"no-script-url": "error",
		"no-sequences": "error",
		"no-shadow": "error",
		"no-throw-literal": "error",
		"no-undefined": "warn",
		"no-underscore-dangle": "warn",
		"no-unneeded-ternary": "error",
		"no-unused-expressions": "error",
		"no-useless-call": "error",
		"no-useless-catch": "error",
		"no-useless-computed-key": "error",
		"no-useless-concat": "error",
		"no-useless-constructor": "error",
		"no-useless-escape": "error",
		"no-useless-rename": "error",
		"no-var": "error",
		"no-void": "warn",
		"no-with": "error",
		"object-shorthand": ["error", "always", { avoidQuotes: true, avoidExplicitReturnArrows: true }],
		"operator-assignment": "error",
		"prefer-arrow-callback": "error",
		"prefer-const": ["error", { destructuring: "all" }],
		"prefer-destructuring": "warn",
		"prefer-exponentiation-operator": "warn",
		"prefer-object-has-own": "error",
		"prefer-promise-reject-errors": "error",
		"prefer-rest-params": "error",
		"prefer-spread": "error",
		"prefer-template": "error",
		"quote-props": ["error", "as-needed", { numbers: true }],
		"require-await": "error",
		"require-yield": "error",
		"spaced-comment": "error",
		"symbol-description": "error",
		yoda: "error",

		// formatting & layout
		"array-bracket-newline": ["error", { multiline: true }],
		"array-bracket-spacing": ["error", "never"],
		"arrow-parens": ["error", "as-needed"],
		"arrow-spacing": ["error", { before: true, after: true }],
		"block-spacing": "error",
		"brace-style": ["error", "1tbs"],
		"comma-dangle": "error",
		"comma-spacing": ["error", { before: false, after: true }],
		"comma-style": ["error", "last"],
		"computed-property-spacing": ["error", "never"],
		"dot-location": ["error", "property"],
		"eol-last": "error",
		"func-call-spacing": ["error", "never"],
		"function-paren-newline": ["error", "multiline"],
		"implicit-arrow-linebreak": ["error", "beside"],
		indent: ["error", "tab"],
		"jsx-quotes": ["error", "prefer-double"],
		"key-spacing": "error",
		"keyword-spacing": [
			"error",
			{
				overrides: {
					if: { after: false },
					for: { after: false },
					while: { after: false },
					catch: { after: false },
					switch: { after: false }
				}
			}
		],
		"max-statements-per-line": ["error", { max: 1 }],
		"multiline-ternary": ["error", "always-multiline"],
		"new-parens": ["error", "always"],
		"newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
		"no-extra-parens": ["error", "all", { nestedBinaryExpressions: false, enforceForArrowConditionals: false }],
		"no-mixed-spaces-and-tabs": "error",
		"no-multi-spaces": ["error", { ignoreEOLComments: true }],
		"no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
		"no-tabs": ["error", { allowIndentationTabs: true }],
		"no-trailing-spaces": "error",
		"no-whitespace-before-property": "error",
		"nonblock-statement-body-position": ["error", "beside"],
		"object-curly-newline": ["error", { multiline: true, minProperties: 4 }],
		"object-curly-spacing": ["error", "always"],
		"object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
		"operator-linebreak": ["error", "after"],
		"padded-blocks": ["error", "never"],
		"padding-line-between-statements": ["error", { blankLine: "always", prev: ["const", "let", "var"], next: "*" }, { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }],
		quotes: ["error", "double"],
		"rest-spread-spacing": ["error", "never"],
		semi: ["error", "always"],
		"semi-style": ["error", "last"],
		"space-before-blocks": ["error", "always"],
		"space-before-function-paren": ["error", { anonymous: "never", named: "never", asyncArrow: "always" }],
		"space-in-parens": ["error", "never"],
		"space-infix-ops": "error",
		"switch-colon-spacing": ["error", { after: true, before: false }],
		"template-curly-spacing": ["error", "never"],
		"template-tag-spacing": ["error", "never"],
		"unicode-bom": ["error", "never"],
		"wrap-iife": ["error", "inside"]
	}
};
