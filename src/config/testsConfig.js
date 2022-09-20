import logger from "../logger.js";
import baseDirectory from "../util/baseDirectory.js";

import YAML from "yaml";

import { readFile } from "node:fs/promises";

async function loadTestConfig() {
	const configURL = new URL("config.yml", baseDirectory);

	logger.info(`Loading config for tests at ${configURL}`);
	const fileContents = await readFile(configURL, { encoding: "utf-8" });

	return YAML.parse(fileContents);
}

const config = await loadTestConfig();

export default config;
