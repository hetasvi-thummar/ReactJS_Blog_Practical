import React, { useState } from "react";
import { Button, Row, Container } from "reactstrap";
import Header from "../../components/Header";
import Tagmodal from "./TagModal";
import TagsTable from "./TagsTable";
import { Layout } from "../../components";

const Tags = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  return (
    <Layout>
      <Container className="p-5" fluid>
        <Row className="pb-3 ">
          <Button
            color="primary"
            onClick={() => {
              toggle();
              setAction("create");
            }}
          >
            Create Tag
          </Button>
        </Row>
        <TagsTable></TagsTable>
        {modal && (
          <Tagmodal
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

export default Tags;
