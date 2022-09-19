import { SearchResults } from "../types/searchResults";

interface Params {
  page?: number;
  pageSize?: number;
  q: string;
}

async function fetchSearchResults(params: Params): Promise<SearchResults> {
  const { page = 0, pageSize = 10, q } = params;

  const response = await fetch(`https://api.github.com/search/users?q=${q}`);

  return response.json();
}

export default fetchSearchResults;
