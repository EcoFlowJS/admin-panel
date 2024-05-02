import { Divider, FlexboxGrid } from "rsuite";
import FilterPackages from "./FIlterPackages/FilterPackages.component";
import { useEffect, useState } from "react";
import fetchInstalledModule from "../../service/module/fetchInstalledModule.service";
import { ApiResponse } from "@ecoflow/types";
import InstalledPakageList from "./InstalledPakageList/InstalledPakageList.component";

export default function InstalledPackagesContent() {
  const [isLoading, setLoading] = useState(true);
  const [allModules, setAllModules] = useState<string[]>([]);
  const [filteredModules, setFilteredModules] = useState<string[]>([]);

  useEffect(() => {
    fetchInstalledModule().then(
      (response) => {
        setLoading(false);
        if (response.success) {
          setAllModules(response.payload);
          setFilteredModules(response.payload);
          return;
        }
        console.error(response.payload);
      },
      (reject: ApiResponse) => {
        setLoading(false);
        if (reject.error) console.error(reject.payload);
      }
    );
  }, []);

  return (
    <>
      <FlexboxGrid justify="end">
        <FlexboxGrid.Item>
          <FilterPackages
            isLoading={isLoading}
            allPackages={allModules}
            onFiltered={setFilteredModules}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>{<Divider />}</FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>
          <InstalledPakageList
            isloading={isLoading}
            packages={filteredModules}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
