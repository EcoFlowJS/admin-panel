import { IconWrapper } from "@ecoflow/components-lib";
import { useEffect, useState, KeyboardEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { Button, Input, InputGroup, Panel, Stack } from "rsuite";
import searchModule from "../../../service/module/searchModule.service";
import { ApiResponse } from "@ecoflow/types";
import { useSetAtom } from "jotai";
import { errorNotification } from "../../../store/notification.store";

interface SearchPackagesProps {
  onSearch?: (value: any) => void;
  loading?: (isLoading: boolean) => void;
}

export default function SearchPackages({
  loading = () => {},
  onSearch = () => {},
}: SearchPackagesProps) {
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //Notifications
  const setErrorNotification = useSetAtom(errorNotification);

  const handleSearchPackage = () => {
    setLoading(true);
    searchModule(searchValue).then(
      (response) => {
        setLoading(false);
        if (response.success) onSearch(response.payload);
      },
      (reject: ApiResponse) => {
        setLoading(false);
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

  const inputKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearchPackage();
  };

  useEffect(() => loading(isLoading), [isLoading]);

  return (
    <Panel bodyFill>
      <Stack spacing={10}>
        <InputGroup inside style={{ minWidth: 450 }} disabled={isLoading}>
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
          disabled={isLoading}
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
