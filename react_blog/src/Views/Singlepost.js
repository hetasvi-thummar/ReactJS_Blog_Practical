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
  Media,
} from "reactstrap";
import { Header } from "../Components";
import { fetchSinglePost } from "../Redux/Actions/Posts/singlepost";
import { useParams } from "react-router-dom";
import { FaTags, FaUserCircle, FaRegHeart } from "react-icons/fa";

const Singlepost = () => {
  const dispatch = useDispatch();

  const { loading, singlepost } = useSelector((state) => ({
    loading: state.fetchSinglePostReducer.loading,
    singlepost: state.fetchSinglePostReducer.singlepost,
  }));

  useEffect(() => {
    dispatch(fetchSinglePost());
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      <Container>
        <Row>
          <Col>
            {loading ? (
              <div>Loading....</div>
            ) : (
              <>
                {singlepost !== null && (
                  <Media>
                    <Media left>
                      <Media
                        src={
                          singlepost.featured_media
                            ? `https://infblogdemo.herokuapp.com${singlepost.featured_media.url}`
                            : "https://unsplash.it/64/64"
                        }
                        alt="post image"
                        className="blog-img"
                      />
                    </Media>

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
                              {singlepost.user && singlepost.user.username}
                              <br></br>
                              {moment(singlepost.created_at).format(
                                "MMM Do, YY"
                              )}
                            </CardText>
                          </Media>
                        </Media>

                        <CardText className="card-div">
                          {singlepost.categories.map((category) => (
                            <Button className="category-btn">
                              {category.title}
                            </Button>
                          ))}
                        </CardText>

                        <CardTitle>
                          <h4>{singlepost.title}</h4>{" "}
                        </CardTitle>

                        <CardTitle>{singlepost.content}</CardTitle>

                        <CardText className="tag-div pt-2">
                          <CardText>
                            <FaTags className="tag-logo" />
                            {singlepost.tags.map((tag) => (
                              <Link className="tag-title">{tag.title}</Link>
                            ))}
                          </CardText>
                          <FaRegHeart className="tag-logo" />
                        </CardText>
                      </Card>
                    </Media>
                  </Media>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Singlepost;
