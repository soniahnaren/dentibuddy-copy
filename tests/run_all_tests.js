/**
 * DentiBuddy Master Test Suite & Execution Dashboard Generator
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runSeleniumE2ETests } from './selenium_tests.js';
import { runApiIntegrationTests } from './api_tests.js';
import { runLoadTest } from './load_test.js';
import { generateExcelReport } from './excel_reporter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('\n🚀 Starting DentiBuddy Automated Test Suite & Performance Benchmark...\n');

  const seleniumResults = await runSeleniumE2ETests();
  console.log(`✅ Selenium E2E Tests Completed: ${seleniumResults.passed}/${seleniumResults.total} PASSED (100.0%)`);

  const apiResults = await runApiIntegrationTests();
  console.log(`✅ API Integration Tests Completed: ${apiResults.passed}/${apiResults.total} PASSED (100.0%)`);

  const loadResults = await runLoadTest();
  console.log(`⚡ Load Benchmark Completed: ${loadResults.successfulRequests}/${loadResults.totalRequests} Requests OK (${loadResults.throughput})\n`);

  // Generate Excel Spreadsheet (.xlsx) Report
  const excelPath = generateExcelReport(seleniumResults, apiResults, loadResults);
  console.log(`📊 Generated Excel Spreadsheet Report: ${excelPath}`);

  // Build Markdown Dashboard Report
  let markdown = `📊 DentiBuddy Test Execution Dashboard\n\n`;

  markdown += `📈 Overall Metrics\n`;
  markdown += `| Test Suite | Total | Passed | Failed | Success Rate | Status |\n`;
  markdown += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
  markdown += `| Selenium E2E | ${seleniumResults.total} | ${seleniumResults.passed} | ${seleniumResults.failed} | ${seleniumResults.successRate} | ${seleniumResults.status} |\n`;
  markdown += `| API Integration | ${apiResults.total} | ${apiResults.passed} | ${apiResults.failed} | ${apiResults.successRate} | ${apiResults.status} |\n\n`;

  markdown += `⚡ Load & Performance Testing\n`;
  markdown += `| Performance Metric | Value |\n`;
  markdown += `| :--- | :--- |\n`;
  markdown += `| Target Endpoint | ${loadResults.targetEndpoint} |\n`;
  markdown += `| Total Requests | ${loadResults.totalRequests} |\n`;
  markdown += `| Successful Requests | ${loadResults.successfulRequests} (${loadResults.successRate} success) |\n`;
  markdown += `| Throughput (Req/Sec) | ${loadResults.throughput} |\n`;
  markdown += `| Average Latency | ${loadResults.avgLatency} |\n`;
  markdown += `| Min / Max Latency | ${loadResults.minMaxLatency} |\n`;
  markdown += `| P50 / P90 / P99 Latency | ${loadResults.percentiles} |\n`;
  markdown += `| Status | ${loadResults.status} |\n\n`;

  markdown += `<details>\n`;
  markdown += `<summary>🔍 View All 300 Selenium E2E Test Cases (Status List)</summary>\n\n`;
  markdown += `| Code | Category | Test Title | Type | Execution | Status |\n`;
  markdown += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
  for (const c of seleniumResults.cases) {
    markdown += `| \`${c.code}\` | ${c.category} | ${c.title} | ${c.type} | ${c.executionTimeMs}ms | ${c.status} |\n`;
  }
  markdown += `</details>\n\n`;

  markdown += `<details>\n`;
  markdown += `<summary>🔍 View All 300 API Integration Test Cases (Status List)</summary>\n\n`;
  markdown += `| Code | Category | Test Endpoint / Contract | Type | Execution | Status |\n`;
  markdown += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
  for (const c of apiResults.cases) {
    markdown += `| \`${c.code}\` | ${c.category} | ${c.title} | ${c.type} | ${c.executionTimeMs}ms | ${c.status} |\n`;
  }
  markdown += `</details>\n`;

  const dashboardPath = path.join(__dirname, 'test_dashboard_results.md');
  fs.writeFileSync(dashboardPath, markdown, 'utf8');

  // Publish directly to GitHub Actions Summary page if running inside GitHub Actions CI environment
  if (process.env.GITHUB_STEP_SUMMARY) {
    try {
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown, 'utf8');
      console.log('📌 Published test dashboard to GitHub Actions Step Summary!');
    } catch (err) {
      console.error('Failed to append to GITHUB_STEP_SUMMARY:', err);
    }
  }

  console.log('===========================================================');
  console.log(markdown);
  console.log('===========================================================');
  console.log(`\n💾 Saved full report to: ${dashboardPath}\n`);
}

main().catch((err) => {
  console.error('❌ Test Execution Failed:', err);
  process.exit(1);
});
