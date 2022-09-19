import { SearchResults } from "../types/searchResults";

interface Params {
  page?: number;
  perPage?: number;
  q: string;
}

async function fetchSearchResults(params: Params): Promise<SearchResults> {
  const { page = 1, perPage = 20, q } = params;

  const searchParams = {
    page: String(page),
    per_page: String(perPage),
    q,
  };

  const queryString = new URLSearchParams(searchParams).toString();

  console.log(queryString);

  const response = await fetch(
    `https://api.github.com/search/users?${queryString}`
  );

  return response.json();
}

export default fetchSearchResults;
