let plugins: string[] = [];
if (process.env.PLUGINS) {
	plugins = process.env.PLUGINS.split(',');
}

export const environment = {
	port: process.env.PROXY_PORT || 3000,
	plugins,
};
