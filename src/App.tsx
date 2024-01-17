import { useAtom } from "jotai";
import { Suspense, useLayoutEffect } from "react";
import { CustomProvider } from "rsuite";
import Loading from "./components/Loading/Loading.component";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.componennt";
import themeMode from "./store/theme.mode";
import Routes from "./routes/Routes";

export default function App() {
  const [darkMode] = useAtom(themeMode);
  useLayoutEffect(() => {
    document.title = "Loading...";
  }, []);
  return (
    <CustomProvider theme={darkMode ? "dark" : "light"}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes />
        </ErrorBoundary>
      </Suspense>
    </CustomProvider>
  );
}
