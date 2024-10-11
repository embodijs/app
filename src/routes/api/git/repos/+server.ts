import { isAuthenticated } from '$infra/auth/auth.server';
import { loadRepositories } from '$infra/github/repo';
import { json } from '@sveltejs/kit';
import { prepareAsyncPipe, prepareGate } from 'pipe-and-combine';
import type { RequestEvent, RequestHandler } from './$types';

const pipe = prepareAsyncPipe<[RequestEvent], Response>();
const gate = prepareGate(({ locals }: RequestEvent) => [locals]);

export const GET: RequestHandler = pipe(
	gate(isAuthenticated),
	({ locals }) => loadRepositories(locals.session.accessToken),
	json
);
