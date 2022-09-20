import YAML from "yaml";
import path from "path";

import TestResult from "./TestResult.js";

import envConfig from "../config/envConfig.js";
import baseDirectory from "../util/baseDirectory.js";

import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import logger from "../logger.js";

class Test {
	#directory;
	#config;
	#timeout;

	constructor(directory, config) {
		this.#directory = directory;
		this.#config = config;

		this.result = new TestResult(this.getConfigValue("name"));

		if(this.hasConfigValue("max_score")) {
			const maxScore = parseInt(this.getConfigValue("max_score"));

			if(isNaN(maxScore)) {
				throw new Error("Max score is non-integer");
			} else {
				this.result.setMaxScore(maxScore);
			}
		}

		if(this.hasConfigValue("timeout")) {
			const timeout = parseInt(this.getConfigValue("timeout"));

			if(isNaN(timeout)) {
				throw new Error("Script timeout is non-integer");
			} else {
				this.#timeout = 1000 * timeout;
			}
		} else {
			this.#timeout = 1000 * 30;
		}

		if(this.hasConfigValue("visibility")) {
			const visiblity = this.getConfigValue("visibility");

			this.result.setVisibility(visiblity);
		}
	}

	static async loadConfig(directory) {
		const configFile = path.join(directory, "/test.yml");
		const configURL = new URL(configFile, baseDirectory);

		const fileContents = await readFile(configURL, { encoding: "utf-8" });

		return YAML.parse(fileContents);
	}

	hasConfigValue(key) {
		return key in this.#config;
	}

	getConfigValue(key) {
		return this.#config[key];
	}

	getRelativePath(segment) {
		return path.join(this.#directory, segment);
	}

	runScript(input) {
		const scriptFile = this.getRelativePath("/test.sh");
		const scriptURL = new URL(scriptFile, baseDirectory);

		const testDirectory = new URL(this.#directory, baseDirectory);
		const submittedDirectory = new URL(envConfig.submission_directory, baseDirectory);

		const env = { ...process.env };

		env.SUBMISSION_DIR = submittedDirectory.pathname;
		env.TEST_DIR = testDirectory.pathname;

		logger.info(`Running test script for ${this.getConfigValue("name")}`);

		return new Promise(resolve => {
			const child = execFile(scriptURL.pathname, {
				cwd: submittedDirectory.pathname,
				env,
				timeout: this.#timeout,
				maxBuffer: 1024 * 1024
			});

			if(input && input.length > 0) {
				child.stdin.write(input);
				child.stdin.end();
			}

			let stdout = "";
			let stderr = "";

			child.stdout.setEncoding("utf8");
			child.stdout.on("data", data => {
				stdout += data.toString();
			});

			child.stderr.setEncoding("utf8");
			child.stderr.on("data", data => {
				stderr += data.toString();
			});

			child.once("close", code => {
				resolve({ stdout, stderr, code });
			});
		});
	}

	run() {
		throw new Error("run() function not implemented");
	}
}

export default Test;
