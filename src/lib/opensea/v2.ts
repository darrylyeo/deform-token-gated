/**
 * OpenSea API
 * 2.0.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "oazapfts/lib/runtime";
import * as QS from "oazapfts/lib/runtime/query";
export const defaults: Oazapfts.RequestOpts = {
    baseUrl: "https://api.opensea.io/",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    mainnet: "https://api.opensea.io/",
    testnet: "https://testnets-api.opensea.io/"
};
export type SocialMediaAccountModel = {
    platform: string;
    username: string;
};
export type DetailedAccountDataModel = {
    address?: string;
    username?: string;
    profile_image_url?: string;
    banner_image_url?: string;
    website?: string;
    social_media_accounts?: SocialMediaAccountModel[];
    bio?: string;
    joined_date?: string;
};
export type NftModel = {
    identifier: string;
    collection: string;
    contract: string;
    token_standard: string;
    name: string;
    description: string;
    image_url?: string;
    metadata_url?: string;
    created_at?: CreatedAtEnum;
    updated_at: string;
    is_disabled: boolean;
    is_nsfw: boolean;
};
export type ListNftsResponse = {
    nfts: NftModel[];
    next: string;
};
export type TraitModel = {
    trait_type: string;
    display_type?: {};
    max_value: string;
    trait_count?: number;
    order?: number;
    value: number | number | string | string;
};
export type OwnerModel = {
    address: string;
    quantity: number;
};
export type RankingFeatures = {
    unique_attribute_count?: number;
};
export type RarityDataModel = {
    strategy_id?: {};
    strategy_version?: string;
    rank: number;
    score?: number;
    calculated_at?: string;
    max_rank?: number;
    total_supply?: number;
    ranking_features?: RankingFeatures;
};
export type DetailedNftModel = {
    identifier: string;
    collection: string;
    contract: string;
    token_standard: string;
    name: string;
    description: string;
    image_url?: string;
    metadata_url?: string;
    created_at?: CreatedAtEnum;
    updated_at: string;
    is_disabled: boolean;
    is_nsfw: boolean;
    animation_url?: string;
    is_suspicious: boolean;
    creator: string;
    traits: TraitModel[];
    owners: OwnerModel[];
    rarity: RarityDataModel;
};
export type GetNftResponse = {
    nft: DetailedNftModel;
};
export type CollectionContractModel = {
    address: string;
    chain: {};
};
export type CollectionModel = {
    collection: string;
    name: string;
    description?: string;
    owner: string;
    safelist_status: {};
    category: string;
    is_disabled: boolean;
    is_nsfw: boolean;
    trait_offers_enabled: boolean;
    opensea_url: string;
    project_url?: string;
    wiki_url?: string;
    discord_url?: string;
    telegram_url?: string;
    twitter_username?: string;
    instagram_username?: string;
    contracts: CollectionContractModel[];
};
export type ListCollectionsResponse = {
    collections: CollectionModel[];
    next: string;
};
export type CollectionFeeModel = {
    fee: number;
    recipient: string;
    required?: boolean;
};
export type DetailedCollectionModel = {
    collection: string;
    name: string;
    description?: string;
    owner: string;
    safelist_status: {};
    category: string;
    is_disabled: boolean;
    is_nsfw: boolean;
    trait_offers_enabled: boolean;
    opensea_url: string;
    project_url?: string;
    wiki_url?: string;
    discord_url?: string;
    telegram_url?: string;
    twitter_username?: string;
    instagram_username?: string;
    contracts: CollectionContractModel[];
    editors: string[];
    fees: CollectionFeeModel[];
};
export type CollectionStatsModel = {
    volume: number;
    sales: number;
    average_price: number;
    num_owners: number;
    market_cap: number;
    floor_price: number;
    floor_price_symbol: string;
};
export type CollectionStatsIntervalModel = {
    interval: {};
    volume: number;
    volume_diff: number;
    volume_change: number;
    sales: number;
    sales_diff: number;
    average_price: number;
};
export type GetCollectionStatsResponse = {
    total: CollectionStatsModel;
    intervals: CollectionStatsIntervalModel[];
};
export type CancelEventModel = {
    event_type?: CancelEventModelEventTypeEnum;
    order_hash: string;
    chain: {};
};
export type EventPaymentModel = {
    quantity: number;
    token_address: string;
    decimals: number;
    "symbol": string;
};
export type Collection = {
    slug: string;
};
export type Contract = {
    address: string;
};
export type Trait = {
    "type": string;
    value: string;
};
export type Criteria = {
    collection: Collection;
    contract: Contract;
    trait?: Trait;
    encoded_token_ids?: string;
};
export type OrderEventModel = {
    event_type?: OrderEventModelEventTypeEnum;
    order_hash: string;
    order_type: {};
    chain: {};
    protocol_address: string;
    start_date: number;
    expiration_date: number;
    asset: NftModel | object;
    quantity: number;
    maker: string;
    taker: string;
    payment: EventPaymentModel;
    criteria: Criteria | object;
};
export type SaleEventModel = {
    event_type?: SaleEventModelEventTypeEnum;
    order_hash: string;
    chain: {};
    protocol_address: string;
    closing_date: number;
    quantity: number;
    maker: string;
    taker: string;
    payment: EventPaymentModel;
    transaction: string;
};
export type TransferEventModel = {
    event_type?: TransferEventModelEventTypeEnum;
    chain: {};
    transaction: string;
    from_address: string;
    to_address: string;
    quantity: number;
};
export type RedemptionEventModel = {
    event_type?: RedemptionEventModelEventTypeEnum;
    chain: {};
    from_address: string;
    to_address: string;
    asset: NftModel | object;
    quantity: number;
    transaction: string;
};
export type ListEventsResponse = {
    asset_events: (CancelEventModel | OrderEventModel | SaleEventModel | TransferEventModel | RedemptionEventModel)[];
    next: string;
};
export type PriceModel = {
    currency: string;
    decimals: number;
    value: string;
};
export type BasicListingPrice = {
    current: PriceModel;
};
export type SerializedOfferItem = {
    itemType: {};
    token: string;
    identifierOrCriteria: string;
    startAmount: string;
    endAmount: string;
};
export type SerializedConsiderationItem = {
    itemType: {};
    token: string;
    identifierOrCriteria: string;
    startAmount: string;
    endAmount: string;
    recipient: string;
};
export type SerializedOrderComponents = {
    offerer: string;
    offer: SerializedOfferItem[];
    consideration: SerializedConsiderationItem[];
    startTime: string;
    endTime: string;
    orderType: {};
    zone: string;
    zoneHash: string;
    salt: string;
    conduitKey: string;
    totalOriginalConsiderationItems?: number;
    counter: number | string;
};
export type SerializedOrder = {
    parameters: SerializedOrderComponents;
    signature?: string;
};
export type Listing = {
    order_hash: string;
    chain: {};
    "type": {};
    price: BasicListingPrice;
    protocol_data: SerializedOrder;
    protocol_address: string;
};
export type PaginatedListingList = {
    listings: Listing[];
    next: string;
};
export type FulfillmentInput = {
    hash: string;
    chain: string;
    protocol_address?: string;
};
export type FulfillerInput = {
    address: string;
};
export type GenerateListingFulfillmentInput = {
    listing: FulfillmentInput;
    fulfiller: FulfillerInput;
};
export type Transaction = {
    "function": string;
    chain: number;
    to: string;
    value: number;
    input_data: object;
};
export type FulfillmentData = {
    transaction: Transaction;
    orders: SerializedOrder[];
};
export type FulfillmentOutput = {
    protocol: string;
    fulfillment_data: FulfillmentData;
};
export type OfferItem = {
    itemType: {};
    token: string;
    identifierOrCriteria: number;
    startAmount: number;
    endAmount: number;
};
export type ConsiderationItem = {
    itemType: {};
    token: string;
    identifierOrCriteria: number;
    startAmount: number;
    endAmount: number;
    recipient: string;
};
export type OrderInputComponents = {
    offerer: string;
    offer: OfferItem[];
    consideration: ConsiderationItem[];
    startTime: number;
    endTime: number;
    orderType: {};
    zone: string;
    zoneHash: string;
    salt: string;
    conduitKey: string;
    totalOriginalConsiderationItems?: number;
    counter: string;
};
export type OrderInput = {
    parameters: OrderInputComponents;
    signature: string;
};
export type PostCriteriaOfferInput = {
    protocol_data: OrderInput;
    criteria: Criteria;
    protocol_address: string;
};
export type Offer = {
    order_hash: string;
    chain: {};
    criteria?: Criteria;
    protocol_data: SerializedOrder;
    protocol_address: string;
};
export type BuildOfferInput = {
    offerer: string;
    quantity?: number;
    criteria: Criteria;
    protocol_address: string;
    offer_protection_enabled?: boolean;
};
export type PartialParameters = {
    consideration: SerializedConsiderationItem[];
    zone: string;
    zoneHash: string;
};
export type BuildOffer = {
    partialParameters: PartialParameters;
    encoded_token_ids?: string;
};
export type OfferList = {
    offers: Offer[];
};
export type PaginatedOfferList = {
    offers: Offer[];
    next: string;
};
export type ConsiderationInput = {
    asset_contract_address: string;
    token_id: string;
};
export type GenerateOfferFulfillmentInput = {
    offer: FulfillmentInput;
    fulfiller: FulfillerInput;
    consideration?: ConsiderationInput;
};
export type OrderV2 = {
    created_date: string;
    closing_date: string;
    order_hash: string;
    current_price: string;
    side: string;
    cancelled: boolean;
    finalized: boolean;
    remaining_quantity: number;
};
export type SimpleAccount = {};
export type SimpleAccountRead = {
    user: number | null;
    profile_img_url: string;
    address: string;
    config: ConfigEnum;
};
export type SimpleFee = {
    basis_points: string;
};
export type SimpleFeeRead = {
    account: SimpleAccountRead;
    basis_points: string;
};
export type OrderV2Read = {
    created_date: string;
    closing_date: string;
    listing_time: number;
    expiration_time: number;
    order_hash: string;
    protocol_data: SerializedOrder;
    protocol_address: string | null;
    current_price: string;
    maker: SimpleAccountRead;
    taker: SimpleAccountRead;
    maker_fees: SimpleFeeRead[];
    taker_fees: SimpleFeeRead[];
    side: string;
    order_type: OrderTypeEnum;
    cancelled: boolean;
    finalized: boolean;
    marked_invalid: boolean;
    remaining_quantity: number;
    relay_id: string;
    criteria_proof: string[] | null;
    maker_asset_bundle: {
        [key: string]: any;
    };
    taker_asset_bundle: {
        [key: string]: any;
    };
};
export type GetListingsResponse = {
    next: string;
    previous: string;
    orders: OrderV2[];
};
export type GetListingsResponseRead = {
    next: string;
    previous: string;
    orders: OrderV2Read[];
};
export type OrderInputWithProtocol = {
    parameters: OrderInputComponents;
    signature: string;
    protocol_address: string;
};
export type SignedSimpleOrderV2 = {
    created_date: string;
    closing_date: string;
    order_hash: string;
    current_price: string;
    side: string;
    cancelled: boolean;
    finalized: boolean;
    remaining_quantity: number;
};
export type SignedSimpleOrderV2Read = {
    created_date: string;
    closing_date: string;
    listing_time: number;
    expiration_time: number;
    order_hash: string;
    protocol_data: SerializedOrder;
    protocol_address: string | null;
    current_price: string;
    maker: SimpleAccountRead;
    taker: SimpleAccountRead;
    maker_fees: SimpleFeeRead[];
    taker_fees: SimpleFeeRead[];
    side: string;
    order_type: OrderTypeEnum;
    cancelled: boolean;
    finalized: boolean;
    marked_invalid: boolean;
    remaining_quantity: number;
    relay_id: string;
    criteria_proof: string[] | null;
};
export type CreateListingResponse = {
    order: SignedSimpleOrderV2;
};
export type CreateListingResponseRead = {
    order: SignedSimpleOrderV2Read;
};
export type GetOfferResponse = {
    next: string;
    previous: string;
    orders: OrderV2[];
};
export type GetOfferResponseRead = {
    next: string;
    previous: string;
    orders: OrderV2Read[];
};
export type CreateOfferResponse = {
    order: SignedSimpleOrderV2;
};
export type CreateOfferResponseRead = {
    order: SignedSimpleOrderV2Read;
};
export type GetOrderResult = {
    order: Listing | Offer;
};
export type GetTraitResponse = {
    categories?: {
        [key: string]: {};
    };
    counts?: {
        [key: string]: {
            [key: string]: number;
        };
    };
};
/**
 * Get Account
 */
