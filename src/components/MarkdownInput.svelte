<script lang="ts">
	import { Carta, CartaEditor } from 'carta-md'
	import { code } from '@cartamd/plugin-code'


	let {
		value
	} = $props<{
		value: string,
	}>()
</script>


<CartaEditor
	bind:value
	carta={new Carta({
		disableIcons: true,
		extensions: [
			code(),
		],
	})}
/>


<style>
	@import 'carta-md/default.css';
	@import 'carta-md/light.css';


	:global(.carta-editor) {
		background-color: #f5f5f5;
	}

	:global(.carta-font-code) {
		font-family: monospace;
	}

	:global(.markdown-body) {
		display: grid;
		align-content: start;
		gap: 1em;
	}
</style>
