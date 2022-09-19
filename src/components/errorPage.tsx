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
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
      </p>
    </div>
  );
}
