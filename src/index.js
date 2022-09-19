import logger from "./logger.js";

import path from "path";

import baseDirectory from "./util/baseDirectory.js";
import envConfig from "./config/envConfig.js";
import testsConfig from "./config/testsConfig.js";

import AutograderResult from "./structs/AutograderResult.js";

import getSubmittedFiles from "./util/getSubmittedFiles.js";
import loadTests from "./util/loadTests.js";

async function verifySubmittedFiles() {
	const submitted = await getSubmittedFiles();
	const required = testsConfig.required_files;

	const missingFiles = required.filter(file => !submitted.includes(file));

	if(missingFiles.length > 0) {
		throw new Error(`TODO: did not submit all files. Missing: ${missingFiles.join(", ")}`);
	} else {
		logger.info("All required files submitted.");
	}
}

async function init() {
	const resultsFile = new URL(envConfig.output_directory, baseDirectory);

	resultsFile.pathname = path.join(resultsFile.pathname, envConfig.output_file);

	const result = new AutograderResult(resultsFile);

	await verifySubmittedFiles();

	const tests = await loadTests();

	logger.debug("%O", tests);

	await result.write();
}

init();
