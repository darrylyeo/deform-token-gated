import { env } from '$env/dynamic/private'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handleSession } from 'svelte-kit-cookie-session'


export const handle: Handle = sequence(
    handleSession({
		secret: env.SESSION_SECRET,
		saveUninitialized: true,
		expires: 120,
		expires_in: 'minutes',
	}),
	({ resolve, event }) => {
		return resolve(event)
	}
)
