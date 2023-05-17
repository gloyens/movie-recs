import { load } from "cheerio";

async function searchIMDb(title: string) {
  try {
    const encodedTitle = encodeURIComponent(title);
    const url = `https://www.imdb.com/find/?q=${encodedTitle}`;

    const response = await fetch(url, { mode: "no-cors" });
    const data = await response.text();
    const $ = load(data);

    const firstLinkElement = $("a.ipc-metadata-list-summary-item__t")[0];

    if (firstLinkElement) {
      const firstLink = firstLinkElement.attribs.href;
      // const imdbLink = `https://www.imdb.com${firstLink}`;
      // return { link: imdbLink };
      return `https://www.imdb.com${firstLink}`;
    } else {
      throw new Error(`No IMDb link found for ${title}`);
    }
  } catch (error) {
    console.error("Error occurred while searching IMDb:", error);
    throw new Error("Internal server error");
  }
}

export default searchIMDb;
