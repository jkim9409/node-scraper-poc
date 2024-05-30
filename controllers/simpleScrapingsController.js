const { performSimpleScraping } = require('../services/simpleScrapingService');

// Example function for handling a GET request to list scraping results
const getSimpleScrapings = async (req, res) => {
    // Log the request; for demonstration purposes
    // logger.info("Fetching scrapings...");

    console.log('1')
    // Extract the URL to scrape from query parameters
    const {url,xpath} = req.body;
 
    // console.log("newRequest")
    if (!url) {
        return res.status(400).send({ error: 'URL parameter is required.' });
    }
    if (!xpath) {
        return res.status(400).send({ error: 'xpath parameter is required.' });
    }

    try {
        // Use the scraping service to perform the scraping
        console.log(url)
        console.log(xpath)

        const data = await performSimpleScraping(url,xpath);
        // console.log(`[${req.id}] Scraping completed for URL: ${url}`);

        // console.log("Response")

        // Respond with the scraped data
        res.status(200).send(data);
    } catch (error) {
        // console.log(`[${req.id}] Error during scraping: ${error.message}`);
        res.status(500).send({ error: 'Error during scraping' });
    }

};

// More functions could be added here for handling other requests (POST, DELETE, etc.)

module.exports = {
    getSimpleScrapings,
    // Export other handlers as needed
};