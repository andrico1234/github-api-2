import { Form } from "react-router-dom";

export function Root() {
  return (
    <main className="home">
      <h1>GitHub User Search</h1>
      <Form method="get" action="/searchResults" role="search">
        <input
          id="q"
          aria-label="Search users"
          placeholder="Search"
          type="search"
          name="q"
        />
        <input hidden name="page" defaultValue="5" />
        <button type="submit">Search</button>
      </Form>
    </main>
  );
}

// clicking the link redirects to the next page
