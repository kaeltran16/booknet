import { LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

const loggerFormat = format.printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
});

export class AppLogger implements LoggerService {
	private logger: Logger;

	constructor(label?: string) {
		this.logger = createLogger({
			format: format.combine(format.label({ label }),
				loggerFormat
			),
			transports: [
				new transports.Console(),
				new transports.File({ filename: 'combined.log' })
			]
		});
	}

	debug(message: string) {
		this.logger.debug(message);
	}

	error(message: string, trace: string) {
		this.logger.error(message, trace);
	}

	log(message: string) {
		this.logger.info(message);
	}

	verbose(message: string) {
		this.logger.verbose(message);
	}

	warn(message: string) {
		this.logger.warn(message);
	}
}

