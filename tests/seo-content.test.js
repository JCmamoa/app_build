/**
 * Automated SEO & Semantic Content Audit
 * Verifies document meta tags, OpenGraph, Twitter Cards, JSON-LD Schema, and semantic heading structure.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('--- [QA SUITE: SEO & Semantic Content Audit] ---');

const htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// Test 1: Essential SEO Meta Tags
console.log('Test 1: Verifying Essential SEO Meta Tags...');
assert.strictEqual(htmlContent.includes('<title>'), true, 'Document must contain <title>');
assert.strictEqual(htmlContent.includes('name="description"'), true, 'Document must contain description meta tag');
assert.strictEqual(htmlContent.includes('name="keywords"'), true, 'Document must contain keywords meta tag');
assert.strictEqual(htmlContent.includes('rel="canonical"'), true, 'Document must contain canonical link');
assert.strictEqual(htmlContent.includes('name="viewport"'), true, 'Document must contain responsive viewport');
console.log('✓ Title, description, keywords, canonical, and viewport tags verified.');

// Test 2: Social Media OpenGraph & Twitter Cards
console.log('Test 2: Verifying Open Graph & Twitter Cards...');
assert.strictEqual(htmlContent.includes('property="og:title"'), true, 'OpenGraph title required');
assert.strictEqual(htmlContent.includes('property="og:description"'), true, 'OpenGraph description required');
assert.strictEqual(htmlContent.includes('property="og:image"'), true, 'OpenGraph image required');
assert.strictEqual(htmlContent.includes('property="twitter:card"'), true, 'Twitter Card tag required');
console.log('✓ Open Graph and Twitter Card tags present and valid.');

// Test 3: Structured Data JSON-LD
console.log('Test 3: Validating JSON-LD Structured Data Schema...');
const jsonLdMatch = htmlContent.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.strictEqual(!!jsonLdMatch, true, 'JSON-LD script block must be present');
const parsedSchema = JSON.parse(jsonLdMatch[1]);
assert.strictEqual(parsedSchema['@context'], 'https://schema.org', 'Schema context must be schema.org');
assert.strictEqual(parsedSchema['@type'], 'ProfessionalService', 'Schema type must be ProfessionalService');
assert.strictEqual(Array.isArray(parsedSchema.serviceType), true, 'Service types list must be present');
console.log('✓ JSON-LD ProfessionalService schema parsed and validated successfully.');

// Test 4: Heading Hierarchy Check
console.log('Test 4: Verifying Semantic Heading Hierarchy...');
const h1Count = (htmlContent.match(/<h1[\s>]/g) || []).length;
assert.strictEqual(h1Count, 1, 'Page must contain exactly one <h1> element for SEO best practice');
const h2Count = (htmlContent.match(/<h2[\s>]/g) || []).length;
assert.strictEqual(h2Count >= 3, true, 'Page must contain at least 3 distinct <h2> section headers');
console.log(`✓ Heading hierarchy verified: exactly 1 <h1> and ${h2Count} <h2> sections.`);

console.log('✅ ALL SEO & CONTENT AUDIT TESTS PASSED.\n');
