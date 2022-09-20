import fs from "node:fs/promises";

import baseDirectory from "./baseDirectory.js";
import envConfig from "../config/envConfig.js";

async function getSubmittedFiles() {
	const submittedDirectory = new URL(envConfig.submission_directory, baseDirectory);
	const files = await fs.readdir(submittedDirectory);

	return files;
}

export default getSubmittedFiles;
