import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
  Panel,
} from "rsuite";
import { resartModalState } from "../../store/modals.store";
import { isClosedServer } from "../../store/server.store";
import { AlertModal, useNotification } from "@eco-flow/components-lib";
import restartCloseServer from "../../service/server/restartCloseServer.service";
import { ApiResponse } from "@eco-flow/types";

export default function ServerSettings() {
  const [_restartModalOpen, setRestartModalOpen] = useAtom(resartModalState);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [_closeServer, setCloseServer] = useAtom(isClosedServer);
  const [response, setResponse] = useState<ApiResponse>({});

  useEffect(() => {
    if (response.success) {
      setCloseModalOpen(false);
      successNotification.show();
      setTimeout(() => setCloseServer(true), 30 * 1000);
    }
    if (response.error) errorNotification.show();
  }, [response]);

  const successNotification = useNotification({
    header: "Warning",
    type: "warning",
    children: <>{response.success ? response.payload : <></>}</>,
  });

  const errorNotification = useNotification({
    header: "Server Stop Failed",
    type: "error",
    children: <>{response.error ? response.payload.toString() : <></>}</>,
  });

  return (
    <>
      <Container>
        <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
          <FlexboxGrid justify="start">
            <FlexboxGrid.Item>
              <h4>Server Settings</h4>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Divider />
        <Content>
          <Panel bordered shaded>
            <FlexboxGrid
              justify="space-between"
              align="middle"
              style={{ padding: "0 1.5rem" }}
            >
              <FlexboxGrid.Item>Stop Server</FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <Button
                  style={{ width: 150 }}
                  appearance="primary"
                  color="cyan"
                  onClick={() => setCloseModalOpen(true)}
                >
                  Stop Server
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <Divider />
            <FlexboxGrid
              justify="space-between"
              align="middle"
              style={{ padding: "0 1.5rem" }}
            >
              <FlexboxGrid.Item>Restart Server</FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <Button
                  style={{ width: 150 }}
                  appearance="primary"
                  color="cyan"
                  onClick={() => setRestartModalOpen(true)}
                >
                  Restart Server
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Panel>
        </Content>
      </Container>
      <AlertModal
        open={closeModalOpen}
        CancelButtonProps={{
          onClick: () => setCloseModalOpen(false),
          color: "green",
        }}
        confirmButtonProps={{
          onClick: () => {
            restartCloseServer("stop").then(setResponse, setResponse);
          },
          color: "red",
        }}
      >
        <h5>Server Stop</h5>
        <Divider />
        <p>Are you sure you want to Stop the server?</p>
      </AlertModal>
    </>
  );
}
