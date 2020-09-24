import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import { Layout } from "../../components";
import { fetchAllCategories } from "../../redux/actions/CategoriesActions";

const AllCategories = () => {
  const dispatch = useDispatch();

  const { loading, allcategories } = useSelector((state) => ({
    loading: state.fetchAllCategoriesReducer.loading,
    allcategories: state.fetchAllCategoriesReducer.allcategories,
  }));

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            {loading ? (
              <div>Loading....</div>
            ) : (
              <div>
                {allcategories !== null &&
                  allcategories.map((Category) => (
                    <Button className="category-btn">{Category.title}</Button>
                  ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AllCategories;
