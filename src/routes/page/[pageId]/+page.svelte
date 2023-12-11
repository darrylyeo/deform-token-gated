<script lang="ts">
	// Context
	import { page } from '$app/stores'


	// Components
	import MarkdownContent from '../../../components/MarkdownContent.svelte'
</script>


{#if $page.form?.message}
	<aside class="card">
		{$page.form.message}
	</aside>
{/if}

<article class="column">
	<h1>{$page.data.title}</h1>

	{#if $page.data.content}
		<div class="card column">
			<MarkdownContent
				value={$page.data.content}
			/>
		</div>
	{/if}
</article>


<style>
	h1 {
		text-align: center;
		font-size: 2em;
	}

	article {
		gap: 2em;
		padding: 1em;
	}

	.card {
		padding: 2em;
		width: min(100%, 50em);
		line-height: 1.5em;
		margin: auto;
	}
</style>
