import fs from "node:fs/promises";
import path from "path";

import baseDirectory from "./baseDirectory.js";
import testsConfig from "../config/testsConfig.js";
import logger from "../logger.js";

import Test from "../structs/Test.js";
import BootstrapTest from "../structs/BootstrapTest.js";
import IOTest from "../structs/IOTest.js";
import UnitTest from "../structs/UnitTest.js";
import ScriptTest from "../structs/ScriptTest.js";

async function getTestFolders() {
	const submittedDirectory = new URL(testsConfig.tests_directory, baseDirectory);

	const dirs = await fs.readdir(submittedDirectory);

	return dirs;
}

async function loadTests() {
	const testFolders = await getTestFolders();

	const tests = {
		bootstrap: null,
		io: [],
		unit: [],
		script: []
	};

	for(const folder of testFolders) {
		const dirPath = path.join(testsConfig.tests_directory, folder);

		const config = await Test.loadConfig(dirPath);

		if(!("type" in config)) {
			throw new Error(`Test folder ${folder} missing test type.`);
		} else if(!("name" in config)) {
			throw new Error(`Test folder ${folder} missing test name.`);
		}

		const type = config.type.toLowerCase();

		if(type === "bootstrap") {
			tests.bootstrap = new BootstrapTest(dirPath, config);
		} else if(type === "io") {
			const test = new IOTest(dirPath, config);

			tests.io.push(test);
		} else if(type === "script") {
			const test = new ScriptTest(dirPath, config);

			tests.script.push(test);
		} else if(type === "unit") {
			const test = new UnitTest(dirPath, config);

			tests.unit.push(test);
		} else {
			throw new Error(`Test folder ${folder} has invalid test type: ${type}`);
		}

		logger.debug(`Loaded "${config.name}" from ${folder}`);
	}

	return tests;
}

export default loadTests;
