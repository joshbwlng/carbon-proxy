import npm from 'npm';

export function init(plugins: string[], run: () => void): void {
	npm.load((loadError, _data) => {
		if (loadError) {
			throw loadError;
		}

		npm.commands.install(plugins, (installError, _result) => {
			if (installError) {
				throw installError;
			}

			run();
		});

		npm.on('log', (message: string) => {
			console.log(message);
		});
	});
}
