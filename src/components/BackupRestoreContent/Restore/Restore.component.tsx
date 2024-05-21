import { IconWrapper, Uploader } from "@ecoflow/components-lib";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Button, Panel, Stack, Text } from "rsuite";
import restoreBackup from "../../../service/backupRestore/restoreBackup.service";
import { useSetAtom } from "jotai";
import {
  errorNotification,
  successNotification,
} from "../../../store/notification.store";
import { ApiResponse } from "@ecoflow/types";
import {
  isClosedServer,
  isRestartingServer,
  serverRestartedResponse,
} from "../../../store/server.store";
import isServerOnline from "../../../service/server/isServerOnline.service";

export default function Restore() {
  const [uploaderValue, setUploaderValue] = useState<FileList | null>(null);
  const [isLoading, setLoading] = useState(false);

  const setCloseServer = useSetAtom(isClosedServer);
  const setRestartingServer = useSetAtom(isRestartingServer);
  const setOnServerRestartedResponse = useSetAtom(serverRestartedResponse);

  const setErrorNotification = useSetAtom(errorNotification);
  const setSuccessNotification = useSetAtom(successNotification);

  const handleRestore = () => {
    if (uploaderValue !== null) {
      setLoading(true);
      restoreBackup(uploaderValue).then(
        ({ success, payload }: ApiResponse) => {
          setLoading(false);
          if (success) {
            setSuccessNotification({
              show: true,
              header: "Restore success.",
              message: payload,
            });
            setTimeout(() => {
              setRestartingServer(true);
              isServerOnline([
                setCloseServer,
                setRestartingServer,
                setOnServerRestartedResponse,
              ]);
            }, 11 * 1000);
          }
        },
        ({ error, payload }: ApiResponse) => {
          if (error) {
            console.error(payload);
            setErrorNotification({
              show: true,
              header: "Restore Error",
              message:
                typeof payload === "string" ? payload : payload.toString(),
            });
          }
        }
      );
    }
  };

  return (
    <Panel header="Restore">
      <Text muted size="lg">
        Select a backup to restore.
      </Text>
      <Stack spacing={15} style={{ paddingTop: 8 }}>
        <Stack.Item style={{ width: 400 }}>
          <Uploader
            name="restore"
            buttonText="Upload"
            accept="application/zip"
            onChange={setUploaderValue}
            value={uploaderValue}
          />
        </Stack.Item>
        <Stack.Item>
          <Button
            appearance="primary"
            style={{ width: 150 }}
            onClick={handleRestore}
            loading={isLoading}
            startIcon={<IconWrapper icon={FaUpload} />}
          >
            Backup
          </Button>
        </Stack.Item>
      </Stack>
    </Panel>
  );
}
