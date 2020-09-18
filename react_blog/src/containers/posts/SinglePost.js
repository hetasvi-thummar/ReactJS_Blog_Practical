import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Card,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
  CardImg,
  CardBody,
  Label,
} from "reactstrap";
import { Header } from "../../components";
import { fetchSinglePost } from "../../redux/actions/PostsActions";
import { useParams } from "react-router-dom";
import { FaTags, FaUserCircle, FaRegHeart } from "react-icons/fa";
import headerimg from "../../images/headerimage.png";

const SinglePost = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { loading, singlepost } = useSelector((state) => ({
    loading: state.fetchAllPostsReducer.singlePost.loading,
    singlepost: state.fetchAllPostsReducer.singlePost.singlepost,
  }));

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  return (
    <>
      <Header></Header>
      <Container>
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
              {singlepost !== null && (
                <Card className="border">
                  <Col>
                    <CardBody className="single-card-body">
                      <CardText className="user-title paragraph-text">
                        <FaUserCircle className="blog-userlogo paragraph-text" />

                        {singlepost.user && singlepost.user.username}
                        <span className="pl-2 pr-2">-</span>
                        {moment(singlepost.created_at).format("MMM Do, YY")}
                      </CardText>
                      <CardText>
                        {singlepost.categories.map((category) => (
                          <Button className="category-btn">
                            {category.title}
                          </Button>
                        ))}
                      </CardText>
                      <CardTitle className="pb-3">
                        <h4>{singlepost.title}</h4>
                      </CardTitle>
                      <CardImg
                        src={
                          singlepost.featured_media
                            ? `https://infblogdemo.herokuapp.com${singlepost.featured_media.url}`
                            : "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
                        }
                        alt="post image"
                        className="pb-4"
                      />

                      <CardTitle>{singlepost.content}</CardTitle>

                      <CardText className="tag-div pt-2">
                        <CardText>
                          <FaTags className="tag-logo" />
                          {singlepost.tags.map((tag) => (
                            <Link className="tag-title" title={tag.title}>
                              {tag.title}
                            </Link>
                          ))}
                        </CardText>
                        <FaRegHeart className="tag-logo" />
                      </CardText>
                    </CardBody>
                  </Col>
                </Card>
              )}
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SinglePost;
