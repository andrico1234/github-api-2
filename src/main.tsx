import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/root";
import "./index.css";
import { ErrorPage } from "./components/errorPage";
import { SearchResults, loader as searchLoader } from "./routes/searchResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/searchResults",
    element: <SearchResults />,
    loader: searchLoader,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// ● I can search for users and see a paginated list of results
// ● I can navigate through the next and previous pages of the paginated results
// ● I see the total count of search results
// ● I see notable information for each search result, such as the description, star/follower
// count, profile pictures, etc.
// ● I can select a search result and be taken to the applicable page on github.com API
// The app should utilize GitHub's public API; either the v3 REST API or the v4 GraphQL
// version. Examples of the API call you'll likely need to make:
// Search
// Documentation: https://developer.github.com/v3/search/
// GET https://api.github.com/search/users?q=example
