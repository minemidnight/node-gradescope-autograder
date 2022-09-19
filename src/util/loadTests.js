import fs from "node:fs/promises";
import path from "path";

import baseDirectory from "./baseDirectory.js";
import testsConfig from "../config/testsConfig.js";
import Test from "../structs/Test.js";

async function getTestFolders() {
	const submittedDirectory = new URL(testsConfig.tests_directory, baseDirectory);

	const dirs = await fs.readdir(submittedDirectory);

	return dirs;
}

async function loadTests() {
	const testFolders = await getTestFolders();

	const tests = [];

	for(const folder of testFolders) {
		const dirPath = path.join(testsConfig.tests_directory, folder);

		tests.push(new Test(dirPath));
	}

	return tests;
}

export default loadTests;
