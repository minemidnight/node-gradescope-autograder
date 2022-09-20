import Constants from "../Constants.js";
import logger from "../logger.js";

import YAML from "yaml";

import { readFile } from "node:fs/promises";

async function loadEnvConfig() {
	const env = process.env.NODE_ENV;
	let configURL;

	if(env in Constants.envConfigs.mapping) {
		configURL = new URL(Constants.envConfigs.mapping[env], import.meta.url);
	} else {
		configURL = new URL(Constants.envConfigs.mapping[Constants.envConfigs.default], import.meta.url);

		logger.warn(`Could not find config for environment ${env}. Falling back to default environment: ${Constants.envConfigs.default}`);
	}

	logger.info(`Using environment ${env} config located at ${configURL}`);
	const fileContents = await readFile(configURL, { encoding: "utf-8" });

	return YAML.parse(fileContents);
}

const config = await loadEnvConfig();

export default config;
