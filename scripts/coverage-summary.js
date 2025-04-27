// scripts/coverage-summary.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const summary = JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf8'));

const total = summary.total;

// Formatage Markdown
const markdown = `
## 🛡️ Code Coverage Report

| Metric         | Covered | Total | %     |
|----------------|---------|-------|-------|
| Statements     | ${total.statements.covered} / ${total.statements.total} | ${total.statements.pct}% |
| Branches       | ${total.branches.covered} / ${total.branches.total} | ${total.branches.pct}% |
| Functions      | ${total.functions.covered} / ${total.functions.total} | ${total.functions.pct}% |
| Lines          | ${total.lines.covered} / ${total.lines.total} | ${total.lines.pct}% |

`;

console.log(markdown);

// Fail si couverture < 80%
const coverageThreshold = 80;
if (total.lines.pct < coverageThreshold) {
	console.error(`❌ Coverage is below threshold (${coverageThreshold}%)`);
	process.exit(1);
}
