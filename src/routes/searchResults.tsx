import {
  Form,
  Link,
  LoaderFunction,
  URLSearchParamsInit,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import fetchSearchResults from "../api/fetchSearchResults";
import { Results } from "../components/results";
import type { SearchResults as ISearchResults } from "../types/searchResults";

function serialiseFormQuery(params: URLSearchParams) {
  const entries = [...params];

  const obj: Record<string, string | number> = {};

  entries.map(([key, value]) => {
    obj[key] = value;
  });

  return obj;
}

interface LoaderRes {
  users: ISearchResults["items"];
  total: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 4;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const page = url.searchParams.get("page") || DEFAULT_PAGE;
  const perPage = url.searchParams.get("perPage") ?? DEFAULT_PER_PAGE;

  const searchResults = await fetchSearchResults({
    q,
    page: Number(page),
    perPage: Number(perPage),
  });

  return {
    users: searchResults.items,
    total: searchResults.total_count,
  };
};

export function SearchResults() {
  const { users, total } = useLoaderData() as LoaderRes;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const q = searchParams.get("q");
  const page = Number(searchParams.get("page")) || DEFAULT_PAGE;
  const perPage = Number(searchParams.get("perPage")) || DEFAULT_PER_PAGE;

  const isLastPage = perPage * page >= total;
  const isFirstPage = page <= 1;

  const requestPrevPage = () => {
    const params = serialiseFormQuery(searchParams);

    const newParams: URLSearchParamsInit = {
      ...params,
      page: String(page - 1),
    };
    setSearchParams(newParams);
  };

  const requestNextPage = () => {
    const params = serialiseFormQuery(searchParams);

    const newParams: URLSearchParamsInit = {
      ...params,
      page: String(page + 1),
    };
    setSearchParams(newParams);
  };

  // Display error on rate limit

  return (
    <main className="searchResults switcher">
      <div className="searchSection">
        <Link to="/">
          <h1>GitHub User Search</h1>
        </Link>
        <Form
          method="get"
          action="/searchResults"
          role="search"
          className="searchForm"
        >
          <input
            id="q"
            aria-label="Search users"
            placeholder="e.g. Sarah Drasner"
            type="search"
            required
            defaultValue={q ?? ""}
            name="q"
          />
          <button type="submit">Search</button>
        </Form>
      </div>
      <div>
        <Results users={users} />

        <div className="actions">
          <button
            disabled={isFirstPage || isLoading}
            onClick={requestPrevPage}
            name="prev"
          >
            Prev
          </button>
          <p>Total: {total}</p>
          <button
            disabled={isLastPage || isLoading}
            onClick={requestNextPage}
            name="next"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
