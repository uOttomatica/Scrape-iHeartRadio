# Scrape-iHeartRadio
Save the songs played on an iHeartRadio station to a database
## Required Software
* Node.js https://nodejs.org/en/
* Google Chrome Puppeteer https://github.com/GoogleChrome/puppeteer
* Sqlite https://www.sqlite.org/index.html
## Use
Once you have dowloaded the repository and installed the required software, follow these steps to scrape the songs played from your desired iHeartRadio station
  ### Win7
  Open a command window, navigate to your repository location and type the following
  `node scrape_iHeartRadio.js url db ScrapeDelay`
  Where:
  * url         == iHeartRadio station html link string
  * db          == database file name string
  * ScrapeDelay == Load Frequency of iHeartRadio station in minutes
  
  Example:
  `node scrape_iHeartRadio.js https://www.iheart.com/live/all-my-jams-4433/ iHeartRadioPlaylist.db 1`
