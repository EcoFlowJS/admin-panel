import React, { useEffect, useState } from "react";
import { Container, Content, Placeholder } from "rsuite";
import getAllUserEnvsServices from "../../../service/environments/getAllUserEnvs.services";
import { Environment } from "@ecoflow/types";
import EnvsTables from "../EnvsTables/EnvsTables.component";

export default function UserEnvironments() {
  const [isLoading, setLoading] = useState(true);
  const [userEnvs, setUserEnvs] = useState<Environment[]>([]);

  useEffect(() => {
    (async () => {
      setUserEnvs(await getAllUserEnvsServices());
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
        <EnvsTables envList={userEnvs} />
      )}
    </>
  );
}
