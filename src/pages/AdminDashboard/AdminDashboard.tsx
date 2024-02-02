import React, { useEffect, useState } from "react";
import { Container, Content, Footer, Header, Placeholder } from "rsuite";
import getAllServerConfigService from "../../service/config/getAllServerConfig.service";
import AdminLoading from "../../components/Loading/AdminLoading.component";

export default function AdminDashboard() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <AdminLoading />
      ) : (
        <Container>
          <Header>Header</Header>
          <Content>sdgt</Content>
          <Footer>Footer</Footer>
        </Container>
      )}
    </>
  );
}
