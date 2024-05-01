import { IconWrapper } from "@ecoflow/components-lib";
import { useState, KeyboardEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { Button, Input, InputGroup, Panel, Stack } from "rsuite";

interface SearchPackagesProps {
  onSearch?: (value: string) => void;
  loading?: boolean;
}

export default function SearchPackages({
  loading = false,
  onSearch = () => {},
}: SearchPackagesProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchPackage = () => onSearch(searchValue);

  const inputKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearchPackage();
  };

  return (
    <Panel bodyFill>
      <Stack spacing={10}>
        <InputGroup inside style={{ minWidth: 450 }} disabled={loading}>
          <InputGroup.Addon>Search : </InputGroup.Addon>
          <Input
            placeholder="Package name"
            onChange={setSearchValue}
            value={searchValue}
            onKeyUp={inputKeyUpHandler}
          />
        </InputGroup>
        <Button
          appearance="default"
          loading={loading}
          disabled={loading}
          style={{ minWidth: 100 }}
          endIcon={<IconWrapper icon={BiSearch} />}
          onClick={handleSearchPackage}
        >
          Search
        </Button>
      </Stack>
    </Panel>
  );
}
