import { createLogger, format, transports } from "winston";
const {
	combine, splat, timestamp, printf
} = format;

const formatter = printf(data => {
	let msg = `${data.timestamp} [${data.level}] : ${data.message} `;

	if(data.metadata) msg += JSON.stringify(data.metadata);

	return msg;
});

const logger = createLogger({
	level: "debug",
	format: combine(
		format.colorize(),
		splat(),
		timestamp(),
		formatter
	),
	transports: [new transports.Console()]
});

export default logger;
