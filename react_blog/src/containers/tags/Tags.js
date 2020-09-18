import React, { useState } from "react";
import { Button, Row, Container } from "reactstrap";
import Header from "../../components/Header";
import Tagmodal from "./TagModal";
import TagsTable from "./TagsTable";

const Tags = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  return (
    <>
      <Header></Header>
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
    </>
  );
};

export default Tags;
