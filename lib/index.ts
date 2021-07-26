import express from 'express';
import * as http from 'http';
import httpProxy from 'http-proxy';
import { init } from './bootstrap';
export * from './types';

const PROXY_PORT = 3000;
const plugins = ['static-eval'];

init(plugins, () => {
	const proxy = httpProxy.createProxyServer({});
	const app = express();

	// TODO: Add HTTPS support
	app.get(
		'*',
		(request: http.IncomingMessage, response: http.ServerResponse) => {
			console.log('Request', request.method, request.url);
			proxy.web(request, response, {
				target: request.url,
			});
		},
	);

	app.listen(PROXY_PORT, () => {
		console.log('Server listening on port:', PROXY_PORT);
	});
});
