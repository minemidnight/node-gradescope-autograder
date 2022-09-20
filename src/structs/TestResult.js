class TestResult {
	#data = {};

	constructor(name) {
		this.#data.name = name;
	}

	setScore(score) {
		this.#data.score = score;
	}

	getMaxScore() {
		return this.#data.maxScore;
	}

	setMaxScore(maxScore) {
		this.#data.maxScore = maxScore;
	}

	setVisibility(visiblity) {
		this.#data.visiblity = visiblity;
	}

	setFailed() {
		this.#data.status = "failed";
	}

	setPassed() {
		this.#data.status = "passed";
	}

	setOutput(text) {
		this.#data.output = text;
	}

	getJSON() {
		return this.#data;
	}
}

export default TestResult;
