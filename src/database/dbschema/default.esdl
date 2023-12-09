module default {
	type Page {
		creatorAddress: Address;
		required title: str;
		content: str;
		multi conditions: AccessCondition;
	}

	type AccessCondition {
		required conditionType: AccessConditionType;
		chainId: int16 {
			constraint min_value(1);
		}
		contractAddress: Address;
		tokenId: str;
	}

	scalar type AccessConditionType extending enum<
		'None',
		'OwnsNftInCollection',
		'OwnsSingleNft'
	>;

	scalar type Address extending str {
		constraint regexp(r'0x[a-fA-F0-9]{40}');
	}
}
