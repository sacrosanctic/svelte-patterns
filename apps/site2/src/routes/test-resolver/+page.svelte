<script lang="ts">
	import { onMount } from 'svelte'
	import { findContentFile } from '$lib/utils/content-resolver'
	
	let testResults: { slug: string; found: boolean }[] = []
	
	onMount(() => {
		const tests = ['boring', 'project-structure-visualized', 'nonexistent']
		
		testResults = tests.map(slug => ({
			slug,
			found: !!findContentFile(slug)
		}))
		
		console.log('Test results:', testResults)
	})
</script>

<div>
	<h2>Content Resolver Test Results</h2>
	<table class="border-collapse border border-gray-300">
		<thead>
			<tr class="bg-gray-100">
				<th class="border border-gray-300 px-4 py-2">Slug</th>
				<th class="border border-gray-300 px-4 py-2">Found</th>
			</tr>
		</thead>
		<tbody>
			{#each testResults as result}
				<tr>
					<td class="border border-gray-300 px-4 py-2">{result.slug}</td>
					<td class="border border-gray-300 px-4 py-2">
						{result.found ? '✅ Yes' : '❌ No'}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>