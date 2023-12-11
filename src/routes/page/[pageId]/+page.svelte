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

<h1>{$page.data.title}</h1>

{#if $page.data.content}
	<MarkdownContent
		value={$page.data.content}
	/>
{/if}
