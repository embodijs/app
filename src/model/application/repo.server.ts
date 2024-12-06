import { infra } from '$infra';
import { pipe } from 'pipe-and-combine';

export const getAllRepositories = pipe(infra.git.repo.load);
