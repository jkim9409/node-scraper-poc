const { getBrowserInstance } = require('./puppeteerBrowser');

class PagePoolManager {
    constructor(poolSize = 10) {
        this.poolSize = poolSize;
        this.pages = [];
        this.isInitialized = false;
    }

    async init() {
        try {
            const browser = await getBrowserInstance();
            if (!browser) {
                console.error("Browser instance is not available.");
                return;
            }

            for (let i = 0; i < this.poolSize; i++) {
                const page = await browser.newPage();
                this.pages.push(page);
            }

            this.isInitialized = true;
            // console.log(`PagePoolManager initialized with ${this.poolSize} pages.`);
        } catch (error) {
            console.error("Failed to initialize PagePoolManager:", error);
        }
    }

    getPage() {
        // console.log("getPage called")
        if (!this.isInitialized) {
            throw new Error("Page pool manager is not initialized.");
        }

        if (this.pages.length > 0) {
            // console.log("[pageslength: ]")
            // console.log(this.pages.length)
            return this.pages.shift(); // Get a page from the pool
        } else {
            return null; // Indicate no pages are available
        }
    }

    releasePage(page) {
        // console.log("releasePage called")
        this.pages.push(page); // Return the page to the pool
    }
}

const pagePoolManager = new PagePoolManager();
module.exports = pagePoolManager;