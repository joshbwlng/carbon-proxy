import express from 'express';
import type { IncomingMessage, ServerResponse } from 'http';
import httpProxy from 'http-proxy';
import { init } from './bootstrap';
import { environment } from './environment';
import { CarbonProxyContext, CarbonProxyPlugin } from './types';
export { CarbonProxyContext, CarbonProxyPlugin };

init(
	environment.plugins,
	(context: CarbonProxyContext, plugins: CarbonProxyPlugin[]) => {
		const proxy = httpProxy.createProxyServer({});
		const app = express();

		// TODO: Add HTTPS support
		app.get('*', (request: IncomingMessage, response: ServerResponse) => {
			context.logger.info('Request', {
				method: request.method,
				url: request.url,
			});
			for (const plugin of plugins) {
				plugin.handler(request, response);
			}
			proxy.web(request, response, {
				target: request.url,
			});
		});

		app.listen(environment.port, () => {
			context.logger.info(`Proxy server started on port ${environment.port}`);
		});
	},
);
