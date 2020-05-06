const Differencify = require("differencify");
const differencify = new Differencify({ mismatchThreshold: 0 });
let urlToTest = "http://127.0.0.1:8080/";

describe("Zadanie nr. 2", () => {
  const timeout = 30000;
  let page;

  beforeAll(async () => {
    await differencify.launchBrowser({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const target = differencify.init({ chain: false });
    page = await target.newPage();
    await page.goto(urlToTest);
    await page.waitFor(1000);
  }, timeout);
  afterAll(async () => {
    await differencify.cleanup();
  });

  it("Dodano div o szerokości 33%", async () => {
    await page.setViewport({width: 1000, height: 1200});
    const div = await page.$eval("div", elem => {
      return getComputedStyle(elem).width === "330px";
    });
    expect(div).toBe(true);
  }, timeout);

  it("Ustawiono wysokość diva na równą szerokości (%)", async () => {
    const div = await page.$eval("div", elem => {
      return getComputedStyle(elem).width === getComputedStyle(elem).paddingBottom;
    });
    expect(div).toBe(true);
  }, timeout);
});
