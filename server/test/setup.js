// Defaults so server modules can load without a real .env
const testEnv = { jwtToken: 'test-secret', bNetClientID: 'test', bNetClientSecret: 'test', bNetRedirect: 'http://localhost/callback', runWorkers: 'false', runNewRelic: 'false', environment: 'local' };
Object.keys(testEnv).forEach(k => { if (process.env[k] === undefined) process.env[k] = testEnv[k]; });

// Global test setup - logs which test file is running
const path = require('path');

// Track which files we've already logged to avoid duplicate logs
const loggedFiles = new Set();

beforeEach(function() {
  if (this.currentTest) {
    // Get the test file from the suite's file property
    let testFile = null;
    let suite = this.currentTest.parent;
    
    // Climb up the suite hierarchy to find the file
    while (suite && !testFile) {
      if (suite.file) {
        testFile = suite.file;
        break;
      }
      suite = suite.parent;
    }
    
    if (testFile && !loggedFiles.has(testFile)) {
      loggedFiles.add(testFile);
      const relativePath = path.relative(process.cwd(), testFile);
      console.log(`\n📄 Testing file: ${relativePath}`);
    }
  }
});

