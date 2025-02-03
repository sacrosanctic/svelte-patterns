import { Command } from 'commander'
import * as readline from 'readline'
import * as fs from 'fs'
import * as path from 'path'
import chalk from 'chalk' // Importing chalk for styling

const savePath = 'docs/unpublished'
const program = new Command()

/**
 * Converts a string to kebab-case.
 * @param input - The string to convert.
 * @returns The kebab-case version of the string.
 */
const toKebabCase = (input: string): string => {
	return input
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
		.replace(/^-+|-+$/g, '') // Trim leading/trailing hyphens
}

/**
 * Converts a string to Capital Case.
 * @param input - The string to convert.
 * @returns The Capital Case version of the string.
 */
const toCapitalCase = (input: string): string => {
	return input
		.trim()
		.toLowerCase()
		.replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Prompts the user for input.
 * @param question - The question to ask.
 * @returns A promise that resolves to the user's input.
 */
const prompt = (question: string): Promise<string> => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			rl.close()
			resolve(answer.trim())
		})
	})
}

program
	.name('create-md')
	.description('CLI to create a markdown file in the /docs directory')
	.action(async () => {
		const fileName = await prompt('Enter the name of the markdown file: ')
		if (!fileName) {
			console.error(chalk.red('File name cannot be empty.'))
			process.exit(1)
		}

		const kebabCaseName = toKebabCase(fileName)
		const capitalCaseTitle = toCapitalCase(fileName)
		const docsDirectory = path.resolve(process.cwd(), savePath)

		// Ensure the /docs directory exists
		if (!fs.existsSync(docsDirectory)) {
			fs.mkdirSync(docsDirectory, { recursive: true })
		}

		const markdownFilePath = path.join(docsDirectory, `${kebabCaseName}.md`)

		// Check if the file already exists
		if (fs.existsSync(markdownFilePath)) {
			console.error(chalk.red(`Error: The file "${markdownFilePath}" already exists.`))
			process.exit(1)
		}

		const markdownContent = `---\ntitle: ${capitalCaseTitle}\npublish: false\ntags: \n---\n## Describe the problem\n\n`

		try {
			fs.writeFileSync(markdownFilePath, markdownContent, 'utf8')
			console.log(chalk.green(`Markdown file created: ${markdownFilePath}`))
		} catch (err) {
			console.error(chalk.red('Error creating markdown file:', err))
		}
	})

program.parse(process.argv)
