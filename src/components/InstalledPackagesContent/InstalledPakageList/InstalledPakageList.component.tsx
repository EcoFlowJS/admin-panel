import { useEffect, useState } from "react";
import { List, Loader } from "rsuite";
import fetchInstalledPackagesDescription from "../../../service/module/fetchInstalledPackagesDescription.service";
import { ApiResponse, InstalledPackagesDescription } from "@ecoflow/types";
import ListItem from "./ListItem/ListItem.component";
import defaultEcoPackageList from "../../../defaults/defaultEcoPackageList";

interface InstalledPakageListProps {
  isloading?: boolean;
  packages?: string[];
}

export default function InstalledPakageList({
  isloading = false,
  packages = [],
}: InstalledPakageListProps) {
  const [isInstalledPackageLoading, setInstalledPackageLoading] =
    useState(false);
  const [installedPackages, setInstalledPackages] = useState<
    InstalledPackagesDescription[]
  >([]);

  useEffect(() => {
    setInstalledPackageLoading(true);
    const promise: Promise<any>[] = [];
    packages.forEach((ecoPackage) =>
      promise.push(fetchInstalledPackagesDescription(ecoPackage))
    );

    Promise.all(promise).then((response) => {
      setInstalledPackageLoading(false);
      setInstalledPackages(
        response.map((ecoPackages: ApiResponse) => {
          if (ecoPackages.success) return ecoPackages.payload;
        })
      );
    }, console.error);
  }, [packages]);

  return (
    <>
      {isloading || isInstalledPackageLoading ? (
        <div style={{ position: "relative" }}>
          {packages.length > 0 ? (
            <>
              <List>
                {packages.map((ecoPackage, key) => (
                  <ListItem
                    key={key}
                    isLoading
                    ecoPackage={{
                      ...defaultEcoPackageList,
                      name: ecoPackage,
                    }}
                  />
                ))}
              </List>
              <Loader backdrop content="loading..." />
            </>
          ) : (
            <>
              <Loader content="loading..." center />
            </>
          )}
        </div>
      ) : (
        <List>
          {installedPackages.map((ecoPackage, key) => (
            <ListItem key={key} index={key + 1} ecoPackage={ecoPackage} />
          ))}
        </List>
      )}
    </>
  );
}
