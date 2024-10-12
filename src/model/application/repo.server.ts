import { loadRepositories } from '$infra/github/repo';
import { asyncPipe } from 'pipe-and-combine';

export const getAllRepositories = asyncPipe(loadRepositories);
