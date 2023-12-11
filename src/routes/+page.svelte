<script lang="ts">
	import { page } from '$app/stores'

	$inspect($page.data.pages)
</script>


<h2>Public Pages</h2>

{#each $page.data.pages as page (page.id)}
	<a href="/page/{page.id}">
		<article class="card column">
			<h2>{page.title}</h2>
		</article>
	</a>
{/each}
