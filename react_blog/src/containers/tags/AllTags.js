import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import { Header } from "../../components";
import { fetchAllTags } from "../../redux/actions/TagsActions";

const AllTags = () => {
  const dispatch = useDispatch();

  const { loading, alltags } = useSelector((state) => ({
    loading: state.fetchAllTagsReducer.loading,
    alltags: state.fetchAllTagsReducer.alltags,
  }));

  useEffect(() => {
    dispatch(fetchAllTags());
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
                {alltags !== null &&
                  alltags.map((tag) => (
                    <Button className="category-btn">{tag.title}</Button>
                  ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllTags;
