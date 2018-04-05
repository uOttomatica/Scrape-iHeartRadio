// Scrape iHeart90's Website for songs played
const puppeteer = require('puppeteer');
const sqlite3 = require('sqlite3').verbose();

// Set Defaults in case arguments aren't supplied
//    url         == iHeartRadio Station link
//    database    == name of database in same folder as scrape_iHeartRadio.js script
//    scrapeDelay == time to wait before reloading url to capture recently played songs
var url = "https://www.iheart.com/live/smells-like-the-90s-6437/";
var database ="iHeartRadio.db";
var scrapeDelay = 5 * 60 * 1000; // 5 Minutes * 60 sec * 1000 msec

// Get url from arguments
if (process.argv.length < 3){
    console.log("No url");
}else{
    url = process.argv[2];
}

// Get database from arguments
if (process.argv.length < 4){
    console.log("No database");
}else{
    database = process.argv[3];
}

// Get scrapeDelay from arguments (in minutes)
if (process.argv.length < 5){
  console.log("No scrapeDelay");
}else{
  scrapeDelay = process.argv[4] * 60 * 1000;
}

console.log('   url:         ' + url);
console.log('   database:    ' + database);
console.log('   scrapeDelay: ' + (scrapeDelay/60/1000) + ' (minutes)');

var artists = [];
var songs = [];
var links = [];
var DateCrawled = new String;
var lastArtists = ["","",""];
var lastSongs = ["","",""];
var LoopDone = false;

async function scrape_iHeartRadio(url) {
  LoopDone = false;
    const browser = await puppeteer.launch({
      // headless: false LAUNCHES BROWSER
      headless: true
    });
    const page = await browser.newPage();
    await page.goto(url, {
      timeout: 0
    });

    // Most of the code here based off of link below:
    // https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e
    // Open https://www.iheart.com/live/smells-like-the-90s-6437/ in your browser. 
    // Right click on a "Recently Played" artist and select Inspect. 
    // From developers tool, right click on the highlighted code and select Copy then Copy selector.
    // CREATE SELECTOR AS SHOWN BELOW
  
    // THIS SELECTOR GETS ARTIST/SONG LINK
    const ARTIST_SONG_LINK_1 = '#ad-under > section.section-block.recently-played > ul > li:nth-child(1) > div.text.has-dropdown > p.title > a';
    const ARTIST_SONG_LINK_2 = '#ad-under > section.section-block.recently-played > ul > li:nth-child(2) > div.text.has-dropdown > p.title > a';
    const ARTIST_SONG_LINK_3 = '#ad-under > section.section-block.recently-played > ul > li:nth-child(3) > div.text.has-dropdown > p.title > a';
  
    const SONG_SELECTOR_1 = '#ad-under > section.section-block.recently-played > ul > li:nth-child(1) > div.text.has-dropdown > p.title > a';
    const SONG_SELECTOR_2 = '#ad-under > section.section-block.recently-played > ul > li:nth-child(2) > div.text.has-dropdown > p.title > a';
    const SONG_SELECTOR_3 = '#ad-under > section.section-block.recently-played > ul > li:nth-child(3) > div.text.has-dropdown > p.title > a';
  
    // THIS SELECTOR GETS THE ARTIST NAME
    const ARTIST_SELECTOR_1 = '#ad-under > section.section-block.recently-played > ul > li:nth-child(1) > div.text.has-dropdown > p.description.type-secondary > a'
    const ARTIST_SELECTOR_2 = '#ad-under > section.section-block.recently-played > ul > li:nth-child(2) > div.text.has-dropdown > p.description.type-secondary > a'
    const ARTIST_SELECTOR_3 = '#ad-under > section.section-block.recently-played > ul > li:nth-child(3) > div.text.has-dropdown > p.description.type-secondary > a'
  
    let artistSongLinkSelector1 = ARTIST_SONG_LINK_1;
    let artistSongLinkSelector2 = ARTIST_SONG_LINK_2;
    let artistSongLinkSelector3 = ARTIST_SONG_LINK_3;
  
    let songSelector1 = SONG_SELECTOR_1;
    let songSelector2 = SONG_SELECTOR_2;
    let songSelector3 = SONG_SELECTOR_3;
  
    let artistSelector1 = ARTIST_SELECTOR_1;
    let artistSelector2 = ARTIST_SELECTOR_2;
    let artistSelector3 = ARTIST_SELECTOR_3;
  
    // THESE GRAB THE LINK, I.E. THE getAttribute('href')
    let artistSongLink1 = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('href').replace('/', '');
    }, artistSongLinkSelector1);
  
    let artistSongLink2 = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('href').replace('/', '');
    }, artistSongLinkSelector2);
  
    let artistSongLink3 = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('href').replace('/', '');
    }, artistSongLinkSelector3);
  
    // THESE GRAB THE SONG TITLE, I.E. THE getAttribute('title')
    let song1 = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('title');
    }, songSelector1);
  
    let song2 = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('title');
    }, songSelector2);
  
    let song3 = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('title');
    }, songSelector3);
  
    // THESE GRAB THE ARTIST, I.E. THE getAttribute('title')
    let artist1 = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('title');
    }, artistSelector1);
  
    let artist2 = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('title');
    }, artistSelector2);
  
    let artist3 = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('title');
    }, artistSelector3);
  
    artists = [artist1, artist2, artist3];
    songs = [song1, song2, song3];
    links = [artistSongLink1, artistSongLink2, artistSongLink3];
    DateCrawled = String(Date());
    newSongs = findNewSongs(artists,songs,lastArtists,lastSongs);
    lastArtists = artists;
    lastSongs = songs;

    console.log(artists);
    console.log(songs);

    insertIntoDatabase(newSongs);

    browser.close();
    LoopDone = true;
  }

  // Run once immediately before running at (scrapeDelay) intervals
  console.log(String(Date()));
  scrape_iHeartRadio(url)

  // Run at (scrapeDelay) intervals
  setInterval(function() {
    console.log(String(Date()));
    scrape_iHeartRadio(url)
},scrapeDelay);

