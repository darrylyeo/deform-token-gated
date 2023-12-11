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
			// isPublic: true,
			// createdAt: true,
			filter: page.isPublic,
			// order_by: {
			// 	expression: page.createdAt,
			// 	direction: e.ASC,
			// },
		}))
	).run(client)

	return {
		pages,
	}
}