import { SearchResults, UserItem } from "../types/searchResults";

interface Params {
  page?: number;
  perPage?: number;
  q: string;
}

async function getUsers(
  searchParams: Record<string, string>
): Promise<SearchResults> {
  const queryString = new URLSearchParams(searchParams).toString();

  const response = await fetch(
    `https://api.github.com/search/users?${queryString}`,
    {
      headers: {
        accept: "application/vnd.github+json",
      },
    }
  );

  return await response.json();
}

async function getUser(url: string): Promise<UserItem> {
  const response = await fetch(url, {
    headers: {
      accept: "application/vnd.github+json",
    },
  });

  return await response.json();
}

async function fetchSearchResults(params: Params): Promise<SearchResults> {
  const { page = 1, perPage = 20, q } = params;

  const searchParams = {
    page: String(page),
    per_page: String(perPage),
    q,
  };

  const userList = await getUsers(searchParams);
  const users: UserItem[] = [];

  for await (const user of userList.items) {
    const { id, url } = user;

    const currentUser = userList.items.find((x) => x.id === id);

    if (!currentUser) continue;

    const userDetails = await getUser(url);

    users.push(userDetails);
  }

  return {
    items: users,
    total_count: userList.total_count,
  };
}

export default fetchSearchResults;
