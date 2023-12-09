import type { AccessConditionType, SerializedAccessCondition } from '$lib/AccessCondition.svelte'
import type { Address } from 'viem'
import type { Actions } from './$types'

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()

		const userAddress = data.get('userAddress')
		const title = data.get('title')
		const content = data.get('content')
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
			userAddress,
			title,
			content,
			conditions,
		})

		return {
			success: true,
		}
	},
} satisfies Actions
