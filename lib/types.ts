import * as http from 'http';

export interface CarbonPluginFilter {
	url: string;
}

export interface CarbonPlugin {
	slug: string;
	filter: CarbonPluginFilter;
	handler: (
		request: http.IncomingMessage,
		response: http.ServerResponse,
	) => void;
}
