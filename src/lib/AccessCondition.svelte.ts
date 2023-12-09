export enum AccessConditionType {
	None = 'None',
	OwnsNftInCollection = 'OwnsNftInCollection',
	OwnsSingleNft = 'OwnsSingleNft',
}

export class AccessCondition {
	public type: AccessConditionType = $state<AccessConditionType>(AccessConditionType.None)
	public chainId = $state<number | undefined>()
	public contractAddress = $state<string | undefined>()
	public tokenId = $state<number | undefined>()

	constructor(
		type?: AccessConditionType,
		chainId?: number,
		contractAddress?: string,
		tokenId?: number,
	) {
		this.type = type ?? this.type
		this.chainId = chainId ?? this.chainId
		this.contractAddress = contractAddress ?? this.contractAddress
		this.tokenId = tokenId ?? this.tokenId
	}

	toJSON(){
		return {
			type: this.type,
			chainId: this.chainId,
			contractAddress: this.contractAddress,
			tokenId: this.tokenId,
		}
	}
}

export type SerializedAccessCondition = ReturnType<AccessCondition['toJSON']>