export function getAccount(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: DetailedAccountDataModel;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/accounts/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
/**
 * Get NFTs (by account)
 */
export function listNftsByAccount(address: string, chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", { collection, limit, next }: {
    collection?: string;
    limit?: number;
    next?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ListNftsResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/chain/${encodeURIComponent(chain)}/account/${encodeURIComponent(address)}/nfts${QS.query(QS.explode({
        collection,
        limit,
        next
    }))}`, {
        ...opts
    }));
}
/**
 * Get Contract
 */
export function getContract(address: string, chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ListNftsResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/chain/${encodeURIComponent(chain)}/contract/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
/**
 * Get NFTs (by contract)
 */
export function listNftsByContract(address: string, chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", { limit, next }: {
    limit?: number;
    next?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ListNftsResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/chain/${encodeURIComponent(chain)}/contract/${encodeURIComponent(address)}/nfts${QS.query(QS.explode({
        limit,
        next
    }))}`, {
        ...opts
    }));
}
/**
 * Get an NFT
 */
export function getNft(address: string, chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", identifier: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GetNftResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/chain/${encodeURIComponent(chain)}/contract/${encodeURIComponent(address)}/nfts/${encodeURIComponent(identifier)}`, {
        ...opts
    }));
}
/**
 * Refresh NFT Metadata
 */
