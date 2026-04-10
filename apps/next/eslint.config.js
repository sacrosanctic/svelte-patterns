import path from 'node:path'

import svelteConfig from './svelte.config.js'

import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import json from 'eslint-plugin-jsonc'
import perfectionist from 'eslint-plugin-perfectionist'
import svelte from 'eslint-plugin-svelte'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import ts from 'typescript-eslint'

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore')

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{
		ignores: ['src/routes/test/**', 'src/content/**'],
	},
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	json.configs['recommended-with-jsonc'],
	json.configs['recommended-with-json'],
	json.configs['recommended-with-json5'],
	json.configs['prettier'],

	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				projectService: { allowDefaultProject: ['eslint.config.js', 'svelte.config.js'] },
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off',
		},
	},

	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		ignores: ['src/content/**'],
		languageOptions: {
			parserOptions: {
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				projectService: true,
				svelteConfig,
			},
		},
	},

	{
		rules: {
			'jsonc/sort-keys': ['error', { order: { natural: true }, pathPattern: '.*' }],
		},
	},

	// custom ordering for package.json
	{
		files: ['**/package.json'],
		rules: {
			'jsonc/sort-keys': [
				'error',
				{
					order: [
						'name',
						'version',
						'type',
						'private',
						'scripts',
						'engines',
						'packageManager',
						'exports',
						'files',
						'sideEffects',
						'dependencies',
						'devDependencies',
						'peerDependencies',
						'optionalDependencies',
						'bundledDependencies',
						'author',
						'contributors',
						'license',
						'repository',
						'bugs',
						'homepage',
						'keywords',
						{ order: { natural: true } },
					],
					pathPattern: '.*',
				},
			],
		},
	},
	// custom ordering for tsconfig
	{
		files: ['**/tsconfig.json'],
		rules: {
			'jsonc/sort-keys': [
				'error',
				{
					order: ['extends', { order: { natural: true } }],
					pathPattern: '^$',
				},
			],
		},
	},

	// exception for tsconfig.json
	{
		files: ['**/tsconfig.json'],
		rules: {
			'jsonc/no-comments': 'off',
		},
	},

	{
		extends: [perfectionist.configs['recommended-natural']],
		ignores: ['src/routes/test/**', 'src/content/**'],
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
