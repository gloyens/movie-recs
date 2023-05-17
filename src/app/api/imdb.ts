import * as cheerio from "cheerio";

async function searchIMDb(title: string): Promise<string | undefined> {
  const url = `https://www.google.com/search?q=${encodeURIComponent(
    title + " imdb"
  )}`;
  const response = await fetch(url, { mode: "no-cors" });
  const html = await response.text();
  console.log(html);

  const $ = cheerio.load(html);
  console.log($);
  const firstResult = $("div.g").first().find("a").first().attr("href");
  return firstResult;
}

export default searchIMDb;
