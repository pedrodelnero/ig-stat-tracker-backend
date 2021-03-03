import puppeteer from 'puppeteer';

export const getIgStats = async (req, res) => {
  const { selectedHandles } = req.body;

  console.log('START', selectedHandles);

  const browser = await puppeteer.launch({ headless: false });
  try {
    if (selectedHandles.length < 1) throw new Error('No handles selected');

    const page = await browser.newPage();
    // await page.goto('https://www.instagram.com/accounts/login/');
    // await page.waitForSelector('input[name="username"]');
    // await page.type('input[name="username"]', 'pdn2006');
    // await page.type('input[name="password"]', 'miami1234');
    // await page.click('button[type="submit"]');
    // await page.waitForSelector('.HoLwm');

    const results = [];

    for (const item of selectedHandles) {
      if (item.posts.length === 0 || item.posts === 0)
        throw new Error('A user or users have 0 posts selected');

      await page.goto(`https://www.instagram.com/${item.handle}/`);

      let userData = await page.evaluate(
        () => window._sharedData.entry_data.ProfilePage[0].graphql.user
      );

      let likes = 0;

      for (let i = 0; i <= item.posts - 1; i++) {
        likes +=
          userData.edge_owner_to_timeline_media.edges[i].node.edge_liked_by
            .count;
      }
      likes /= item.posts;

      let engRate = (likes / userData.edge_followed_by.count) * 100;

      results.push({
        // id: item.id,
        handle: userData.username,
        followers: userData.edge_followed_by.count,
        posts: item.posts,
        likes: likes,
        engRate: engRate,
      });
    }
    res.send(results);
  } catch (err) {
    console.error(`Err 1: ${err.message}`);
    res.status(404).json({ message: err.message });
  }
  browser.close();
};

/*

    await page.goto("https://www.instagram.com/accounts/login/");
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', "pdn2006");
  await page.type('input[name="password"]', "miami1234");
  await page.click('button[type="submit"]');
  await page.waitForSelector(".HoLwm");
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
