<script lang="ts">
	// Context
	import { page } from '$app/stores'
	console.log($page.error)
</script>


<article class="column">
	<h1>{$page.status}</h1>

	{#if $page.error}
		<div class="card column">
			{$page.error.message}
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

	footer {
		opacity: 0.5;
		text-align: center;
	}
</style>
