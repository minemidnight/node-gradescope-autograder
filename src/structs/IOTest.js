import Test from "./Test.js";

import baseDirectory from "../util/baseDirectory.js";
import { readFile } from "node:fs/promises";

class IOTest extends Test {
	#checker;
	#displayDiff;

	constructor(directory, config) {
		super(directory, config);

		if(!this.hasConfigValue("io_check")) {
			throw new Error("IO Test does not have an io_check value.");
		}

		const checkType = this.getConfigValue("io_check").toLowerCase();

		if(checkType === "strict") {
			this.#checker = this.checkOutputStrictly;
		} else if(checkType === "flexible") {
			this.#checker = this.checkOutputFlexibly;
		} else {
			throw new Error(`Invalid IO check type: ${checkType}.`);
		}


		this.#displayDiff = Boolean(this.getConfigValue("display_diff"));
	}

	getInput() {
		const filePath = this.getRelativePath("in.txt");
		const fileURL = new URL(filePath, baseDirectory);

		return readFile(fileURL, { encoding: "utf-8" });
	}

	async getExpectedOutput() {
		const filePath = this.getRelativePath("expected.txt");
		const fileURL = new URL(filePath, baseDirectory);

		const contents = await readFile(fileURL, { encoding: "utf-8" });

		return contents.trimEnd();
	}

	async run() {
		const inp = await this.getInput();
		const { stdout, stderr, code } = await super.runScript(inp);

		if(code !== 0) {
			const output = `Exit code: ${code}.\nstdout: ${stdout}\nstderr: ${stderr}`;

			this.result.setOutput(output);
			this.result.setFailed();
			this.result.setScore(0);
			return;
		}

		await this.#checker(stdout.trimEnd());
	}

	async checkOutputStrictly(out) {
		const expectedOutput = await this.getExpectedOutput();

		if(out === expectedOutput) {
			this.result.setOutput(`Output matches expected output.\nCode Output:\n${out}`);
			this.result.setPassed();

			this.result.setScore(this.result.getMaxScore());
		} else {
			let feedback = `Output does not match expected output.\nCode Output:\n${out}`;

			if(this.#displayDiff) {
				feedback += `\n\nExpected output:\n${expectedOutput}`;
			}

			this.result.setOutput(feedback);
			this.result.setFailed();

			this.result.setScore(0);
		}
	}

	async checkOutputFlexibly(rawOut) {
		const expectedOutput = await this.getExpectedOutput();
		const expectedLines = expectedOutput.split("\n");
		const outLines = rawOut.split("\n");

		let i = 0, j = 0;

		while(i < expectedLines.length && j < outLines.length) {
			const expected = expectedLines[i];
			const out = outLines[j];

			if(expected.trim() === out.trim()) {
				i++;
				j++;
			} else {
				let feedback = `Output does not match expected output.\nCode Output:\n${rawOut}`;

				if(this.#displayDiff) {
					feedback += `\n\nDifference found on line ${i}: expected\n${expected}\n but received \n${out}`;
				}

				this.result.setOutput(feedback);
				this.result.setFailed();

				this.result.setScore(0);
				return;
			}
		}

		this.result.setOutput(`Output matches expected output.\nCode Output:\n${rawOut}`);
		this.result.setPassed();

		this.result.setScore(this.result.getMaxScore());
	}
}

export default IOTest;
