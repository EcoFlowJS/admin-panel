import { IconWrapper } from "@ecoflow/components-lib";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { Button, FlexboxGrid, MultiCascadeTree, Panel, Text } from "rsuite";
import fetchBackupInfos from "../../../service/backupRestore/fetchBackupInfos.service";
import { ApiResponse } from "@ecoflow/types";
import { ItemDataType } from "rsuite/esm/MultiCascadeTree";
import { DataItemValue } from "rsuite/esm/@types/common";
import { useSetAtom } from "jotai";
import {
  errorNotification,
  successNotification,
} from "../../../store/notification.store";
import generateBackupFile from "../../../service/backupRestore/generateBackupFile.service";
import defaultMultiCascadeTreeOptions from "../../../defaults/defaultMultiCascadeTreeOptions.default";

export default function Backup() {
  const [backupData, setBackupData] = useState<ItemDataType<string>[]>(
    [...Array(5)].map(() => ({ label: "Loading...", value: "Loading..." }))
  );
  const [disabledBackupData, setDisabledBackupData] = useState<string[]>([
    "installedPackages",
    "databaseConfigs",
    "Loading...",
  ]);
  const [backupValues, setBackupValues] = useState<DataItemValue[]>([]);

  const setErrorNotification = useSetAtom(errorNotification);
  const setSuccessNotification = useSetAtom(successNotification);

  const handleBackup = () => {
    generateBackupFile(backupValues).then(
      (blob) => {
        setSuccessNotification({
          show: true,
          header: "Success Backup",
          message: "Backup successfully and backup download in progress.",
        });

        const href = URL.createObjectURL(blob);

        // create "a" HTML element with href to file & click
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "backup.zip"); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      },
      (reject) => {
        const u = URL.createObjectURL(reject);
        const x = new XMLHttpRequest();
        x.open("GET", u, false);
        x.send();
        URL.revokeObjectURL(u);
        const { error, payload } = JSON.parse(x.responseText) as ApiResponse;
        if (error) {
          console.error(payload);
          setErrorNotification({
            show: true,
            header: "Backup Error",
            message: typeof payload === "string" ? payload : payload.toString(),
          });
        }
      }
    );
  };

  useEffect(() => {
    fetchBackupInfos().then(
      ({ success, payload }: ApiResponse) => {
        setBackupData(defaultMultiCascadeTreeOptions);
        if (success) {
          setBackupData((backupData) =>
            backupData.map((data) => {
              if (
                data.value === "databaseConfigs" &&
                payload.databaseNames.length > 0
              )
                data.children = payload.databaseNames.map(
                  ({ label, value }: any) => ({
                    label,
                    value: `databaseConfigs.${value}`,
                  })
                );

              if (
                data.value === "installedPackages" &&
                payload.packageInfo.length > 0
              )
                data.children = payload.packageInfo.map(
                  ({ label, value }: any) => ({
                    label,
                    value: `installedPackages.${value}`,
                  })
                );

              return data;
            })
          );
          const disabledValues: string[] = [];
          if (payload.databaseNames.length === 0)
            disabledValues.push("databaseConfigs");
          if (payload.packageInfo.length === 0)
            disabledValues.push("installedPackages");
          setDisabledBackupData(disabledValues);
        }
      },
      ({ error, payload }: ApiResponse) => {
        setBackupData(defaultMultiCascadeTreeOptions);
        if (error) {
          console.error(payload);
          setDisabledBackupData(["installedPackages", "databaseConfigs"]);
        }
      }
    );
  }, []);
  return (
    <Panel header="Backup">
      <Text muted size="lg">
        Select items that to be Backup.
      </Text>
      <MultiCascadeTree
        data={backupData}
        columnWidth={250}
        columnHeight={180}
        disabledItemValues={disabledBackupData}
        onChange={setBackupValues}
        value={backupValues}
      />
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={22}>
          <FlexboxGrid justify="end">
            <FlexboxGrid.Item>
              <Button
                appearance="primary"
                style={{ width: 150 }}
                onClick={handleBackup}
                startIcon={<IconWrapper icon={FaDownload} />}
              >
                Backup
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
}
