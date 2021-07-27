import logger from 'npmlog';
import { CarbonProxyPlugin } from './types';
export { CarbonProxyPlugin };

export class CarbonProxyLogger {
	public contextId: string;

	constructor(contextId: string) {
		this.contextId = contextId;
	}

	info(message: string, data?: any): void {
		if (data) {
			logger.info(this.contextId, message, data);
		} else {
			logger.info(this.contextId, message);
		}
	}

	warn(message: string, data?: any): void {
		if (data) {
			logger.info(this.contextId, message, data);
		} else {
			logger.info(this.contextId, message);
		}
	}

	error(message: string, data?: any): void {
		if (data) {
			logger.error(this.contextId, message, data);
		} else {
			logger.error(this.contextId, message);
		}
	}
}
