import express from "express";
import puppeteer from "puppeteer";

const router = new express.Router();

router.post("/ig_proposal", async (req, res) => {
  console.log("START");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.goto("https://www.instagram.com/accounts/login/");
  // await page.waitForSelector('input[name="username"]');
  // await page.type('input[name="username"]', "pdn2006");
  // await page.type('input[name="password"]', "miami1234");
  // await page.click('button[type="submit"]');
  // await page.waitForSelector(".HoLwm");
  // await page.goto("https://www.instagram.com/delneromia/");
  await page.goto("https://www.instagram.com/theclaudiachronicles/");

  let sharedData = await page.evaluate(() => {
    return window._sharedData.entry_data.ProfilePage[0].graphql.user;
  });

  console.log(
    "shared",
    // sharedData
    // sharedData.edge_owner_to_timeline_media.edges[0]
    sharedData.edge_owner_to_timeline_media.edges[0].node.edge_liked_by,
    sharedData.edge_owner_to_timeline_media.edges[0].node.edge_media_to_comment
  );

  /*
    await page.waitForSelector(".wpO6b  ");
    await page.click(".wpO6b  ");
  
    let username = await page.evaluate(() => {
      console.log("1st time");
      const handle = document.querySelectorAll("header > section > div > h2")[0]
        .textContent;
  
      console.log("handle", handle);
      return handle;
    });
  
    console.log("2nd time");
    const example = await page.$$("article > div > div > div > div > a");
  
    await example[5].click();
  
    await page.waitForSelector(".EtaWk");
  
    let results = await page.evaluate(() => {
      let likes = [];
      let comments = [];
      likes.push(
        document.querySelectorAll(
          "body > div > div > div > article > div > section > div > div > a > span"
        )[0].textContent
      );
      const a = document.querySelectorAll(
        "body > div > div > div > article > div > div > ul > ul > div > li > div > div > div > span"
      );
  
      a.forEach((el) => comments.push(el.textContent));
  
      console.log(a);
      return { likes, comments };
      // await page.click('button[class="wpO6b"]');
    });
  
    // await page.waitForSelector("button[class='wpO6b']");
  
    console.log({
      username: username,
      likes: results.likes,
      commentsLength: results.comments.length,
      comments: results.comments,
    });
    */
});

export default router;
