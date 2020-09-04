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
  CardSubtitle,
} from "reactstrap";
import { Header } from "../Components";
import { fetchSinglePost } from "../Redux/Actions/Posts/singlepost";
import { useParams } from "react-router-dom";

const Singlepost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, singlepost } = useSelector((state) => ({
    loading: state.fetchSinglePostReducer.loading,
    singlepost: state.fetchSinglePostReducer.singlepost,
  }));

  console.log(singlepost);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  console.log(id);
  // dispatch(fetchSinglePost(singlepost.id));

  const user = localStorage.getItem("username");

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
                  <Card body key={singlepost.id}>
                    <CardSubtitle>{singlepost.id}</CardSubtitle>
                    <CardText>{singlepost.categories.title}</CardText>
                    <CardText>{singlepost.tags.title}</CardText>
                    <CardTitle>{singlepost.title}</CardTitle>
                    <CardText>
                      {moment(singlepost.created_at).format("MMM Do, YY")} by{" "}
                      {user}
                    </CardText>
                    <CardTitle>{singlepost.content}</CardTitle>
                  </Card>
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
