import type { PageServerLoad } from './$types'
import { client, e } from '../../../database/client'

export const load: PageServerLoad = async ({ params: { pageId } }) => {
	const page = await (
		e.params({
			pageId: e.uuid,
		}, ({
			pageId
		}) => (
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
				filter_single: e.op(page.id, '=', pageId),
			}))
		))
	)
		.run(client, { pageId: pageId! })

	console.log({ page })

	if (!page) {
		return {
			status: 404,
			error: new Error(`Page ${pageId} not found`),
		};
	}

	return {
		status: 200,
		body: {
			page,
		},
	};
}
