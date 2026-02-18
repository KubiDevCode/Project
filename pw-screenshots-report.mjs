/* eslint-disable*/
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const TEST_RESULTS = path.join(ROOT, "test-results");
const SCREENSHOTS_ROOT = path.join(ROOT, "tests", "ui", "__screenshots__"); // твой expected
const OUT = path.join(ROOT, "visual-report");

const EXPECTED_DIR = path.join(OUT, "expected");
const ACTUAL_DIR = path.join(OUT, "actual");
const DIFF_DIR = path.join(OUT, "diff");
const REPORT_HTML = path.join(OUT, "report.html");

function rmAndMkdir(p) {
    fs.rmSync(p, { recursive: true, force: true });
    fs.mkdirSync(p, { recursive: true });
}
function walk(dir, out = []) {
    if (!fs.existsSync(dir)) return out;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(full, out);
        else out.push(full);
    }
    return out;
}
function ensureDirForFile(filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
}
function copy(src, dst) {
    if (!fs.existsSync(src)) return false;
    ensureDirForFile(dst);
    fs.copyFileSync(src, dst);
    return true;
}

// 1) подготовка папок
rmAndMkdir(OUT);
rmAndMkdir(EXPECTED_DIR);
rmAndMkdir(ACTUAL_DIR);
rmAndMkdir(DIFF_DIR);

if (!fs.existsSync(TEST_RESULTS)) {
    console.log("❌ Не найден test-results/. Сначала запусти playwright test.");
    process.exit(1);
}

const files = walk(TEST_RESULTS);
const actuals = files.filter((f) => f.toLowerCase().endsWith("-actual.png"));

if (actuals.length === 0) {
    console.log("✅ Не найдено *-actual.png в test-results — нет упавших screenshot-сравнений.");
    process.exit(0);
}

let pairs = 0;
let missingExpected = 0;

for (const actual of actuals) {
    const baseName = path.basename(actual).replace(/-actual\.png$/i, ".png"); // shared-button--clear.png
    const suiteDir = path.basename(path.dirname(actual)); // storybook-storybook-visual-regression

    // expected лежит в tests/ui/__screenshots__/storybook.spec.ts/<baseName>
    // В твоём логе именно так.
    // Если у тебя много spec-файлов — можно расширить поиск, но начнём с твоей структуры.
    const expectedCandidate = path.join(SCREENSHOTS_ROOT, "storybook.spec.ts", baseName);

    const diff = actual.replace(/-actual\.png$/i, "-diff.png");

    if (!fs.existsSync(expectedCandidate)) {
        missingExpected++;
        continue;
    }

    // раскладываем в visual-report с подпапками, чтобы не конфликтовали имена
    const outRel = path.join(suiteDir, baseName);

    const ok1 = copy(expectedCandidate, path.join(EXPECTED_DIR, outRel));
    const ok2 = copy(actual, path.join(ACTUAL_DIR, outRel));
    if (fs.existsSync(diff)) copy(diff, path.join(DIFF_DIR, outRel));

    if (ok1 && ok2) pairs++;
}

if (pairs === 0) {
    console.log("❌ Не удалось собрать пары expected/actual.");
    if (missingExpected > 0) {
        console.log(`ℹ️ Не найден expected для ${missingExpected} скринов. Проверь папку ${SCREENSHOTS_ROOT} или создай снапшоты: npx playwright test --update-snapshots`);
    }
    process.exit(1);
}

const cmd = `npx reg-cli "${EXPECTED_DIR}" "${ACTUAL_DIR}" "${DIFF_DIR}" -R "${REPORT_HTML}"`;
console.log(`🧩 Собрано пар: ${pairs}`);
console.log("▶ Запуск:", cmd);

try {
    execSync(cmd, { stdio: "inherit" });
} catch {
    console.log("⚠️ reg-cli нашёл отличия (это нормально).");
}

console.log(`✅ Открой отчёт: ${REPORT_HTML}`);