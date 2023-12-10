import type { PageServerLoad } from './$types'
import { client, e } from '../../../database/client'
import { AccessConditionType } from '$lib/AccessCondition.svelte'
import { isNftContractHolder, isNftTokenHolder } from '../../../lib/alchemy'
import { error } from '@sveltejs/kit'

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

	const userAddress = ''

	if(!page)
		throw error(404, `Page ${pageId} not found`)

	const canAccess = (await Promise.all(
		page.conditions
			.map(async condition => {
				switch(condition.conditionType) {
					case AccessConditionType.None:
						return true

					case AccessConditionType.OwnsNftInCollection: {
						return await isNftContractHolder({
							userAddress,
							chainId: condition.chainId!,
							contractAddress: condition.contractAddress!
						})
					}

					case AccessConditionType.OwnsSingleNft: {
						return await isNftTokenHolder({
							userAddress,
							chainId: condition.chainId!,
							contractAddress: condition.contractAddress!,
							tokenId: condition.tokenId!,
						})

						// const {
						// 	isHolderOfContract
						// } = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v3/${env.ALCHEMY_API_KEY}/getNFTsForOwner?owner=${userAddress}&contractAddresses=[${condition.contractAddress}]`)
						// 	.then(response => response.json())

						// return isHolderOfContract
					}
				}
			})
	)).every(Boolean)

	if(!canAccess)
		throw error(403, `Address ${userAddress} does not have access to page ${pageId}`)

	return page
}
