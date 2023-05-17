import nameToImdb from "name-to-imdb";

function convertTitle(input: string): { name: string, year: number } {
  const regex = /^(.*?) \((\d+)\)$/;
  const matches = input.match(regex);

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid input format');
  }

  const name = matches[1];
  const year = parseInt(matches[2]);

  return { name, year };
}

async function searchIMDb(title: string) {
  const titleObject = convertTitle(title);

  console.log(nameToImdb(titleObject))
}

export default searchIMDb;
