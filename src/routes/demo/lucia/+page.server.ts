import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { user } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/demo/lucia/login');
	}
	return { user: event.locals.user };
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/demo/lucia/login');
	},
	setAge: async (event) => {
		if (!event.locals.user) {
			return fail(401);
		}
		const data = await event.request.formData();
		const age = data.get('age');
		console.log('age:', Number(age));

		if (!age) {
			return fail(400, { message: 'age is required' });
		}

		await db
			.update(user)
			.set({ age: Number(age) })
			.where(eq(user.id, event.locals.user.id));

		return redirect(302, '/demo/lucia');
	}
};