export function refreshNft(address: string, chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", identifier: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/api/v2/chain/${encodeURIComponent(chain)}/contract/${encodeURIComponent(address)}/nfts/${encodeURIComponent(identifier)}/refresh`, {
        ...opts,
        method: "POST"
    }));
}
/**
 * Get NFTs (by collection)
 */
export function listNftsByCollection(collectionSlug: string, { limit, next }: {
    limit?: number;
    next?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ListNftsResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/collection/${encodeURIComponent(collectionSlug)}/nfts${QS.query(QS.explode({
        limit,
        next
    }))}`, {
        ...opts
    }));
}
/**
 * Get Collections
 */
export function listCollections({ chainIdentifier, includeHidden, limit, next }: {
    chainIdentifier?: string;
    includeHidden?: boolean;
    limit?: number;
    next?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ListCollectionsResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/collections${QS.query(QS.explode({
        chain_identifier: chainIdentifier,
        include_hidden: includeHidden,
        limit,
        next
    }))}`, {
        ...opts
    }));
}
/**
 * Get a Collection
 */
export function getCollection(collectionSlug: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: DetailedCollectionModel;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/collections/${encodeURIComponent(collectionSlug)}`, {
        ...opts
    }));
}
/**
 * Get Collection Stats
 */
export function getCollectionStats(collectionSlug: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GetCollectionStatsResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/collections/${encodeURIComponent(collectionSlug)}/stats`, {
        ...opts
    }));
}
/**
 * Get Events (by account)
 */
