import { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({ error }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <>
      {error.error ? (
        <>{error.code === 504 ? <>504</> : <></>}</>
      ) : (
        <div role="alert">
          <p>Something went wrong:</p>
          <pre style={{ color: "red" }}>{error.toString()}</pre>
        </div>
      )}
    </>
  );
}
