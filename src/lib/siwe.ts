import { randomStringForEntropy } from '@stablelib/random'
import type { Address, PublicClient } from 'viem'
import type { WalletClient } from 'wagmi';


type SiweMessageParams = {
	/** RFC 4501 dns authority that is requesting the signing. */
	domain: string;

	/** Ethereum address performing the signing conformant to capitalization encoded checksum specified in EIP-55 where applicable. */
	address: string;

	/** Human-readable ASCII assertion that the user will sign, and it must not contain `\n`. */
	statement?: string;

	/** RFC 3986 URI referring to the resource that is the subject of the signing  (as in the __subject__ of a claim). */
	uri: string;

	/** Current version of the message. */
	version: string;

	/** EIP-155 Chain ID to which the session is bound, and the network where Contract Accounts must be resolved. */
	chainId: number;

	/** Randomized token used to prevent replay attacks, at least 8 alphanumeric characters. */
	nonce: string;

	/** ISO 8601 datetime string of the current time. */
	issuedAt?: string;
}


const generateNonce = () => {
	const nonce = randomStringForEntropy(96)

	if (!nonce || nonce.length < 8)
		throw new Error('Error during nonce creation.')

	return nonce
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export const prepareSiweMessage = (message: Optional<SiweMessageParams, 'domain' | 'statement'>) => (
	[
		[
			`${message.domain || globalThis.location.origin} wants you to sign in with your Ethereum account:`,
			message.address,
		],
		[
			message.statement || `Login to ${message.domain}`,
		],
		[
			`URI: ${message.uri || globalThis.location.href}`,
			`Version: ${message.version}`,
			`Chain ID: ${message.chainId || '1'}`,
			`Nonce: ${message.nonce || generateNonce()}`,
			`Issued At: ${message.issuedAt || new Date().toISOString()}`
		],
	].map((lines) => lines.join('\n')).join('\n\n')
)

export const verifySiweSignature = async ({
	publicClient,
	address,
	message,
	signature
}: {
	publicClient: PublicClient,
	address: Address,
	message: string,
	signature: Parameters<PublicClient['verifyMessage']>[0]['signature'],
}) => (
	await publicClient.verifyMessage({
		address,
		message,
		signature
	})
)

export const signInWithEthereum = async ({
	publicClient,
	walletClient,
	account,
	version,
}: {
	publicClient: PublicClient,
	walletClient: WalletClient,
	account: Address,
	version: string,
}) => {
	const preparedMessage = prepareSiweMessage({
		address: account,
		version,
		chainId: walletClient.chain?.id,
	})

	const signature = await walletClient.signMessage({
		account,
		message: preparedMessage,
	})

	const valid = await verifySiweSignature({
		publicClient,
		address: account,
		message: preparedMessage,
		signature,
	})

	return valid
}
