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
  Label,
  CardImg,
  Media,
} from "reactstrap";
import { Header } from "../Components";
import headerimg from "../Images/headerimage.png";
import { FaTags, FaUserCircle, FaRegHeart } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, posts } = useSelector((state) => ({
    loading: state.fetchAllPostsReducer.loading,
    posts: state.fetchAllPostsReducer.posts,
  }));

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      <Container className="main">
        <Row>
          <Col md={12}>
            <img src={headerimg} alt="headerimg" />
            <div className="header-div">
              <Label className="header-label">REACT BLOG</Label>
            </div>
          </Col>
        </Row>
        <Row className="blog-label">
          <Label>REACT BLOG</Label>
        </Row>

        <Row>
          <Col>
            {loading ? (
              <div>Loading....</div>
            ) : (
              <>
                {posts !== null &&
                  posts
                    .sort(
                      (item, index) =>
                        new Date(index.created_at) - new Date(item.created_at)
                    )
                    .map((post) => (
                      <Media>
                        <Card>
                          <CardImg
                            src={
                              post.featured_media
                                ? `https://infblogdemo.herokuapp.com${post.featured_media.url}`
                                : "https://unsplash.it/64/64"
                            }
                            alt="post image"
                            className="blog-img"
                          />
                        </Card>

                        <Media body>
                          <Card>
                            <Media className="username-div">
                              <Media left>
                                <CardText>
                                  <FaUserCircle className="blog-userlogo" />
                                </CardText>
                              </Media>
                              <Media body>
                                <CardText className="user-title">
                                  {post.user && post.user.username}
                                  <br></br>
                                  {moment(post.created_at).format("MMM Do, YY")}
                                </CardText>
                              </Media>
                            </Media>

                            <CardText className="card-div">
                              {post.categories.map((category) => (
                                <Button className="category-btn">
                                  {category.title}
                                </Button>
                              ))}
                            </CardText>

                            <CardTitle>
                              <h4>{post.title}</h4>{" "}
                            </CardTitle>

                            <CardTitle className="text">
                              {post.content}
                            </CardTitle>

                            <Link
                              to={`${post.slug}/${post.id}`}
                              className="card-div text-right pb-2 border-bottom"
                            >
                              Read More....
                            </Link>

                            <CardText className="tag-div pt-2">
                              <CardText>
                                <FaTags className="tag-logo" />
                                {post.tags.map((tag) => (
                                  <Link className="tag-title">{tag.title}</Link>
                                ))}
                              </CardText>
                              <FaRegHeart className="tag-logo" />
                            </CardText>
                          </Card>
                        </Media>
                      </Media>
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
