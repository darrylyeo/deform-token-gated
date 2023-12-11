import { client, e } from '../database/client'
import type { Load } from '@sveltejs/kit'


export const load: Load = async ({ request }) => {
	// Load all pages
	const pages = await (
		e.select(e.Page, (page) => ({
			id: true,
			creatorAddress: true,
			title: true,
			content: true,
			conditions: {
				id: true,
				conditionType: true,
				chainId: true,
				contractAddress: true,
				tokenId: true,
			},
			isPublic: true,
			filter: page.isPublic,
		}))
	).run(client)

	return {
		pages,
	}
}