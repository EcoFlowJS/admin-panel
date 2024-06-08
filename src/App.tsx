import { useAtom } from "jotai";
import { useLayoutEffect } from "react";
import { CustomProvider, Loader } from "rsuite";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.componennt";
import themeMode from "./store/theme.mode";
import Routes from "./routes/Routes";
import { isRestartingServer, isClosedServer } from "./store/server.store";
import isServerOnline from "./service/server/isServerOnline.service";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const [darkMode] = useAtom(themeMode);
  const [restartingServer, setRestartingServer] = useAtom(isRestartingServer);
  const [closedServer, setClosedServer] = useAtom(isClosedServer);

  useLayoutEffect(() => {
    document.title = "Loading...";
    isServerOnline([setClosedServer, setRestartingServer, null]);
  }, []);

  return (
    <>
      {typeof closedServer === "boolean" && closedServer ? (
        <></>
      ) : (
        <CustomProvider theme={darkMode ? "dark" : "light"}>
          {typeof restartingServer === "boolean" && restartingServer ? (
            <Loader backdrop content="loading..." />
          ) : (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
            </ErrorBoundary>
          )}
        </CustomProvider>
      )}
    </>
  );
}
