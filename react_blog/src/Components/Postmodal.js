import React, { useState, useEffect } from "react";
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
import { createPost } from "../Redux/Actions/Posts/createpost";
import { editPost } from "../Redux/Actions/Posts/editpost";
import Select from "react-select";
import { fetchAllCategories } from "../Redux/Actions/Categories/allcategories";
import { fetchAllTags } from "../Redux/Actions/Tags/alltags";

const formSchema = yup.object().shape({
  title: yup.string().required("*Title is Required"),
  slug: yup.string().required("*Slug is Required"),
  content: yup.string().required("*content is Required"),
});

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

const Postmodal = ({ modal, setModal, action, toggle }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(formSchema),
  });

  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState();

  // const handleChange = (selectedOption) => {
  //   setSelectedOption({ selectedOption });
  //   console.log(`Option selected:`, selectedOption);
  // };

  const { loading, singlepost, allcategories, alltags } = useSelector(
    (state) => ({
      loading: state.fetchSinglePostReducer.loading,
      singlepost: state.fetchSinglePostReducer.singlepost,
      allcategories: state.fetchAllCategoriesReducer.allcategories,
      alltags: state.fetchAllTagsReducer.alltags,
    })
  );

  // const { allcategories } = useSelector((state) => ({
  //   loading: state.fetchAllCategoriesReducer.loading,
  //   allcategories: state.fetchAllCategoriesReducer.allcategories,
  // }));

  // const { alltags } = useSelector((state) => ({
  //   loading: state.fetchAllTagsReducer.loading,
  //   alltags: state.fetchAllTagsReducer.alltags,
  // }));

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllTags());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchAllTags());
  // }, [dispatch]);

  const options =
    allcategories !== null &&
    allcategories.map((category) => ({
      id: category.id,
      value: category.title,
      label: category.title,
    }));

  // console.log(`Option selected:`, allcategories);

  const tagoptions =
    alltags !== null &&
    alltags.map((tag) => ({
      id: tag.id,
      value: tag.title,
      label: tag.title,
    }));

  const userid = localStorage.getItem("userid");

  const onSubmit = (posts) => {
    const user = userid;

    const newPosts = { ...posts, user };

    console.log(newPosts);

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
                <Col md={12}>
                  <Label>New Post</Label>
                </Col>
              </Row>

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
                <Col md={12}>
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
                <Col md={12}>
                  <FormGroup>
                    <Controller
                      as={Select}
                      type="select"
                      isMulti={true}
                      name="categories"
                      options={options}
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
                      control={control}
                      ref={register}
                      placeholder=" Enter Post category...."
                    />
                    {/* {errors && errors.content && (
                      <span className="text-danger">
                        {errors.content.message}
                      </span>
                    )} */}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Controller
                      as={Select}
                      type="select"
                      isMulti={true}
                      name="tags"
                      options={tagoptions}
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
                      control={control}
                      ref={register}
                      placeholder=" Select Tag ...."
                    />
                    {/* {errors && errors.content && (
                      <span className="text-danger">
                        {errors.content.message}
                      </span>
                    )} */}
                  </FormGroup>
                </Col>
              </Row>

              {/* <Row>
                <Col md={12}>
                  <FormGroup>
                    <Controller
                      as={Input}
                      type="text"
                      isMulti={true}
                      name="user"
                      control={control}
                      ref={register}
                      placeholder=" Enter Post category...."
                      defaultValue={
                        action === "create"
                          ? singlepost !== null && singlepost.id
                          : ""
                      }
                    />
                  </FormGroup>
                </Col>
              </Row> */}
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
