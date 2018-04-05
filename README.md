# Scrape-iHeartRadio
Save the songs played on an iHeartRadio station to a database
## Required Software
* Node.js https://nodejs.org/en/
* Google Chrome Puppeteer https://github.com/GoogleChrome/puppeteer
* Sqlite https://www.sqlite.org/index.html
## Use
Once you have dowloaded the repository and installed the required software, follow these steps to scrape the songs played from your desired iHeartRadio station
  ### Win7
  Open a command window, navigate to your repository location and type the following:

  `node scrape_iHeartRadio.js url database scrapeDelay`
  Where:
  * scrape_iHeartRadio.js == The script!
  * url                   == iHeartRadio station html link string
  * database              == database file name string
  * scrapeDelay           == Load Frequency of iHeartRadio station in minutes

  Example:

  `node scrape_iHeartRadio.js https://www.iheart.com/live/smells-like-the-90s-6437/ iHeartRadioPlaylist.db 5`
  
  #### OR
  
  Create a new or edit the existing batch file, [scrape_iHeartRadio.bat](scrape_iHeartRadio.bat), navigate to that folder in Windows Explorer and double-click or execute the batch file
