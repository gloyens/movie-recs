import { load } from "cheerio";

async function searchIMDb(title: string) {
  try {
    const encodedTitle = encodeURIComponent(title);
    const url = `https://www.imdb.com/find/?q=${encodedTitle}`;

    const body = await fetch(url).then(res => res.text());
    const $ = load(body);

    const movieLink = $("#main > .article >  .findSection > .findList > tbody").find("td").find("a").attr('href');

    if (!movieLink) throw new Error(`No IMDb link found for ${title}`);

    return movieLink;
    // if (firstLinkElement) {
    //   const firstLink = firstLinkElement.attribs.href;
    //   // const imdbLink = `https://www.imdb.com${firstLink}`;
    //   // return { link: imdbLink };
    //   return `https://www.imdb.com${firstLink}`;
    // } else {
    //   throw new Error(`No IMDb link found for ${title}`);
    // }
  } catch (error) {
    console.error("Error occurred while searching IMDb:", error);
    throw new Error("Internal server error");
  }
}

export default searchIMDb;