export function listEventsByAccount(address: string, { after, before, chain, eventType, next }: {
    after?: number;
    before?: number;
    chain?: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet";
    eventType?: ("all" | "cancel" | "order" | "redemption" | "sale" | "transfer")[];
    next?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ListEventsResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/events/accounts/${encodeURIComponent(address)}${QS.query(QS.explode({
        after,
        before,
        chain,
        event_type: eventType,
        next
    }))}`, {
        ...opts
    }));
}
/**
 * Get Events (by NFT)
 */
export function listEventsByNft(address: string, chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", identifier: string, { after, before, eventType, next }: {
    after?: number;
    before?: number;
    eventType?: ("all" | "cancel" | "order" | "redemption" | "sale" | "transfer")[];
    next?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ListEventsResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/events/chain/${encodeURIComponent(chain)}/contract/${encodeURIComponent(address)}/nfts/${encodeURIComponent(identifier)}${QS.query(QS.explode({
        after,
        before,
        event_type: eventType,
        next
    }))}`, {
        ...opts
    }));
}
/**
 * Get Events (by collection)
 */
export function listEventsByCollection(collectionSlug: string, { after, before, eventType, next }: {
    after?: number;
    before?: number;
    eventType?: ("all" | "cancel" | "order" | "redemption" | "sale" | "transfer")[];
    next?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ListEventsResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/events/collection/${encodeURIComponent(collectionSlug)}${QS.query(QS.explode({
        after,
        before,
        event_type: eventType,
        next
    }))}`, {
        ...opts
    }));
}
/**
 * Get All Listings (by collection)
 */
export function getAllListingsOnCollectionV2(collectionSlug: string, { limit, next }: {
    limit?: number;
    next?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PaginatedListingList;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/listings/collection/${encodeURIComponent(collectionSlug)}/all${QS.query(QS.explode({
        limit,
        next
    }))}`, {
        ...opts
    }));
}
/**
 * Fulfill a Listing
 */
