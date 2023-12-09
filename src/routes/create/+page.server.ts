import type { AccessConditionType, SerializedAccessCondition } from '$lib/AccessCondition.svelte'
import type { Address } from 'viem'
import type { Actions } from './$types'

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		const creatorAddress = data.get('creatorAddress') as unknown as Address
		const title = data.get('title') as unknown as string
		const content = data.get('content') as unknown as string
		const conditionTypes = data.getAll('conditionType') as unknown as AccessConditionType[]
		const chainIds = data.getAll('chainId') as unknown as number[]
		const contractAddresses = data.getAll('contractAddress') as unknown as Address[]
		const tokenIds = data.getAll('tokenId') as unknown as number[]

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

		return {
			success: true,
		}
	},
} satisfies Actions
