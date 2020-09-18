import React, { useState } from "react";
import { Button, Row, Container } from "reactstrap";
import Header from "../../components/Header";
import Categoriesmodal from "./CategoriesModal";
import CategoriesTable from "./CategoriesTable";

const Categories = () => {
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
            Add Category
          </Button>
        </Row>

        <CategoriesTable></CategoriesTable>
        {modal && (
          <Categoriesmodal
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

export default Categories;