export function generateListingFulfillmentDataV2(generateListingFulfillmentInput: GenerateListingFulfillmentInput, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: FulfillmentOutput;
    } | {
        status: 400;
    } | {
        status: 500;
    }>("/api/v2/listings/fulfillment_data", oazapfts.json({
        ...opts,
        method: "POST",
        body: generateListingFulfillmentInput
    })));
}
/**
 * Create Criteria Offer
 */
export function postCriteriaOfferV2(postCriteriaOfferInput: PostCriteriaOfferInput, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Offer;
    } | {
        status: 400;
    } | {
        status: 500;
    }>("/api/v2/offers", oazapfts.json({
        ...opts,
        method: "POST",
        body: postCriteriaOfferInput
    })));
}
/**
 * Build an Offer
 */
export function buildOfferV2(buildOfferInput: BuildOfferInput, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: BuildOffer;
    } | {
        status: 400;
    } | {
        status: 500;
    }>("/api/v2/offers/build", oazapfts.json({
        ...opts,
        method: "POST",
        body: buildOfferInput
    })));
}
/**
 * Get Collection Offers
 */
export function getCollectionOffersV2(collectionSlug: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: OfferList;
    } | {
        status: 404;
    } | {
        status: 500;
    }>(`/api/v2/offers/collection/${encodeURIComponent(collectionSlug)}`, {
        ...opts
    }));
}
/**
 * Get All Offers (by collection)
 */
export function getAllOffersOnCollectionV2(collectionSlug: string, { limit, next }: {
    limit?: number;
    next?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PaginatedOfferList;
    } | {
        status: 400;
    } | {
        status: 404;
    } | {
        status: 500;
    }>(`/api/v2/offers/collection/${encodeURIComponent(collectionSlug)}/all${QS.query(QS.explode({
        limit,
        next
    }))}`, {
        ...opts
    }));
}
/**
 * Get Trait Offers
 */
export function getTraitOffersV2(collectionSlug: string, { floatValue, intValue, $type, value }: {
    floatValue?: number;
    intValue?: number;
    $type?: string;
    value?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: OfferList;
    } | {
        status: 400;
    } | {
        status: 404;
    } | {
        status: 500;
    }>(`/api/v2/offers/collection/${encodeURIComponent(collectionSlug)}/traits${QS.query(QS.explode({
        float_value: floatValue,
        int_value: intValue,
        "type": $type,
        value
    }))}`, {
        ...opts
    }));
}
/**
 * Fullfill an Offer
 */
export function generateOfferFulfillmentDataV2(generateOfferFulfillmentInput: GenerateOfferFulfillmentInput, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: FulfillmentOutput;
    } | {
        status: 400;
    } | {
        status: 500;
    }>("/api/v2/offers/fulfillment_data", oazapfts.json({
        ...opts,
        method: "POST",
        body: generateOfferFulfillmentInput
    })));
}
/**
 * Get Listings
 */
export function getListings(chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", protocol: "seaport", { assetContractAddress, bundled, cursor, limit, listedAfter, listedBefore, maker, orderBy, orderDirection, paymentTokenAddress, taker, tokenIds }: {
    assetContractAddress?: string;
    bundled?: boolean;
    cursor?: string;
    limit?: number;
    listedAfter?: string;
    listedBefore?: string;
    maker?: string;
    orderBy?: "created_date" | "eth_price";
    orderDirection?: "asc" | "desc";
    paymentTokenAddress?: string;
    taker?: string;
    tokenIds?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GetListingsResponseRead;
    } | {
        status: 500;
    }>(`/api/v2/orders/${encodeURIComponent(chain)}/${encodeURIComponent(protocol)}/listings${QS.query(QS.explode({
        asset_contract_address: assetContractAddress,
        bundled,
        cursor,
        limit,
        listed_after: listedAfter,
        listed_before: listedBefore,
        maker,
        order_by: orderBy,
        order_direction: orderDirection,
        payment_token_address: paymentTokenAddress,
        taker,
        token_ids: tokenIds
    }))}`, {
        ...opts
    }));
}
/**
 * Create Listing
 */
