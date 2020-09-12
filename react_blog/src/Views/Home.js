import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../Redux/Actions/Posts/allpost";
import moment from "moment";
import {
  Card,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
  CardSubtitle,
  CardImg,
} from "reactstrap";
import { Header } from "../Components";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, posts } = useSelector((state) => ({
    loading: state.fetchAllPostsReducer.loading,
    posts: state.fetchAllPostsReducer.posts,
  }));

  console.log(posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const user = localStorage.getItem("username");

  return (
    <>
      <Header></Header>
      <Container className="main">
        <Row>
          <Col>
            {loading ? (
              <div>Loading....</div>
            ) : (
              <>
                {posts !== null &&
                  posts.map((post) => (
                    <Card body key={post.id}>
                      <Row>
                        <Col md={4}>
                          {/* <CardImg
                            src="https://unsplash.it/80/60"
                            alt="performer"
                          /> */}
                          <CardImg
                            src={
                              post.featured_media &&
                              `https://infblogdemo.herokuapp.com${post.featured_media.url}`
                            }
                            alt="post image"
                          />
                        </Col>
                        <Col md={6}>
                          <CardSubtitle>{post.id}</CardSubtitle>
                          <CardText>{post.categories.title}</CardText>
                          <CardText>{post.tags.title}</CardText>
                          <CardTitle>{post.title}</CardTitle>
                          <CardText>
                            {moment(post.created_at).format("MMM Do, YY")}
                          </CardText>
                          <CardTitle>
                            {post.user && post.user.username}
                          </CardTitle>
                          <CardTitle className="text">{post.content}</CardTitle>
                          <Link to={`${post.slug}/${post.id}`} className="pl-2">
                            Read More....
                          </Link>
                          {post.categories.map((catagory) => (
                            <ul>
                              {catagory.id}
                              <li>{catagory.title}</li>
                            </ul>
                          ))}
                          {post.tags.map((tags) => (
                            <ul>
                              {tags.id}
                              <li>{tags.title}</li>
                            </ul>
                          ))}
                        </Col>
                      </Row>
                      <Col></Col>
                    </Card>
                  ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
