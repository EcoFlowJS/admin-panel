import React, { useEffect, useState } from "react";
import { Container, Content, Placeholder } from "rsuite";
import getAllSystemEnvsServices from "../../../service/environments/getAllSystemEnvs.services";
import { Environment } from "@eco-flow/types";
import EnvsTables from "../EnvsTables/EnvsTables.component";

export default function SystemEnvvironments() {
  const [isLoading, setLoading] = useState(true);
  const [systemEnvs, setSystemEnvs] = useState<Environment[]>([]);

  useEffect(() => {
    (async () => {
      setSystemEnvs(await getAllSystemEnvsServices());
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
        <EnvsTables envList={systemEnvs} isSystemEnvs />
      )}
    </>
  );
}
