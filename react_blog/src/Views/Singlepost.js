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
  CardImg,
  CardBody,
} from "reactstrap";
import { Header } from "../Components";
import { fetchSinglePost } from "../Redux/Actions/Posts/singlepost";
import { useParams } from "react-router-dom";
import { FaTags, FaUserCircle, FaRegHeart } from "react-icons/fa";

const Singlepost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, singlepost } = useSelector((state) => ({
    loading: state.fetchSinglePostReducer.loading,
    singlepost: state.fetchSinglePostReducer.singlepost,
  }));

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  return (
    <>
      <Header></Header>
      <Container>
        <Row className="p-4">
          {loading ? (
            <div>Loading....</div>
          ) : (
            <>
              {singlepost !== null && (
                <Card className="border">
                  <Col>
                    <CardBody>
                      <CardText className="user-title">
                        <FaUserCircle className="blog-userlogo" />

                        {singlepost.user && singlepost.user.username}
                        <span className="pl-2 pr-2">-</span>
                        {moment(singlepost.created_at).format("MMM Do, YY")}
                      </CardText>
                      <CardImg
                        src={
                          singlepost.featured_media
                            ? `https://infblogdemo.herokuapp.com${singlepost.featured_media.url}`
                            : "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
                        }
                        alt="post image"
                        className="pb-3"
                      />
                      <CardText>
                        {singlepost.categories.map((category) => (
                          <Button className="category-btn">
                            {category.title}
                          </Button>
                        ))}
                      </CardText>
                      <CardTitle>
                        <h4>{singlepost.title}</h4>{" "}
                      </CardTitle>
                      <CardTitle className="text">
                        {singlepost.content}
                      </CardTitle>

                      <CardText className="tag-div pt-2">
                        <CardText>
                          <FaTags className="tag-logo" />
                          {singlepost.tags.map((tag) => (
                            <Link className="tag-title">{tag.title}</Link>
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

export default Singlepost;
