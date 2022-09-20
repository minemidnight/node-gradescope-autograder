import Test from "./Test.js";
import logger from "../logger.js";

import fs from "node:fs/promises";


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
		if(!(test instanceof Test)) {
			throw new TypeError("Result#addTest(Test) must be called with an instance of the Test class");
		}

		this.#data.tests.push(test.result.getJSON());
	}

	async write() {
		const prettyJson = JSON.stringify(this.#data, null, 4);

		await fs.writeFile(this.#file, prettyJson);

		logger.info(`Writing to result file at ${this.#file}`);
	}
}

export default AutograderResult;
