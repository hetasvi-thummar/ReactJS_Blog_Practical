import React, { useState } from "react";
import { Button, Row, Container } from "reactstrap";
import Categoriesmodal from "./CategoriesModal";
import CategoriesTable from "./CategoriesTable";
import { Layout } from "../../components";

const Categories = () => {
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
    </Layout>
  );
};

export default Categories;
