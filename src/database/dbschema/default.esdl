module default {
	type Page {
		required creatorAddress: Address;
		required title: str;
		content: str;
		multi conditions: AccessCondition;

		isPublic := count(Page.conditions) = 0 or all(Page.conditions.conditionType = AccessConditionType.None);
	}

	type AccessCondition {
		required conditionType: AccessConditionType;
		chainId: int16 {
			constraint min_value(1);
		}
		contractAddress: Address;
		tokenId: bigint;
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
