import { useState } from "react";
import { FlexboxGrid, Tabs, Text } from "rsuite";
import SystemEnvironments from "./SystemEnvironments/SystemEnvironments.components";
import UserEnvironments from "./UserEnvironments/UserEnvironments.components";

export default function ServerEnvironmentsContent() {
  const [tabKey, setTabKey] = useState("intro");
  return (
    <Tabs onSelect={(key) => setTabKey(key!)} defaultActiveKey="intro" vertical>
      <Tabs.Tab eventKey="intro" title="Introductions">
        <FlexboxGrid justify="center" align="middle">
          <FlexboxGrid.Item colspan={18} style={{ padding: 30 }}>
            <Text size="xl" align="justify" transform="capitalize" muted>
              Configure and manage your server settings within Eco-Flow to
              optimize performance, security, and reliability. This section
              allows you to set up server environments, manage configurations,
              monitor server health, and deploy your applications seamlessly.
            </Text>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Tabs.Tab>
      <Tabs.Tab eventKey="sysEnvs" title="System Environments">
        {tabKey === "sysEnvs" ? <SystemEnvironments /> : <></>}
      </Tabs.Tab>
      <Tabs.Tab eventKey="userEnvs" title="Users Environments">
        {tabKey === "userEnvs" ? <UserEnvironments /> : <></>}
      </Tabs.Tab>
    </Tabs>
  );
}
