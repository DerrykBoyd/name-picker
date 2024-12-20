import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types.js';
import { env } from '$env/dynamic/private';
const { COUCH_URL, COUCH_USER, COUCH_PW } = env;

export function GET(event: RequestEvent) {
	return forwardToCouch(event);
}

export function fallback(event: RequestEvent) {
	return forwardToCouch(event);
}

async function forwardToCouch(event: RequestEvent) {
	try {
		if (!event.locals.user) {
			return error(401, 'Unauthorized');
		}

		const { search } = new URL(event.request.url);
		const path = event.params.couchPath;
		const forwardUrl = new URL(path, COUCH_URL);
		forwardUrl.search = search;

		const req = new Request(forwardUrl, event.request);
		req.headers.set(
			'Authorization',
			`Basic ${Buffer.from(`${COUCH_USER}:${COUCH_PW}`).toString('base64')}`
		);

		const response = await fetch(req);

		const isSafari =
			req.headers.get('User-Agent')?.includes('Safari/') &&
			['Chrome/', 'Chromium/'].every((ua) => !req.headers.get('User-Agent')?.includes(ua));

		if (isSafari)
			return new Response(response.body, {
				...response,
				headers: {
					...response.headers,
					'Cache-Control': 'no-transform'
				}
			});

		return new Response(response.body, response);
	} catch (e) {
		console.error('error forwarding req to couch', e);
		return error(500, 'Internal Server Error');
	}
}
