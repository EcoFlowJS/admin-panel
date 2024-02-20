import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Divider,
  Footer,
  Header,
  Placeholder,
  Tabs,
} from "rsuite";
import SystemEnvvironments from "../../components/ServerEnvironments/SystemEnvvironments/SystemEnvvironments.components";
import UserEnvironments from "../../components/ServerEnvironments/UserEnvironments/UserEnvironments.components";

export default function ServerEnvironments() {
  const [isLoading, setLoading] = useState(true);
  const [tabKey, setTabKey] = useState("intro");

  useEffect(() => {
    (async () => {
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <Content>
            <Placeholder.Paragraph rows={5} active />
          </Content>
        </Container>
      ) : (
        <Container>
          <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
            <h4>Server Environments</h4>
          </Header>
          <Divider />
          <Content>
            <Tabs
              onSelect={(key) => setTabKey(key!)}
              defaultActiveKey="intro"
              vertical
            >
              <Tabs.Tab eventKey="intro" title="Introductions">
                <Placeholder.Paragraph graph="image" rows={5} />
              </Tabs.Tab>
              <Tabs.Tab eventKey="sysEnvs" title="System Environments">
                {tabKey === "sysEnvs" ? <SystemEnvvironments /> : <></>}
              </Tabs.Tab>
              <Tabs.Tab eventKey="userEnvs" title="Users Environments">
                {tabKey === "userEnvs" ? <UserEnvironments /> : <></>}
              </Tabs.Tab>
            </Tabs>
          </Content>
        </Container>
      )}
    </>
  );
}