function findNewSongs(artists,songs,lastArtists,lastSongs){
  let index = 0;
  let lastIndex = 0;  
  let newSong = [1,1,1];
    lastArtists.forEach(function(lastArtist){
        //newSong = [1,1,1];
        index = 0;
        artists.forEach(function(artist){        
            if(lastArtist === artist){ 
                if(lastSongs[lastIndex] === songs[index]){
                    // console.log("Artist and Song Match at lastSongs lastIndex: "  + lastIndex  + " and songs index: " + index)
                    // console.log(" " + lastArtists[lastIndex] + "," + lastSongs[lastIndex])
                    // console.log(" " + artists[index] + "," + songs[index])
                    newSong[index] = 0;
                }
            }
            index++;
        });
        lastIndex++;
    });
    return newSong
}

function insertIntoDatabase(newSongs){  
  let i=0;
  let myRow = [];
  // open the database
  let db = new sqlite3.Database(database, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    else {
    console.log('Connected to the ' + database + ' database.');
    }
  });
  newSongs.forEach(function(newSong){
      if(newSong){
          // console.log("New song, inseert into database")
          myRow = [url,artists[i], songs[i], links[i], DateCrawled];
          myRow = myRow.join('","');            
          sql = 'INSERT INTO Songs(url,Artist,Song,Link,DateCrawled) VALUES("' + myRow + '")';
        
          db.run(sql, function (err) {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);
          });

          db.serialize(() => {
            db.each(`SELECT rowid, Artist, Song, Link, DateCrawled FROM Songs`, (err, row) => {
              if (err) {
                console.error(err.message);
              }
              else {
                console.log(row.rowid + "\t" + row.Artist + "\t" + row.Song + "\t" + row.Link + "\t" + row.DateCrawled);
              }
            });
          });
      }else{
          console.log("Duplicate, ignore")
      }
      i++;
  });
  
          // close the database connection
          db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
          });
}