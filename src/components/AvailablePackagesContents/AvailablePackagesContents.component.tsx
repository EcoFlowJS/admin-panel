import { Divider, FlexboxGrid } from "rsuite";
import SearchPackages from "./SearchPackages/SearchPackages.component";
import { useState } from "react";

export default function AvailablePackagesContents() {
  const [isLoading, setLoading] = useState(false);
  isLoading;

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item>
        <SearchPackages loading={setLoading} onSearch={console.log} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}>{<Divider />}</FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}>fdg</FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
