// scripts/coverage-summary.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const COVERAGE_THRESHOLDS = {
	HIGH: 80,
	MEDIUM: 50,
};

// Fix pour __dirname en module ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lecture du fichier de coverage
const coverageSummaryPath = path.join(
	__dirname,
	'../coverage/portfolio/coverage-summary.json'
);

if (!fs.existsSync(coverageSummaryPath)) {
	console.error('❌ Coverage summary file not found.');
	process.exit(1);
}

function getBadge(percentage) {
	if (percentage >= 80) {
		return '🟩';
	}
	if (percentage >= 50) {
		return '🟧';
	}
	return '🟥';
}

function generateSummary() {
	const coverage = JSON.parse(readFileSync(coveragePath, 'utf-8'));
	const total = coverage.total;

	const badge = getBadge(total.statements.pct);

	const lines = [
		`# 🛡️ Test Coverage Report`,
		``,
		`| Type        | %     |`,
		`|-------------|-------|`,
		`| Statements  | ${total.statements.pct}% |`,
		`| Branches    | ${total.branches.pct}% |`,
		`| Functions   | ${total.functions.pct}% |`,
		`| Lines       | ${total.lines.pct}% |`,
		``,
		`${badge} **Global Coverage:** ${total.statements.pct}%`,
	];

	writeFileSync(outputPath, lines.join('\n'));
	console.log('✅ Coverage summary generated with badge!');
}

if (require.main === module) {
	generateSummary();
}
