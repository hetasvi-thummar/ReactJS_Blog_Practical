import React, { useEffect } from "react";
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
import { createPost } from "../Redux/Actions/Posts/createpost";
import { editPost } from "../Redux/Actions/Posts/editpost";
import Select from "react-select";
import { fetchAllCategories } from "../Redux/Actions/Categories/allcategories";
import { fetchAllTags } from "../Redux/Actions/Tags/alltags";

const formSchema = yup.object().shape({
  title: yup.string().required("*Title is Required"),
  slug: yup.string().required("*Slug is Required"),
  content: yup.string().required("*content is Required"),
  categories: yup.string().required("Please select Category"),
  tags: yup.string().required("Please select Tag"),
});

const Postmodal = ({ modal, setModal, action, toggle }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const dispatch = useDispatch();

  const { loading, singlepost, allcategories, alltags } = useSelector(
    (state) => ({
      loading: state.fetchSinglePostReducer.loading,
      singlepost: state.fetchSinglePostReducer.singlepost,
      allcategories: state.fetchAllCategoriesReducer.allcategories,
      alltags: state.fetchAllTagsReducer.alltags,
    })
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllTags());
  }, [dispatch]);

  const tagoptions =
    alltags !== null &&
    alltags.map((tag) => ({
      id: tag.id,
      value: tag.title,
      label: tag.title,
    }));

  const options =
    allcategories !== null &&
    allcategories.map((category) => ({
      id: category.id,
      value: category.title,
      label: category.title,
    }));

  const userid = localStorage.getItem("userid");

  const onSubmit = (posts) => {
    console.log(`posts:`, posts);
    const user = userid;

    const newPosts = { ...posts, user };

    action === "create"
      ? dispatch(createPost(newPosts, setModal))
      : dispatch(editPost(newPosts, singlepost.id, setModal));
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {action === "create" ? "New Post" : "Edit Post"}
        </ModalHeader>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Row>
                <Col md={4}>
                  <Label> Post Title</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="title"
                      placeholder="Enter Post Title"
                      defaultValue=""
                      control={control}
                      ref={register}
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlepost !== null && singlepost.title
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
              <Row>
                <Col md={4}>
                  <Label>Post Slug</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      name="slug"
                      control={control}
                      ref={register}
                      placeholder="Enter Post Slug"
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlepost !== null && singlepost.slug
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
                  <Label>Post Content</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="textarea"
                      name="content"
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlepost !== null && singlepost.content
                      }
                      control={control}
                      ref={register}
                      placeholder=" Enter Post content...."
                    />
                    {errors && errors.content && (
                      <span className="text-danger">
                        {errors.content.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Label>Post Categories</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Select}
                      type="select"
                      isMulti={true}
                      name="categories"
                      options={options}
                      control={control}
                      ref={register}
                      placeholder=" Select Post category...."
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlepost !== null &&
                            singlepost.categories.map((post) => ({
                              id: post.id,
                              label: post.title,
                              value: post.title,
                            }))
                      }
                    />
                    {errors && errors.categories && (
                      <span className="text-danger">
                        {errors.categories.message}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Label>Post Tags</Label>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Controller
                      as={Select}
                      type="select"
                      isMulti={true}
                      name="tags"
                      options={tagoptions}
                      control={control}
                      ref={register}
                      placeholder=" Select Tag ...."
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlepost !== null &&
                            singlepost.tags.map((post) => ({
                              id: post.id,
                              label: post.title,
                              value: post.title,
                            }))
                      }
                    />
                    {errors && errors.tags && (
                      <span className="text-danger">{errors.tags.message}</span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary">
                {action === "create" ? "Save" : "Update Post"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default Postmodal;
