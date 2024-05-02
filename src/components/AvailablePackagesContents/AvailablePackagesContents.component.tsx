import { Divider, FlexboxGrid, List, Panel, Stack, Text } from "rsuite";
import SearchPackages from "./SearchPackages/SearchPackages.component";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { errorNotification } from "../../store/notification.store";
import searchModule from "../../service/module/searchModule.service";
import { ApiResponse, ModuleSearchResults } from "@ecoflow/types";
import fetchAvailableModuleCounts from "../../service/module/fetchModuleCounts.service";
import PackageList from "./PackageList/PackageList.component";
import { LoadingDotInfinity } from "@ecoflow/components-lib";
import isEmpty from "lodash/isEmpty";

export default function AvailablePackagesContents() {
  const [isLoading, setLoading] = useState({
    initializing: true,
    searching: false,
  });
  const [availablePackagesCount, setAvailablePackageCount] = useState("");
  const [searchResult, setSearchResult] = useState<ModuleSearchResults>();

  //Notifications
  const setErrorNotification = useSetAtom(errorNotification);

  const handleSearchPackage = (packageName: string) => {
    if (isEmpty(packageName)) setSearchResult(undefined);
    setLoading((value) => ({ ...value, searching: true }));
    searchModule(packageName).then(
      (response) => {
        setLoading((value) => ({ ...value, searching: false }));
        if (response.success) setSearchResult(response.payload);
      },
      (reject: ApiResponse) => {
        setLoading((value) => ({ ...value, searching: false }));
        if (reject.error) {
          setErrorNotification({
            show: true,
            header: "Error fetching packages",
            message: "Error fetching packages from NPM Registry.",
          });
          console.error(reject.payload);
        }
      }
    );
  };

  useEffect(() => {
    fetchAvailableModuleCounts().then(
      (response: ApiResponse) => {
        setLoading((value) => ({ ...value, initializing: false }));
        if (response.success) setAvailablePackageCount(response.payload);
      },
      (reject: ApiResponse) => {
        setLoading((value) => ({ ...value, initializing: false }));
        if (reject.error) setAvailablePackageCount("N/A");
      }
    );
  }, []);

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item>
        <SearchPackages
          loading={isLoading.initializing || isLoading.searching}
          onSearch={handleSearchPackage}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}>{<Divider />}</FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <Panel bodyFill style={{ paddingBottom: 20 }}>
          {searchResult ? (
            <Text muted>
              Search Result: {searchResult.total}/{availablePackagesCount}
            </Text>
          ) : (
            <Text muted>Available Packages: {availablePackagesCount}</Text>
          )}
        </Panel>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}>
        {isLoading.initializing || isLoading.searching ? (
          <FlexboxGrid
            justify="center"
            align="middle"
            style={{
              backgroundColor: "var(--rs-list-bg)",
              height: 350,
              boxShadow: "0 0 0 1px var(--rs-list-border)",
              borderRadius: 6,
            }}
          >
            <FlexboxGrid.Item>
              <Stack spacing={10}>
                <LoadingDotInfinity />
                <Text muted>Loading...</Text>
              </Stack>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        ) : searchResult ? (
          searchResult.modules.length > 0 ? (
            <List bordered>
              {searchResult.modules.map((module, key) => (
                <PackageList key={key} module={module} />
              ))}
            </List>
          ) : (
            <FlexboxGrid
              justify="center"
              align="middle"
              style={{
                backgroundColor: "var(--rs-list-bg)",
                height: 350,
                boxShadow: "0 0 0 1px var(--rs-list-border)",
                borderRadius: 6,
              }}
            >
              <FlexboxGrid.Item>
                <Text muted>No Matches Found</Text>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          )
        ) : (
          <FlexboxGrid
            justify="center"
            align="middle"
            style={{
              backgroundColor: "var(--rs-list-bg)",
              height: 350,
              boxShadow: "0 0 0 1px var(--rs-list-border)",
              borderRadius: 6,
            }}
          >
            <FlexboxGrid.Item>
              <Text muted>{availablePackagesCount} Packages Available</Text>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        )}
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
