import { Form, useNavigation } from "react-router-dom";

export function Root() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <main className="home">
      <h1>GitHub User Search</h1>
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
          name="q"
          required
          disabled={isLoading}
        />
        <input hidden name="page" defaultValue="1" />
        <button disabled={isLoading} type="submit">
          Search
        </button>
      </Form>
    </main>
  );
}
