import { describe, test, expect } from 'vitest';
import { isNewRepo } from './utils';
import type { NewRepo, Repo } from './types';

describe('isNewRepo', () => {
	test('should return true if repo is a new repo', () => {
		expect(isNewRepo({} as NewRepo)).toBe(true);
	});

	test('should return false if repo is not a new repo', () => {
		expect(isNewRepo({ id: '123' } as unknown as Repo)).toBe(false);
	});
});
