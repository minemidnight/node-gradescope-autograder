import Test from "./Test.js";

class ScriptTest extends Test {
	async run() {
		const { stdout, stderr, code } = await super.runScript();

		if(code !== 0) {
			const output = `Exit code: ${code}.\nstdout: ${stdout}\nstderr: ${stderr}`;

			this.result.setOutput(output);
			this.result.setFailed();
			this.result.setScore(0);
		} else {
			const output = `Passed custom test.\nstdout: ${stdout}`;

			this.result.setOutput(output);
			this.result.setPassed();
			this.result.setScore(this.result.getMaxScore());
		}
	}
}

export default ScriptTest;
