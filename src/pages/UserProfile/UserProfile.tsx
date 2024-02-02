import React, { useEffect, useState } from "react";
import { Container, Content, Footer, Header, Placeholder } from "rsuite";

export default function UserProfile() {
  const [isLoading, setLoading] = useState(true);

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
          <Header>Header</Header>
          <Content>
            <Placeholder.Paragraph rows={5} active />
            <div>UserProfile</div>
          </Content>
          <Footer>Footer</Footer>
        </Container>
      )}
    </>
  );
}
