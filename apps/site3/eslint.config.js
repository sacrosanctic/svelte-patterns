import path from 'node:path'

import svelteConfig from './svelte.config.js'

import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'
import svelte from 'eslint-plugin-svelte'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import ts from 'typescript-eslint'

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore')

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,

	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
		},
	},

	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				projectService: true,
				svelteConfig,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},

	{
		extends: [perfectionist.configs['recommended-natural']],
		ignores: ['src/routes/test/**'],
		rules: {
			'perfectionist/sort-imports': [
				'error',
				{
					customGroups: [
						{
							elementNamePattern: ['^svelte$', '^sveltejs/.+', '^\\$app.+'],
							groupName: 'svelte',
						},
					],
					groups: [
						['type-import', 'type-internal', 'type-parent', 'type-sibling', 'type-index'],
						'value-builtin',
						'svelte',
						'value-internal',
						['value-parent', 'value-sibling', 'value-index'],
						'value-external',
						'ts-equals-import',
						'unknown',
					],
					internalPattern: ['^\\$lib/.+', '^@repo/.+'],
				},
			],
			'perfectionist/sort-object-types': [
				'error',
				{
					customGroups: [
						{ elementNamePattern: '^id$', groupName: 'id' },
						{ elementNamePattern: '^name$', groupName: 'name' },
					],
					groups: ['id', 'name'],
				},
			],
			'perfectionist/sort-objects': [
				'error',
				{
					customGroups: [
						{ elementNamePattern: '^id$', groupName: 'id' },
						{ elementNamePattern: '^name$', groupName: 'name' },
					],
					groups: ['id', 'name'],
				},
			],
		},
	},
)