export function postListing(chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", protocol: "seaport", orderInputWithProtocol: OrderInputWithProtocol, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CreateListingResponseRead;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/orders/${encodeURIComponent(chain)}/${encodeURIComponent(protocol)}/listings`, oazapfts.json({
        ...opts,
        method: "POST",
        body: orderInputWithProtocol
    })));
}
/**
 * Get Individual Offers
 */
export function getOffers(chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", protocol: "seaport", { assetContractAddress, bundled, cursor, limit, listedAfter, listedBefore, maker, orderBy, orderDirection, paymentTokenAddress, taker, tokenIds }: {
    assetContractAddress?: string;
    bundled?: boolean;
    cursor?: string;
    limit?: number;
    listedAfter?: string;
    listedBefore?: string;
    maker?: string;
    orderBy?: "created_date" | "eth_price";
    orderDirection?: "asc" | "desc";
    paymentTokenAddress?: string;
    taker?: string;
    tokenIds?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GetOfferResponseRead;
    } | {
        status: 500;
    }>(`/api/v2/orders/${encodeURIComponent(chain)}/${encodeURIComponent(protocol)}/offers${QS.query(QS.explode({
        asset_contract_address: assetContractAddress,
        bundled,
        cursor,
        limit,
        listed_after: listedAfter,
        listed_before: listedBefore,
        maker,
        order_by: orderBy,
        order_direction: orderDirection,
        payment_token_address: paymentTokenAddress,
        taker,
        token_ids: tokenIds
    }))}`, {
        ...opts
    }));
}
/**
 * Create Individual Offer
 */
export function postOffer(chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", protocol: "seaport", orderInputWithProtocol: OrderInputWithProtocol, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CreateOfferResponseRead;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/orders/${encodeURIComponent(chain)}/${encodeURIComponent(protocol)}/offers`, oazapfts.json({
        ...opts,
        method: "POST",
        body: orderInputWithProtocol
    })));
}
/**
 * Get Order
 */
export function getOrder(chain: "arbitrum" | "arbitrum_goerli" | "arbitrum_nova" | "avalanche" | "avalanche_fuji" | "baobab" | "base" | "base_goerli" | "bsc" | "bsctestnet" | "ethereum" | "goerli" | "klaytn" | "matic" | "mumbai" | "optimism" | "optimism_goerli" | "sepolia" | "solana" | "soldev" | "zora" | "zora_testnet", orderHash: string, protocolAddress: , opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GetOrderResult;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/orders/chain/${encodeURIComponent(chain)}/protocol/${encodeURIComponent(protocolAddress)}/${encodeURIComponent(orderHash)}`, {
        ...opts
    }));
}
/**
 * Get Traits
 */
export function getTraits(collectionSlug: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: GetTraitResponse;
    } | {
        status: 400;
    } | {
        status: 500;
    }>(`/api/v2/traits/${encodeURIComponent(collectionSlug)}`, {
        ...opts
    }));
}
export enum CreatedAtEnum {
    $ = " "
}
export enum CancelEventModelEventTypeEnum {
    Cancel = "cancel"
}
export enum OrderEventModelEventTypeEnum {
    Order = "order"
}
export enum SaleEventModelEventTypeEnum {
    Sale = "sale"
}
export enum TransferEventModelEventTypeEnum {
    Transfer = "transfer"
}
export enum RedemptionEventModelEventTypeEnum {
    Redemption = "redemption"
}
export enum ConfigEnum {
    Affiliate = "affiliate",
    AffiliatePartner = "affiliate_partner",
    AffiliateRequested = "affiliate_requested",
    AffiliateBlacklisted = "affiliate_blacklisted",
    Verified = "verified",
    Moderator = "moderator",
    Staff = "staff",
    Employee = "employee"
}
export enum OrderTypeEnum {
    Basic = "basic",
    Dutch = "dutch",
    English = "english",
    Criteria = "criteria"
}
