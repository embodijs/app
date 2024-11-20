import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { createSession, generateSessionToken, setSessionTokenCookie } from './lucia.server.js';
import { GitHub } from 'arctic';

import fs from 'fs';
import type { RequestEvent } from '@sveltejs/kit';
import type { DatabaseUser } from '$db/schema.js';

const githubPrivateKey = fs.readFileSync('Embodi-Localhost-Private-Key.pem', 'utf8');

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

export const generateGithubJWT = () => {
	const payload = {
		iss: GITHUB_CLIENT_ID,
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + 10 * 60
	};
	const token = jwt.sign(payload, githubPrivateKey, { algorithm: 'RS256' });
	return token;
};

export const setLuciaSessionAndCookie = async (
	event: RequestEvent,
	gitToken: string,
	user: DatabaseUser
) => {
	const { id } = user;
	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, id, gitToken);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);
};
