const fs = require('fs');
const cheerio = require('cheerio');
const glob = require('glob');
const path = require('path');

// Define the directory containing your generated HTML files
const htmlFiles = glob.sync('./out/**/*.html');

htmlFiles.forEach(file => {
	console.log(`Processing file: ${file}`);

	const html = fs.readFileSync(file, 'utf8');
	const $ = cheerio.load(html);

	/*
	 * Find all script tags in the <head> with noModule attribute and add "defer."
	 * The link element causes render blocking, but remove it will cause FOUC.
	 */
	// $('link[rel="stylesheet"]').remove();

	const webpackScripts = $('body script[async]');
	webpackScripts.each((i, elem) => {
		$(elem).removeAttr('async').attr('defer', '');
	});

	// Defer polyfill script
	const appendScripts = [];
	const polyfillScript = $('head script[noModule]');

	polyfillScript.each((i, elem) => {
		$(elem).attr('defer', '');
		appendScripts.push($(elem));
	});

	polyfillScript.remove();

	// Find all script tags in the <head> and replace "async" with "defer"
	const asyncScriptInHead = $('head script[async]');

	asyncScriptInHead.each((i, elem) => {
		$(elem).removeAttr('async').attr('defer', '');
		appendScripts.push($(elem));
	});

	// Remove the modified script tags from <head>
	asyncScriptInHead.remove();

	// Move the modified script tags after </main> in the <body>
	const mainElement = $('main');
	mainElement.after(appendScripts);

	// Write the modified HTML back to the file
	fs.writeFileSync(file, $.html());
});

const appRoot = path.resolve(__dirname, '../');
const relativeScriptPath = path.relative(appRoot, __filename);

console.log('Tasks are completed');
console.log(`Dir: ${relativeScriptPath}`);
