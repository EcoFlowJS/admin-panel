import { useAtom } from "jotai";
import { Suspense, useLayoutEffect, useState } from "react";
import { CustomProvider, Loader } from "rsuite";
import Loading from "./components/Loading/Loading.component";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.componennt";
import themeMode from "./store/theme.mode";
import Routes from "./routes/Routes";
import { isRestartingServer, isClosedServer } from "./store/server.store";
import isServerOnline from "./service/server/isServerOnline.service";

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
            <Suspense fallback={<Loading />}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Routes />
              </ErrorBoundary>
            </Suspense>
          )}
        </CustomProvider>
      )}
    </>
  );
}

/*
  const isServerOnline = (loaded = false) => {
    isBackedEndOnlineService()
      .then((val) => {
        console.log(val);

        if (val.success) setTimeout(() => setRestartingServer(false), 1000);
        if (val.error) {
          setRestartingServer(true);
          setTimeout(() => isServerOnline(true), 1000);
        }
      })
      .finally(() => (!loaded ? setLoaded(true) : null));
  };
  */
