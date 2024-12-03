import { loadRepositories } from '$infra/github/repo';
import { pipe } from 'pipe-and-combine';

export const getAllRepositories = pipe(loadRepositories);
