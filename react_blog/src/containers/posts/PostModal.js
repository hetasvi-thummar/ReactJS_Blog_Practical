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
import { createPost, editPost } from "../../redux/actions/PostsActions";
import Select from "react-select";
import { fetchAllCategories } from "../../redux/actions/CategoriesActions";
import { fetchAllTags } from "../../redux/actions/TagsActions";

const postSchema = yup.object().shape({
  title: yup.string().required("*Title is Required"),
  slug: yup.string().required("*Slug is Required"),
  content: yup.string().required("*Content is Required"),
});

const PostModal = ({ modal, setModal, action, toggle }) => {
  const { control, register, handleSubmit, errors } = useForm({
    resolver: yupResolver(postSchema),
  });

  const dispatch = useDispatch();

  const { loading, singlepost, allcategories, alltags } = useSelector(
    (state) => ({
      loading: state.fetchAllPostsReducer.singlePost.loading,
      singlepost: state.fetchAllPostsReducer.singlePost.singlepost,
      allcategories: state.fetchAllCategoriesReducer.allcategories,
      alltags: state.fetchAllTagsReducer.alltags,
    })
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllTags());
  }, [dispatch]);

  const userid = localStorage.getItem("userid");

  const onSubmit = (posts) => {
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
                      options={allcategories}
                      getOptionLabel={(option) => option.title}
                      getOptionValue={(option) => option.title}
                      control={control}
                      ref={register}
                      placeholder=" Select Post category...."
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlepost !== null && singlepost.categories
                      }
                    />
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
                      options={alltags}
                      getOptionLabel={(option) => option.title}
                      getOptionValue={(option) => option.title}
                      control={control}
                      ref={register}
                      placeholder=" Select Tag ...."
                      defaultValue={
                        action === "create"
                          ? ""
                          : singlepost !== null && singlepost.tags
                      }
                    />
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

export default PostModal;
