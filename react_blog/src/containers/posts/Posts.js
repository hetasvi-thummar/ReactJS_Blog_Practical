import React, { useState } from "react";
import { Button, Row, Container } from "reactstrap";
import Header from "../../components/Header";
import Postmodal from "./PostModal";
import PostsTable from "./PostsTable";
import { Layout } from "../../components";

const Posts = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  return (
    <Layout>
      <Container className="p-5" fluid>
        <Row className="pb-3">
          <Button
            color="primary"
            onClick={() => {
              toggle();
              setAction("create");
            }}
          >
            Create Post
          </Button>
        </Row>
        <PostsTable></PostsTable>

        {modal && (
          <Postmodal
            modal={modal}
            action={action}
            setModal={setModal}
            toggle={toggle}
          />
        )}
      </Container>
    </Layout>
  );
};

export default Posts;
