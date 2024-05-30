const puppeteer = require('puppeteer');

let browser;

// Initialize Puppeteer Browser
async function initPuppeteer() {
    if (!browser) {
        browser = await puppeteer.launch({
            // headless: false, // Uncomment if you want to see the browser UI
            // Production 에선 풀어주기
            executablePath: '/usr/bin/chromium-browser',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
              ],
              ignoreHTTPSErrors: true,
        });
    }
    return browser;
}

// Function to close the Puppeteer Browser
async function closePuppeteer() {
    if (browser) {
        await browser.close();
        
        log.info('Puppeteer browser closed successfully.');

    }
}

module.exports = {
    initPuppeteer,
    closePuppeteer,
    getBrowserInstance: () => browser,
};