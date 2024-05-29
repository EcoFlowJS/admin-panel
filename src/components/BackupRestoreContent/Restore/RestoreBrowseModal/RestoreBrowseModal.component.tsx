import { useEffect, useState } from "react";
import { Button, FlexboxGrid, Modal, Text, Tree } from "rsuite";
import fetchBackups from "../../../../service/backupRestore/fetchBackups.service";
import { ApiResponse } from "@ecoflow/types";
import { IconWrapper } from "@ecoflow/components-lib";
import { FaFileZipper } from "react-icons/fa6";
import TreeNode from "./TreeNode/TreeNode.component";
import isEmpty from "lodash/isEmpty";
import removeBackup from "../../../../service/backupRestore/removeBackup.service";
import restoreBackup from "../../../../service/backupRestore/restoreBackup.service";
import { successNotification } from "../../../../store/notification.store";
import { useSetAtom } from "jotai";
import isServerOnline from "../../../../service/server/isServerOnline.service";
import {
  isClosedServer,
  isRestartingServer,
  serverRestartedResponse,
} from "../../../../store/server.store";

interface RestoreBrowseModalProps {
  open?: boolean;
  onClose?: () => void;
}

export default function RestoreBrowseModal({
  open,
  onClose = () => {},
}: RestoreBrowseModalProps) {
  const [backups, setBackups] = useState<string[]>([]);
  const [value, setValue] = useState<string | null>("");
  const [isLoading, setLoading] = useState(false);

  const setCloseServer = useSetAtom(isClosedServer);
  const setRestartingServer = useSetAtom(isRestartingServer);
  const setOnServerRestartedResponse = useSetAtom(serverRestartedResponse);

  const setSuccessNotification = useSetAtom(successNotification);

  const responseSuccess = ({ success, payload }: ApiResponse) => {
    setLoading(false);
    if (success) {
      setValue("");
      setBackups(Array.isArray(payload) ? payload : backups);
    }
  };
  const responseError = ({ error, payload }: ApiResponse) => {
    setLoading(false);
    if (error) console.error(payload);
  };

  const handelRemove = () => {
    if (value !== null)
      removeBackup(value).then(responseSuccess, responseError);
  };

  const handelConfirm = () => {
    if (value !== null) {
      setLoading(true);
      restoreBackup(value).then(
        ({ success, payload, ...rest }: ApiResponse) => {
          responseSuccess({ success, payload, ...rest });
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
            onClose();
          }
        },
        responseError
      );
    }
  };

  useEffect(() => {
    if (open) {
      setValue("");
      fetchBackups().then(responseSuccess, responseError);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Select Backup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {backups.length === 0 ? (
          <>
            <FlexboxGrid
              justify="center"
              align="middle"
              style={{ height: 250 }}
            >
              <Text muted>No backups found </Text>
            </FlexboxGrid>
          </>
        ) : (
          <Tree
            data={backups.map((val) => ({ label: val, value: val }))}
            onSelect={(_, val) => setValue(String(val))}
            renderTreeNode={(node) => {
              return (
                <TreeNode>
                  <IconWrapper icon={FaFileZipper} /> {node.label}
                </TreeNode>
              );
            }}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <FlexboxGrid justify="space-between">
          <FlexboxGrid.Item>
            <Button
              onClick={handelRemove}
              appearance="primary"
              color="red"
              style={{ minWidth: 100 }}
              disabled={isEmpty(value)}
            >
              Delete
            </Button>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <Button
              onClick={handelConfirm}
              appearance="primary"
              style={{ minWidth: 100 }}
              disabled={isEmpty(value)}
              loading={isLoading}
            >
              Confirm
            </Button>
            <Button
              onClick={onClose}
              appearance="subtle"
              style={{ minWidth: 100 }}
            >
              Cancel
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Modal.Footer>
    </Modal>
  );
}
