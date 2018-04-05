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

### Note:
* The url, or iHeartRadio link has to be a station where there is a "Recently Played" section
* I haven't tested this script for running mulitple instances where the same database is used
* I generally use 5 minutes for my scrape delay.  You want to pick a scrapeDelay that won't miss any songs but you also don't want to be hammering the iHeartRadio website.  They might notice and start blocking.  Not to mention that the site takes a while to load and if your scrapeDelay is too short, you'll never finish before loading the site again.  Most songs are longer than 2 minutes, I don't thnk there is much risk in waiting 5 minutes between scrapes.
