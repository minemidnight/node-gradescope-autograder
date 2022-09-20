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
	let okay = true;

	try {
		await verifySubmittedFiles();
	} catch(err) {
		result.setOutput(err.message);
		result.setOverallScore(0);

		logger.error("Failed to find all required files", err);

		okay = false;
	}

	const tests = await loadTests();

	if(okay && tests.bootstrap) {
		try {
			await tests.bootstrap.run();

			result.addTest(tests.bootstrap);
		} catch(err) {
			result.setOutput(err.message);
			result.setOverallScore(0);

			logger.error("Failed to bootstrap submission", err);
			okay = false;
		}
	}

	if(okay) {
		for(const ioTest of tests.io) {
			await ioTest.run();

			result.addTest(ioTest);
		}

		for(const unitTest of tests.unit) {
			await unitTest.run();

			result.addTest(unitTest);
		}

		for(const scriptTest of tests.script) {
			await scriptTest.run();

			result.addTest(scriptTest);
		}
	}

	await result.write();
}

init();
