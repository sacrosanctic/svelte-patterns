import { render } from 'svelte/server'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { html as toReactNode } from 'satori-html'
import Card from './Card.svelte'
import ArticleCard from './ArticleCard.svelte'
import { env } from '$env/dynamic/private'

export type Font = {
	name: string
	data: ArrayBuffer
	weight: 400 | 500 | 600 | 700
	style: 'normal'
}

export type OgImageOptions = {
	title?: string
	description?: string | null
	dark?: boolean
	type?: 'h' | 'a'
	category?: string | null
}

export class OgImage {
	readonly title: string
	readonly description: string | null
	readonly dark: boolean
	readonly type: 'h' | 'a'
	readonly category: string | null

	constructor(options: OgImageOptions = {}) {
		this.title = options.title ?? 'Svelte Patterns'
		this.description = options.description ?? null
		this.dark = options.dark ?? false
		this.type = options.type ?? 'h'
		this.category = options.category ?? null
	}

	static fromUrl(url: URL): OgImage {
		const title = url.searchParams.get('title')
		const description = url.searchParams.get('description')
		const dark = url.searchParams.get('dark') === 'true'
		const type = url.searchParams.get('t') as 'h' | 'a' | null
		const category = url.searchParams.get('category')

		return new OgImage({
			...(title !== null && { title }),
			...(description !== null && { description }),
			...(dark && { dark }),
			...(type !== null && { type }),
			...(category !== null && { category }),
		})
	}

	toUrl(): string {
		const params = new URLSearchParams()
		if (this.title !== 'Svelte Patterns') params.set('title', this.title)
		if (this.description !== null) params.set('description', this.description)
		if (this.dark) params.set('dark', 'true')
		if (this.type !== 'h') params.set('t', this.type)
		if (this.category !== null) params.set('category', this.category)
		return `${env.origin}/og.png?${params}`
	}

	async toPng(fonts: Font[]): Promise<Uint8Array> {
		const renderedOutput =
			this.type === 'a'
				? render(ArticleCard, {
						props: {
							title: this.title,
							description: this.description,
							dark: this.dark,
							category: this.category,
						},
					})
				: render(Card, { props: { dark: this.dark } })

		const element = toReactNode(`<style>${renderedOutput.head}</style>${renderedOutput.body}`)
		const svg = await satori(element, { width: 1_200, height: 630, fonts })
		const png = new Resvg(svg, { fitTo: { mode: 'original' } }).render().asPng()
		return new Uint8Array(png)
	}
}
