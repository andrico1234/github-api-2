import { Link, LoaderFunction, useLoaderData } from "react-router-dom";
import fetchSearchResults from "../api/fetchSearchResults";
import type { SearchResults as ISearchResults } from "../types/searchResults";

interface LoaderRes {
  users: ISearchResults["items"];
  total: number;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";

  const searchResults = await fetchSearchResults({ q });

  return {
    users: searchResults.items,
    total: searchResults.total_count,
  };
};

export function SearchResults() {
  const { users, total } = useLoaderData() as LoaderRes;

  return (
    <>
      <Link to="/">Back</Link>
      <h1>GitHub Stuff</h1>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.login}</li>;
        })}
      </ul>

      <div id="detail">
        <p>Total: {total}</p>
      </div>
    </>
  );
}
