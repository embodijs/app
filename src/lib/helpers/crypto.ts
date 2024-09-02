export const generateSimpleHash = async (rawData: unknown): Promise<string> => {
	const data = typeof rawData === 'object' ? JSON.stringify(rawData) : String(rawData);

	const msgBuffer = new TextEncoder().encode(data);
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};
