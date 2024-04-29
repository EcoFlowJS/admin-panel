import { IconWrapper } from "@ecoflow/components-lib";
import { useState, KeyboardEvent } from "react";
import { BiFilter } from "react-icons/bi";
import { Button, Input, InputGroup, Panel, Stack } from "rsuite";

interface FilterPackagesProps {
  isLoading?: boolean;
  allPackages?: string[];
  onFiltered?: (value: string[]) => void;
}

export default function FilterPackages({
  isLoading = false,
  allPackages = [],
  onFiltered = () => {},
}: FilterPackagesProps) {
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = () =>
    onFiltered(allPackages.filter((value) => value.includes(filterValue)));

  const inputKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleFilter();
  };

  return (
    <Panel bodyFill>
      <Stack spacing={10}>
        <InputGroup inside style={{ minWidth: 450 }} disabled={isLoading}>
          <InputGroup.Addon>Filter : </InputGroup.Addon>
          <Input
            placeholder="Package name"
            onChange={setFilterValue}
            value={filterValue}
            onKeyUp={inputKeyUpHandler}
          />
        </InputGroup>
        <Button
          appearance="default"
          disabled={isLoading}
          style={{ minWidth: 100 }}
          endIcon={<IconWrapper icon={BiFilter} />}
          onClick={handleFilter}
        >
          Filter
        </Button>
      </Stack>
    </Panel>
  );
}
