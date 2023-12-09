import type { AccessConditionType, SerializedAccessCondition } from '$lib/AccessCondition.svelte'
import type { Address } from 'viem'
import type { Actions } from './$types'

import { client, e } from '../../database/client'
import { redirect } from '@sveltejs/kit'


export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		const creatorAddress = data.get('creatorAddress') as unknown as Address
		const title = data.get('title') as unknown as string
		const content = data.get('content') as unknown as string
		const conditionTypes = data.getAll('conditionType') as unknown as AccessConditionType[]
		const chainIds = data.getAll('chainId').map(Number)
		const contractAddresses = data.getAll('contractAddress') as unknown as Address[]
		const tokenIds = data.getAll('tokenId').map(Number)

		const conditions: SerializedAccessCondition[] = conditionTypes.map((type, i) => ({
			type,
			chainId: chainIds[i],
			contractAddress: contractAddresses[i],
			tokenId: tokenIds[i],
		}))

		console.log({
			creatorAddress,
			title,
			content,
			conditions,
		})
		
		const result = await (
			e.params({
				creatorAddress: e.Address,
				title: e.str,
				content: e.str,
				conditions: e.json,
			}, ({
				creatorAddress,
				title,
				content,
				conditions,
			}) => (
				e.insert(e.Page, {
					creatorAddress: e.cast(e.Address, creatorAddress),
					title,
					content,
					conditions: e.for(e.json_array_unpack(conditions), (condition) => (
						e.insert(e.AccessCondition, {
							conditionType: e.cast(e.AccessConditionType, condition.type),
							chainId: e.cast(e.int16, condition.chainId || null),
							contractAddress: e.cast(e.Address, condition.contractAddress || null),
							tokenId: e.cast(e.bigint, condition.tokenId || null),
						})
					))
				})
			))
		)
			.run(client, {
				creatorAddress,
				title,
				content,
				conditions,
			})

		console.log({result})

		return redirect(303, `/page/${result.id}`)
	},
} satisfies Actions
