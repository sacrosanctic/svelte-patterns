import path from 'node:path'

import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import { defineConfig, includeIgnoreFile } from 'eslint/config'
import globals from 'globals'

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore')

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	{ ignores: ['apps/**', 'packages/**'] },
	js.configs.recommended,
	prettier,

	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				projectService: { allowDefaultProject: ['eslint.config.js'] },
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
)
