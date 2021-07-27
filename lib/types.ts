import type { IncomingMessage, ServerResponse } from 'http';
import { CarbonProxyLogger } from './logger';

export interface CarbonProxyContext {
	id: string;
	logger: CarbonProxyLogger;
}

export interface CarbonProxyPlugin {
	context: CarbonProxyContext;
	slug: string;
	filter: {
		method: string;
		url: string;
	};
	handler: (request: IncomingMessage, response: ServerResponse) => void;
}
