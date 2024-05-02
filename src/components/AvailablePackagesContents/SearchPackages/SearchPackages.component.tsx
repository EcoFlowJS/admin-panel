import { IconWrapper, Uploader } from "@ecoflow/components-lib";
import { useState, KeyboardEvent, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { RiFolderZipFill } from "react-icons/ri";
import { Button, Input, InputGroup, Panel, Stack } from "rsuite";
import importEcoPackages from "../../../service/module/importEcoPackages.service";
import { ApiResponse } from "@ecoflow/types";
import { useSetAtom } from "jotai";
import {
  errorNotification,
  successNotification,
} from "../../../store/notification.store";

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
  const [isLocalPackageInstalling, setLocalPackageInsalling] = useState(false);

  //Notifications
  const setSuccessNotification = useSetAtom(successNotification);
  const setErrorNotifications = useSetAtom(errorNotification);

  const handleSearchPackage = () => onSearch(searchValue);

  const inputKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearchPackage();
  };

  useEffect(() => {
    if (file !== null) {
      setFile(null);
      setLocalPackageInsalling(true);
      importEcoPackages(file).then(
        ({ success }: ApiResponse) => {
          setLocalPackageInsalling(false);
          if (success)
            setSuccessNotification({
              show: true,
              header: "Installation success",
              message: "Successfully insalled local packages",
            });
        },
        ({ error, payload }: ApiResponse) => {
          setLocalPackageInsalling(false);
          if (error) {
            setErrorNotifications({
              show: true,
              header: "Installation Error",
              message: "Error installing local packages.",
            });
            console.error(payload);
          }
        }
      );
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
        {isLocalPackageInstalling ? (
          <Button startIcon={<IconWrapper icon={RiFolderZipFill} />} loading>
            Upload
          </Button>
        ) : (
          <Uploader
            multiple
            value={file}
            hideTextArea
            onChange={setFile}
            buttonText="Upload"
            accept="application/zip"
            icon={<IconWrapper icon={RiFolderZipFill} />}
          />
        )}
      </Stack>
    </Panel>
  );
}
