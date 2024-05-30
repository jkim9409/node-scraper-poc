const { getBrowserInstance } = require('../utils/puppeteerBrowser');
const pagePoolManager = require('../utils/pagePoolManager');
const { JSDOM } = require('jsdom');

async function performSimpleScraping(url,xpath) {
    
    // Placeholder: Imagine this function scrapes data from the provided URL
    const page = pagePoolManager.getPage();


    if (!page) {
        console.error("No available page instances. The system is currently at capacity.");
        return { error: "The system is currently at capacity. Please try again later." };
    }

    
    try {
        //
        // await page.goto(url, { waitUntil: 'networkidle2' }); // Navigate to the URL

        // can be faster
        // console.log("Scraping start....")
        await page.goto(url, { waitUntil: 'domcontentloaded' }); // Navigate to the URL
        


        // console.log("negivating to page")
        // Placeholder for scraping logic
        let data = 'Content not found';
        
        // await new Promise(resolve => setTimeout(resolve, 5000));
        // Example: Scraping the entire page's outer HTML
        // data = await page.evaluate(() => document.documentElement.outerHTML);

        // Xpath 내부에있는,
        // Xpath 사용시, 확인후 로직 처리 필요, page닫는거 중요
        const elementHandle = await page.waitForSelector(`::-p-xpath(${xpath})`);
        const innerHTML = await page.evaluate(el => el.innerHTML, elementHandle);
        await elementHandle.dispose();
        const dom = new JSDOM(innerHTML);
        const document = dom.window.document;

        const parseElement = (element) => {
            const children = [...element.children];
            if (children.length === 0) {
             return element.textContent.trim();
            }
        const obj = {};
        children.forEach(child => {
            const tag = child.tagName.toLowerCase();
            if (!obj[tag]) {
                obj[tag] = [];
            }
            obj[tag].push(parseElement(child));
        });
        return obj;
    };
        
        const parsedData = parseElement(document.body);
        
        
        const result = {
            url: page.url(),
            data: parsedData
          };
          
          // console.log("Scraping finished....")
        // console.log("scraping finished")
        // Remember to release the page back to the pool once you're done
        pagePoolManager.releasePage(page);


        return result;

        // Return scraped data
        // await new Promise(resolve => setTimeout(resolve, 5000));
        
    } catch (error) {
        // console.log(`Error scraping ${url}:`, error);
        
        // In case of an error, make sure to release the page back to the pool
        pagePoolManager.releasePage(page);
        // await new Promise(resolve => setTimeout(resolve, 5000));
        return { error: "Error during scraping process." };
    }
  }
  
  module.exports = {
    performSimpleScraping,
  };