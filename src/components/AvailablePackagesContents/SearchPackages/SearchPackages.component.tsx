import { IconWrapper, Uploader } from "@ecoflow/components-lib";
import { useState, KeyboardEvent, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { RiFolderZipFill } from "react-icons/ri";
import { Button, Input, InputGroup, Panel, Stack } from "rsuite";
import importEcoPackages from "../../../service/module/importEcoPackages.service";

interface SearchPackagesProps {
  loading?: boolean;
  disabled?: boolean;
  onSearch?: (value: string) => void;
}

export default function SearchPackages({
  loading = false,
  disabled = false,
  onSearch = () => {},
}: SearchPackagesProps) {
  const [searchValue, setSearchValue] = useState("");
  const [file, setFile] = useState<FileList | null>(null);

  const handleSearchPackage = () => onSearch(searchValue);

  const inputKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearchPackage();
  };

  useEffect(() => {
    if (file !== null) {
      setFile(null);
      importEcoPackages(file).then(console.log, console.error);
    }
  }, [file]);

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
          disabled={disabled}
          style={{ minWidth: 100 }}
          endIcon={<IconWrapper icon={BiSearch} />}
          onClick={handleSearchPackage}
        >
          Search
        </Button>
        <Uploader
          multiple
          value={file}
          hideTextArea
          onChange={setFile}
          buttonText="Upload"
          accept="application/zip"
          icon={<IconWrapper icon={RiFolderZipFill} />}
        />
      </Stack>
    </Panel>
  );
}
