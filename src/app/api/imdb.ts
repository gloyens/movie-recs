import { load } from "cheerio";

async function searchIMDb(title: string): Promise<string | undefined> {
  const url = `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(
    title + " imdb"
  )}`;
  
  return url;
}

export default searchIMDb;
