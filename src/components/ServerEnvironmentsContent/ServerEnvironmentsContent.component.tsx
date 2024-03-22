import React, { useState } from "react";
import { Placeholder, Tabs } from "rsuite";
import SystemEnvvironments from "./SystemEnvvironments/SystemEnvvironments.components";
import UserEnvironments from "./UserEnvironments/UserEnvironments.components";

export default function ServerEnvironmentsContent() {
  const [tabKey, setTabKey] = useState("intro");
  return (
    <Tabs onSelect={(key) => setTabKey(key!)} defaultActiveKey="intro" vertical>
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
  );
}
