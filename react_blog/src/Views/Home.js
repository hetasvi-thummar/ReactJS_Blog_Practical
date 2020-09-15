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
  Media,
  CardImg,
  CardBody,
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

        <Row className="p-4">
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
                    <Card className="border">
                      <Col md={6} className="blog-image">
                        <CardImg
                          width="100%"
                          height="100%"
                          src={
                            post.featured_media
                              ? `https://infblogdemo.herokuapp.com${post.featured_media.url}`
                              : "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
                          }
                          alt="post image"
                        />
                      </Col>
                      <Col md={6}>
                        <CardBody>
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
                          <CardText>
                            {post.categories.map((category) => (
                              <Button className="category-btn">
                                {category.title}
                              </Button>
                            ))}
                          </CardText>
                          <CardTitle>
                            <h4>{post.title}</h4>{" "}
                          </CardTitle>
                          <CardTitle className="text">{post.content}</CardTitle>
                          <CardText className="text-right">
                            <Link to={`${post.slug}/${post.id}`}>
                              Read More....
                            </Link>
                          </CardText>

                          <CardText className="tag-div pt-2">
                            <CardText>
                              <FaTags className="tag-logo" />
                              {post.tags.map((tag) => (
                                <Link className="tag-title">{tag.title}</Link>
                              ))}
                            </CardText>
                            <FaRegHeart className="tag-logo" />
                          </CardText>
                        </CardBody>
                      </Col>
                    </Card>
                  ))}
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Home;
