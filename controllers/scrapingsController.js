const { performScraping } = require('../services/scrapingService');

// Example function for handling a GET request to list scraping results
const getScrapings = async (req, res) => {
    // Log the request; for demonstration purposes
    // logger.info("Fetching scrapings...");

    // Extract the URL to scrape from query parameters
    const { url } = req.query;

    


    if (!url) {
        return res.status(400).send({ error: 'URL parameter is required.' });
    }

    try {
        // Use the scraping service to perform the scraping
        const data = await performScraping(url);
        // console.log(`[${req.id}] Scraping completed for URL: ${url}`);
        
        // Respond with the scraped data
        res.status(200).send(data);
    } catch (error) {
        // console.log(`[${req.id}] Error during scraping: ${error.message}`);
        res.status(500).send({ error: 'Error during scraping' });
    }

};

// More functions could be added here for handling other requests (POST, DELETE, etc.)

module.exports = {
    getScrapings,
    // Export other handlers as needed
};