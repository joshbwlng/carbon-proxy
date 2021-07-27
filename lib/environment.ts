export const environment = {
	port: process.env.PROXY_PORT || 3000,
	plugins: process.env.PLUGINS!.split(',') || [],
};
