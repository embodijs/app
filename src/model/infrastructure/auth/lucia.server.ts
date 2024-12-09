import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$db/init.server';
import { TYPEID, type TypeId } from '$lib/typeid';
import { type UserId, schema as userSchema } from '$core/user';
import { type StoredSession, schema as sessionSchema } from '$core/session';
import { removeNil } from '$lib/helpers/database';

const storage = {
	user: userSchema.storage,
	session: sessionSchema.storage
};

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

export function generateSessionToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(18));
	const token = encodeBase64url(bytes);
	return token;
}

export function encodeSessionToken(token: string): TypeId<TYPEID.SESSION> {
	const encoded = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	return `${TYPEID.SESSION}-${encoded}`;
}

export async function createSession(token: string, userId: UserId, accessToken: string) {
	const session: StoredSession = {
		id: encodeSessionToken(token),
		userId,
		accessToken,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(storage.session).values(session);
	return session;
}

export async function validateSessionToken(token: string) {
	const sessionId = encodeSessionToken(token);
	const result = await db
		.select({
			// Adjust user storage here to tweak returned data
			user: {
				id: storage.user.id,
				name: storage.user.name,
				email: storage.user.email,
				avatar: storage.user.avatarUrl,
				platformData: storage.user.platformData
			},
			session: storage.session
		})
		.from(storage.session)
		.innerJoin(storage.user, eq(storage.session.userId, storage.user.id))
		.where(eq(storage.session.id, sessionId))
		.get();

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(storage.session).where(eq(storage.session.id, session.id));
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(storage.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(storage.session.id, session.id));
	}

	return {
		session: removeNil(session),
		user: removeNil(user)
	};
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: TypeId<TYPEID.SESSION>) {
	await db.delete(storage.session).where(eq(storage.session.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}
