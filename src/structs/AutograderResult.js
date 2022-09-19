import TestResult from "./TestResult.js";
import fs from "node:fs/promises";

import logger from "../logger.js";

class AutograderResult {
	#file;

	#data = { tests: [] };

	constructor(file) {
		this.#file = file;
	}

	setOutput(text) {
		this.#data.output = text;
	}

	setOverallScore(score) {
		logger.info(`Overriding tests score to ${score}`);

		this.#data.score = score;
	}

	addTest(test) {
		if(!(test instanceof TestResult)) {
			throw new TypeError("Result#addTest(Test) must be called with an instance of the Test class");
		}

		this.#data.tests.push(test.getJSON());
	}

	async write() {
		const prettyJson = JSON.stringify(this.#data, null, 4);

		await fs.writeFile(this.#file, prettyJson);

		logger.info(`Writing to result file at ${this.#file}`);
	}
}

export default AutograderResult;
