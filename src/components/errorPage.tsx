import { useRouteError } from "react-router-dom";

interface ErrorResponse {
  data: unknown;
  status: number;
  statusText: string;
}

export function ErrorPage() {
  const error = useRouteError() as ErrorResponse;

  return (
    <div id="error-page">
      <h1>We couldn't load the page!</h1>
      <p>Sorry, we had trouble fetching a list of users. 😱</p>
      <p>
        <i>{error.statusText}</i>
      </p>
    </div>
  );
}
