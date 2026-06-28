import { render } from 'svelte/server'
import satori from 'satori'
import { html as toReactNode } from 'satori-html'
import Card from './Card.svelte'
import ArticleCard from './ArticleCard.svelte'
import { dev } from '$app/environment'

export type Font = {
	name: string
	data: ArrayBuffer
	weight: 400 | 500 | 600 | 700
	style: 'normal'
}

type Home = {
	type: 'h'
	title: string
	dark?: boolean
}

type Article = {
	type: 'a'
	title: string
	description?: string | null
	category?: string | null
	dark?: boolean
}

export class OgImage {
	readonly subject: Home | Article
	readonly dark: boolean

	constructor(options: Article | Home) {
		if (options.type === 'a') {
			this.subject = {
				type: 'a',
				title: options.title,
				description: options.description ?? null,
				category: options.category ?? null,
			}
		} else {
			this.subject = {
				type: options.type ?? 'h',
				title: options.title ?? 'Svelte Patterns',
			}
		}
		this.dark = options.dark ?? false
	}

	static fromUrl(url: URL): OgImage {
		const title = url.searchParams.get('title') as string
		const description = url.searchParams.get('description')
		const dark = url.searchParams.get('dark') === 'true'
		const type = url.searchParams.get('t') as 'h' | 'a' | null
		const category = url.searchParams.get('category')

		if (type === 'a') {
			return new OgImage({
				type: 'a',
				title: title ?? 'Svelte Patterns',
				description,
				category,
				dark,
			})
		}

		return new OgImage({ type: 'h', title, dark })
	}

	toUrl(): string {
		// const url = new URL('/og.png', env.origin)
		const url = new URL('/og.png', dev ? 'http://localhost:5173' : 'https://sveltepatterns.dev')
		url.searchParams.set('title', this.subject.title)

		if ('description' in this.subject && this.subject.description) {
			url.searchParams.set('description', this.subject.description)
		}
		if (this.dark) url.searchParams.set('dark', 'true')
		if (this.subject.type === 'a') url.searchParams.set('t', 'a')
		if ('category' in this.subject && this.subject.category) {
			url.searchParams.set('category', this.subject.category)
		}

		return url.toString()
	}

	async toPng(fonts: Font[]): Promise<Uint8Array<ArrayBuffer>> {
		const { Resvg } = await import('@resvg/resvg-js')
		const cardMap = {
			a: [ArticleCard, { ...this.subject, dark: this.dark }],
			h: [Card, { ...this.subject, dark: this.dark }],
		} as const

		const [component, props] = cardMap[this.subject.type]
		const svelte = render(component, { props })
		const html = `<style>${svelte.head}</style>${svelte.body}`
		const jsx = toReactNode(html)
		const svg = await satori(jsx, { width: 1_200, height: 630, fonts })
		const png = new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng()
		return new Uint8Array(png)
	}
}
