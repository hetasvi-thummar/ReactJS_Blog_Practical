import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  Label,
  Row,
  Form,
  Col,
  FormGroup,
} from "reactstrap";
import { createTag } from "../Redux/Actions/Tags/createtag";
import { editTag } from "../Redux/Actions/Tags/edittag";
import { createCategory } from "../Redux/Actions/Categories/createcategories";
import { editCategory } from "../Redux/Actions/Categories/editcategories";

const formSchema = yup.object().shape({
  title: yup.string().required("*Title is Required"),
  slug: yup.string().required("*Slug is Required"),
});

const Categoriesmodal = ({ modal, setModal, action, toggle }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const dispatch = useDispatch();

  const { loading, singlecategory } = useSelector((state) => ({
    loading: state.fetchAllCategoriesReducer.singleCategory.loading,
    singlecategory:
      state.fetchAllCategoriesReducer.singleCategory.singlecategory,
  }));

  const onSubmit = (categories) => {
    action === "create"
      ? dispatch(createCategory(categories.title, categories.slug, setModal))
      : dispatch(
          editCategory(
            categories.title,
            categories.slug,

            singlecategory.id,
            setModal
          )
        );
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {action === "create" ? "New Category" : "Edit Category"}
        </ModalHeader>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Row>
                <Col md={12}>
                  <Label>New Category</Label>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label>Category Slug</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="slug"
                      control={control}
                      ref={register}
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlecategory !== null && singlecategory.slug
                      }
                    />

                    {errors && errors.slug && (
                      <span className="text-danger">{errors.slug.message}</span>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Label> Category Title</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="title"
                      placeholder="Enter Tag Title"
                      defaultValue=""
                      control={control}
                      ref={register}
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlecategory !== null && singlecategory.title
                      }
                    />
                    {errors && errors.title && (
                      <span className="text-danger">
                        {errors.title.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">
                {action === "create" ? "Save" : "Update Category"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Categoriesmodal;
