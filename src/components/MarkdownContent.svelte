<script lang="ts">
	import { Carta, CartaViewer } from 'carta-md'


	let {
		value,
	} = $props<{
		value: string,
	}>()
</script>


<CartaViewer
	carta={new Carta({
		disableIcons: true,
	})}
	{value}
/>
