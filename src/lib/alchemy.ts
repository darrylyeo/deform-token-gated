import { env } from '$env/dynamic/private'
import type { Address } from 'viem'

const subdomainsByChainId = {
	"1": "eth-mainnet",
	"4": "eth-rinkeby",
	"5": "eth-goerli",
	"10": "opt-mainnet",
	"137": "polygon-mainnet",
	"420": "opt-goerli",
	"42161": "arb-mainnet",
	"80001": "polygon-mumbai",
	"421613": "arb-goerli",
	"11155111": "eth-sepolia"
}

export const isNftContractHolder = async ({
	userAddress,
	chainId,
	contractAddress,
}: {
	userAddress: string,
	chainId: number,
	contractAddress: Address,
}) => {
	const {
		isHolderOfContract
	} = await fetch(`https://${subdomainsByChainId[chainId]}.g.alchemy.com/nft/v3/${env.ALCHEMY_API_KEY}/isHolderOfContract?wallet=${userAddress}&contractAddress=${contractAddress}`)
		.then(response => response.json())

	console.log({ isHolderOfContract })

	return isHolderOfContract
}

export const isNftTokenHolder = async ({
	userAddress,
	chainId,
	contractAddress,
	tokenId,
}: {
	userAddress: Address,
	chainId: number,
	contractAddress: Address,
	tokenId: number,
}) => {
	const owners: Address[] = []
	let pageKey

	do {
		const {
			owners: moreOwners,
			pageKey: nextPageKey,
		} = (
			await fetch(`https://${subdomainsByChainId[chainId]}.g.alchemy.com/nft/v3/${env.ALCHEMY_API_KEY}/getOwnersForNFT?contractAddress=${contractAddress}&tokenId=${tokenId}&pageKey=${pageKey}`)
				.then(response => response.json())
		) as {
			owners: Address[]
			pageKey: string | null
		}

		owners.push(...moreOwners)
		pageKey = nextPageKey
	} while (pageKey)

	return owners.includes(userAddress)
}
