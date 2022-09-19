import { Form } from "react-router-dom";

export function Root() {
  return (
    <main>
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
    </main>
  );
}

// clicking the link redirects to the next page
