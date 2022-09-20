import Test from "./Test.js";

class BootstrapTest extends Test {
	async run() {
		const { stdout, stderr, code } = await super.runScript();

		if(code !== 0) {
			const output = `Exit code: ${code}.\nstdout: ${stdout}\nstderr: ${stderr}`;

			this.result.setOutput(output);
			this.result.setFailed();

			throw new Error(output);
		} else {
			this.result.setOutput(stdout);
			this.result.setPassed();
		}
	}
}

export default BootstrapTest;
