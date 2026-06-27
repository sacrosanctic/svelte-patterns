<script lang="ts">
	let { dark = false }: { dark: boolean | null } = $props()

	const colors = $derived({
		bg: dark ? '#1a1a1a' : '#ffffff',
		glowOpacity: dark ? '0.18' : '0.12',
		fg: dark ? '#ffffff' : '#1a1a1a',
		muted: dark ? '#d4d4d4' : '#525252',
		muted2: dark ? '#a3a3a3' : '#737373',
		tags: dark ? '#e5e5e5' : '#404040',
	})
</script>

<div
	style="width:1200px;height:630px;display:flex;flex-direction:column;justify-content:space-between;box-sizing:border-box;padding:80px;background-color:{colors.bg};background-image:radial-gradient(circle at 90% 10%, rgba(255,62,0,{colors.glowOpacity}), transparent 45%);font-family:'Segoe UI',system-ui,-apple-system,sans-serif;color:{colors.fg};overflow:hidden;"
>
	<!-- Top row: logo + wordmark -->
	<div style="display:flex;align-items:center;gap:20px;">
		<svg
			width="56"
			height="68"
			viewBox="0 0 98 118"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M91.8 15.6C80.9-.1 59.3-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18 5.7 25.4 11 15.7 32.5 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-8.9-.4-18-5.6-25.5"
				fill="#FF3E00"
			/>
			<path
				d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.2-.9.4-1.7.6-2.6l.5-1.6 1.4 1c3.3 2.4 6.9 4.2 10.8 5.4l1 .3-.1 1c-.1 1.4.3 2.9 1.1 4.1 1.6 2.3 4.4 3.4 7.1 2.7.6-.2 1.2-.4 1.7-.7L65.5 72c1.4-.9 2.3-2.2 2.6-3.8.3-1.6-.1-3.3-1-4.6-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.4-8.9 2.3-18.2-1.2-23.4-8.7-3.1-4.4-4.4-9.9-3.4-15.3.9-5.2 4.1-9.9 8.6-12.7l27.5-17.5c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.2.9-.4 1.7-.7 2.6l-.5 1.6-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-.3.1-1c.1-1.4-.3-2.9-1.1-4.1-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7L32.4 46c-1.4.9-2.3 2.2-2.6 3.8-.3 1.6.1 3.3 1 4.6 1.6 2.3 4.4 3.3 7.1 2.6.6-.2 1.2-.4 1.7-.7l10.5-6.7c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.9 5.2-4.1 9.9-8.6 12.8l-27.5 17.5c-1.7 1.1-3.6 1.9-5.6 2.5"
				fill="#FFFFFF"
			/>
		</svg>
		<span style="font-size:26px;font-weight:600;letter-spacing:0.5px;color:{colors.muted};"
			>sveltepatterns.dev</span
		>
	</div>

	<!-- Center: headline + subtitle -->
	<div style="display:flex;flex-direction:column;gap:24px;">
		<h1
			style="margin:0;font-size:104px;line-height:1.0;font-weight:800;letter-spacing:-2px;color:{colors.fg};"
		>
			Svelte Patterns
		</h1>
		<p style="margin:0;font-size:38px;font-weight:400;color:{colors.muted2};">
			Bite sized goodies for Svelte
		</p>
	</div>

	<!-- Bottom: pillars -->
	<div
		style="display:flex;align-items:center;gap:40px;font-size:24px;font-weight:500;color:{colors.tags};"
	>
		<span style="display:flex;align-items:center;gap:12px;"
			><span style="width:12px;height:12px;border-radius:50%;background-color:#FF3E00;"
			></span>Common Patterns</span
		>
		<span style="display:flex;align-items:center;gap:12px;"
			><span style="width:12px;height:12px;border-radius:50%;background-color:#FF3E00;"></span>Tips
			and Tricks</span
		>
		<span style="display:flex;align-items:center;gap:12px;"
			><span style="width:12px;height:12px;border-radius:50%;background-color:#FF3E00;"
			></span>Community-Sourced</span
		>
	</div>
</div>
