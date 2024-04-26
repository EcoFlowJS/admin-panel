import { useEffect, useState } from "react";
import { Container, Content, Footer, Header } from "rsuite";
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
