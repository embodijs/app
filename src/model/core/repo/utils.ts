import type { NewRepo, Repo } from './types';

export const isNewRepo = (repo: Repo | NewRepo): repo is NewRepo => {
	return !('id' in repo) || typeof repo.id !== 'string';
};

export const isExistingRepo = (repo: Repo | NewRepo): repo is Repo => {
	return 'id' in repo && typeof repo.id === 'string';
};
