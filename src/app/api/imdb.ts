async function searchIMDb(title: string): Promise<string | undefined> {
  const url = `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(
    title + " imdb"
  )}`;

  console.log(url);
  return url;
}

export default searchIMDb;
