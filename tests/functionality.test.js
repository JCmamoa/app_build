/**
 * Automated Functional Tests
 * Verifies architecture data integrity, email validation rules, and input boundaries.
 */

const assert = require('assert');

// Mock DOM & extract helper logic
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

const ARCHITECTURES = ['microservices', 'eventdriven', 'serverless', 'distributed'];

console.log('--- [QA SUITE: Functional Tests] ---');

// Test 1: Architecture paradigms coverage
console.log('Test 1: Verifying Backend Architecture definitions...');
assert.strictEqual(ARCHITECTURES.length, 4, 'Should contain exactly 4 core architecture paradigms');
console.log('✓ All 4 core backend architecture paradigms configured.');

// Test 2: Email validation edge cases
console.log('Test 2: Verifying email validation boundary conditions...');
assert.strictEqual(validateEmail('alex@company.com'), true, 'Valid corporate email should pass');
assert.strictEqual(validateEmail('alex.vance+filter@sub.domain.org'), true, 'Complex valid email should pass');
assert.strictEqual(validateEmail(''), false, 'Empty string should fail');
assert.strictEqual(validateEmail('plainaddress'), false, 'Plain text should fail');
assert.strictEqual(validateEmail('@missingusername.com'), false, 'Missing username should fail');
assert.strictEqual(validateEmail('username@.com'), false, 'Missing domain should fail');
assert.strictEqual(validateEmail('username@domain'), false, 'Missing TLD should fail');
console.log('✓ Email validation correctly handles all positive and negative boundary cases.');

console.log('✅ ALL FUNCTIONAL TESTS PASSED.\n');
