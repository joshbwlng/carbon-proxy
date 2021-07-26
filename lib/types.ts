import type { IncomingMessage, ServerResponse } from 'http';

export interface CarbonProxyPlugin {
	slug: string;
	filter: {
		method: string;
		url: string;
	};
	handler: (request: IncomingMessage, response: ServerResponse) => void;
}
