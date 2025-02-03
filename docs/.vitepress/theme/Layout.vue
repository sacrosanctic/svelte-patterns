<template>
	<Layout>
		<template #doc-before>
			<div class="vp-doc">
				<h1>{{ $frontmatter.title }}</h1>
			</div>
			<p v-if="$frontmatter.author">Written By: {{ $frontmatter.author }}</p>
			<ul style="display: flex; margin-top: 0.5rem">
				<li v-if="$frontmatter.tags" v-for="item in $frontmatter.tags.split(',')">
					<Badge type="tip">
						{{ item.trim() }}
					</Badge>
				</li>
			</ul>
		</template>
	</Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>
