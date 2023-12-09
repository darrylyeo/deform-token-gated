export enum AccessConditionType {
	None,
	OwnsNftInCollection,
	OwnsSingleNft,
}

export class AccessCondition {
	public type: AccessConditionType = $state<AccessConditionType>(AccessConditionType.None)
	public contractAddress = $state<string | undefined>()
	public tokenId = $state<number | undefined>()

	constructor(
		type?: AccessConditionType,
		contractAddress?: string,
		tokenId?: number,
	) {
		this.type = type ?? this.type
		this.contractAddress = contractAddress ?? this.contractAddress
		this.tokenId = tokenId ?? this.tokenId
	}

	toJSON(){
		return {
			type: this.type,
			contractAddress: this.contractAddress,
			tokenId: this.tokenId,
		}
	}
}
