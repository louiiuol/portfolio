import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const coveragePath = join(
	__dirname,
	'../coverage/ton-projet/coverage-summary.json'
);
const outputPath = join(__dirname, '../coverage/summary.txt');

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
	if (!existsSync(coveragePath)) {
		console.error('Coverage summary not found.');
		process.exit(1);
	}

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

generateSummary();
