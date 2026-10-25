// Runs each test file in its own mocha process (several files register global
// before/after hooks that collide in a single run), then merges V8 coverage.
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const tempDir = path.join(root, 'coverage', 'tmp');
const testDir = path.join(root, 'server', 'test');

function findTests(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) return findTests(p);
        return e.name.endsWith('.test.js') ? [p] : [];
    });
}

fs.rmSync(path.join(root, 'coverage'), { recursive: true, force: true });
fs.mkdirSync(tempDir, { recursive: true });

const mocha = require.resolve('mocha/bin/mocha.js');
const env = { ...process.env, NODE_V8_COVERAGE: tempDir };
const failed = [];

findTests(testDir).forEach(file => {
    const rel = path.relative(root, file);
    console.log(`\n=== ${rel}`);
    const r = spawnSync(process.execPath, [mocha, path.join(testDir, 'setup.js'), file,
        '--reporter', 'dot', '--timeout', '10000', '--exit'], { cwd: root, env, stdio: 'inherit' });
    if (r.status !== 0) failed.push(rel);
});

const c8 = require.resolve('c8/bin/c8.js');
spawnSync(process.execPath, [c8, 'report'], { cwd: root, stdio: 'inherit' });

if (failed.length) {
    console.log(`\n${failed.length} test file(s) had failures:\n  ${failed.join('\n  ')}`);
    process.exit(1);
}
