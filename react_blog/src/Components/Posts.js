import React, { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "reactstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Header from "./Header";
import SweetAlert from "react-bootstrap-sweetalert";
import { fetchSinglePost } from "../Redux/Actions/Posts/singlepost";
import { fetchAllPosts } from "../Redux/Actions/Posts/allpost";
import Postmodal from "./Postmodal";
import { deletePost } from "../Redux/Actions/Posts/deletepost";

const Posts = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  const [alert, setAlert] = useState();

  const dispatch = useDispatch();

  const { loading, posts } = useSelector((state) => ({
    loading: state.fetchAllPostsReducer.loading,
    posts: state.fetchAllPostsReducer.posts,
  }));

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const removeHandle = (id) => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => {
          dispatch(deletePost(id));
          hideAlert();
        }}
        onCancel={() => hideAlert()}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>
    );
    setAlert(getAlert());
  };

  const hideAlert = () => {
    setAlert();
  };

  return (
    <div>
      <Header></Header>
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
        <Row>
          <Table responsive>
            <thead className="bg-light">
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Content</th>
                <th>Username</th>
                <th>Categories</th>
                <th>Tags</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {posts !== null &&
                    posts
                      .sort(
                        (item, index) =>
                          new Date(index.created_at) - new Date(item.created_at)
                      )
                      .map((post) => (
                        <tr key={post.id}>
                          <td>{post.id}</td>
                          <td>{post.title}</td>
                          <td>{post.slug}</td>
                          <td>{post.content}</td>
                          <td>{post.user && post.user.username}</td>
                          <td>
                            {post.categories.map((catagory) => (
                              <>{catagory.title}</>
                            ))}
                          </td>
                          <td>
                            {post.tags.map((tags) => (
                              <>{tags.title}</>
                            ))}
                          </td>
                          <td>
                            {moment(post.created_at).format("MMM Do, YY")}
                          </td>
                          <td>
                            {moment(post.updated_at).format("MMM Do, YY")}
                          </td>
                          <td>
                            <FaPencilAlt
                              onClick={() => {
                                toggle();
                                setAction("edit");
                                dispatch(fetchSinglePost(post.id));
                              }}
                              className="icon"
                            />

                            <FaTrashAlt onClick={() => removeHandle(post.id)} />
                            {alert}
                          </td>
                        </tr>
                      ))}
                </>
              )}
            </tbody>
          </Table>
        </Row>
        {modal && (
          <Postmodal
            modal={modal}
            action={action}
            setModal={setModal}
            toggle={toggle}
          />
        )}
      </Container>
    </div>
  );
};

export default Posts;
