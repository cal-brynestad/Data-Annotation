const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const videoLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // link to video page

async function fillDataFromPage(page, newDesign) {
  const dataFromPage = await page.evaluate((newDesign) => {
    return {
      title: document.querySelector(`${newDesign ? "#title >" : "#info-contents"} h1`)?.textContent.trim(),
      name: document.querySelector(`${newDesign ? "#owner" : "ytd-video-owner-renderer"} #channel-name #text > a`)?.textContent.trim(),
    };
  }, newDesign);
  return dataFromPage;
}

async function getYoutubeVideoPageResults() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(60000);
  await page.goto(videoLink);

  await page.waitForSelector("#contents");

  const isDesign1 = await page.$("#title > h1");

  if (isDesign1) {
    await page.click("#description-inline-expander #expand");
  } else {
    await page.click("#meta #more");
  }

  const infoFromVideoPage = await fillDataFromPage(page, isDesign1);

  await browser.close();

  return infoFromVideoPage;
}

getYoutubeVideoPageResults().then((result) => console.dir(result, { depth: null }));