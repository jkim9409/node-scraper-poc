const { getBrowserInstance } = require('../utils/puppeteerBrowser');
const pagePoolManager = require('../utils/pagePoolManager');

async function performScraping(url,scrollDown,hasAttribute,actions,targetInfos,unittype,servicename,servicever) {

    const xpath = targetInfos[0].xpath;
    
    // Placeholder: Imagine this function scrapes data from the provided URL

    // console.log(`Scraping data from ${url}...`);
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
        data = await page.evaluate(el => el.outerHTML, elementHandle);
        await elementHandle.dispose();
        
        // console.log("Scraping finished....")
        // console.log("scraping finished")
        // Remember to release the page back to the pool once you're done
        pagePoolManager.releasePage(page);




        // Return scraped data
        // await new Promise(resolve => setTimeout(resolve, 5000));
        return { url, data };
    } catch (error) {
        // console.log(`Error scraping ${url}:`, error);
        
        // In case of an error, make sure to release the page back to the pool
        pagePoolManager.releasePage(page);
        // await new Promise(resolve => setTimeout(resolve, 5000));
        return { error: "Error during scraping process." };
    }



    
   

    // Xpath 내부에있는,
    // Xpath 사용시, 확인후 로직 처리 필요, page닫는거 중요
    //const elementHandle = await page.waitForSelector(`::-p-xpath(${xpath})`);
    //pure inner HTML 전부 받을 시
    // if (elementHandle) {
    //   // Adjusted to fetch outerHTML
    //   data = await page.evaluate(el => el.outerHTML, elementHandle);
    //   // Dispose of the handle after use
      
    //   await elementHandle.dispose();
    // }


    // Tesx 만 받을 시
    //   data = await page.evaluate(el => el.textContent, elementHandle);
    //   // Dispose of the handle after use
    //   await elementHandle.dispose();
    
    
    // // await page.close();
    // // Return scraped data as an example
    // return {
    //   url,
    //   data: data,
    // };
  }
  
  module.exports = {
    performScraping,
  };