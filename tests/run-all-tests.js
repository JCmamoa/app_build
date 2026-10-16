/**
 * Comprehensive Master Test Runner
 * Executes all automated test suites: Functionality, Security, and SEO.
 */

console.log('=====================================================');
console.log('  APEX ARCHITECTURES - AUTOMATED QA TEST SUITE       ');
console.log('=====================================================\n');

try {
  require('./functionality.test.js');
  require('./security-audit.test.js');
  require('./seo-content.test.js');

  console.log('=====================================================');
  console.log('  🎉 100% OF TESTS PASSED - PRODUCTION READY (QA)   ');
  console.log('=====================================================');
  process.exit(0);
} catch (err) {
  console.error('\n❌ QA TEST SUITE FAILED:');
  console.error(err.message);
  process.exit(1);
}
