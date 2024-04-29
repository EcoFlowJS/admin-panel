import { useEffect, useState } from "react";
import { List } from "rsuite";
import fetchInstalledPackagesDescription from "../../../service/module/fetchInstalledPackagesDescription.service";

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

  useEffect(() => {
    setInstalledPackageLoading(true);
    const promise: Promise<any>[] = [];
    packages.forEach((ecoPackage) => {
      promise.push(fetchInstalledPackagesDescription(ecoPackage));
    });

    Promise.all(promise).then((response) => {
      setInstalledPackageLoading(false);
      console.log(response);
    }, console.error);
  }, [packages]);

  return (
    <>
      {isloading || isInstalledPackageLoading ? (
        <>isloading</>
      ) : (
        <List bordered>
          {packages.map((ecoPackage, key) => (
            <List.Item key={key}>{ecoPackage}</List.Item>
          ))}
        </List>
      )}
    </>
  );
}
