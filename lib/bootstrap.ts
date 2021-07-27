import npm from 'npm';
import { v4 as uuid } from 'uuid';
import { CarbonProxyLogger } from './logger';
import type { CarbonProxyContext, CarbonProxyPlugin } from './types';

const contextId = `CARBON-PROXY-${uuid().split('-')[0]}`;
const context: CarbonProxyContext = {
	id: contextId,
	logger: new CarbonProxyLogger(contextId),
};

export function init(
	pluginNames: string[],
	run: (context: CarbonProxyContext, plugins: CarbonProxyPlugin[]) => void,
): void {
	context.logger.info('Loading npm');
	npm.load((loadError, _data) => {
		if (loadError) {
			throw loadError;
		}

		context.logger.info('Installing plugins', {
			plugins: pluginNames,
		});
		npm.commands.install(pluginNames, (installError, _result) => {
			if (installError) {
				throw installError;
			}

			// TODO: Add slug collision checks, etc.
			const plugins: CarbonProxyPlugin[] = [];
			for (const pluginName of pluginNames) {
				const Plugin = require(pluginName);
				plugins.push(new Plugin[Object.keys(Plugin)[0]](context));
			}
			run(context, plugins);
		});
	});
}
