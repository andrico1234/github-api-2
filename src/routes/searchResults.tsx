import { Form, Link, LoaderFunction, useLoaderData } from "react-router-dom";
import fetchSearchResults from "../api/fetchSearchResults";
import type { SearchResults as ISearchResults } from "../types/searchResults";

interface LoaderRes {
  users: ISearchResults["items"];
  total: number;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const page = Number(url.searchParams.get("page")) ?? 1;

  const searchResults = await fetchSearchResults({ q, page });

  return {
    users: searchResults.items,
    total: searchResults.total_count,
  };
};

export function SearchResults() {
  const { users, total } = useLoaderData() as LoaderRes;

  return (
    <main className="searchResults">
      <div>
        <Link to="/">
          <h1>GitHub User Search</h1>
        </Link>
        <Form method="get" action="/searchResults" role="search">
          <input
            id="q"
            aria-label="Search users"
            placeholder="Search"
            type="search"
            name="q"
          />
          <button type="submit">Search</button>
        </Form>
      </div>
      <div>
        <ul>
          {users.map((user) => {
            return <li key={user.id}>{user.login}</li>;
          })}
        </ul>

        <div id="detail">
          <p>Total: {total}</p>
          <button>Prev</button>
          <button>Next</button>
        </div>
      </div>
    </main>
  );
}
