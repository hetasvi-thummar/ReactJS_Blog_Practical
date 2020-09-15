import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import { Header } from "../Components";
import { fetchAllCategories } from "../Redux/Actions/Categories/allcategories";

const Allcategories = () => {
  const dispatch = useDispatch();

  const { loading, allcategories } = useSelector((state) => ({
    loading: state.fetchAllCategoriesReducer.loading,
    allcategories: state.fetchAllCategoriesReducer.allcategories,
  }));

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      <Container>
        <Row>
          {loading ? (
            <div>Loading....</div>
          ) : (
            <div>
              {allcategories !== null &&
                allcategories.map((Category) => (
                  <Button className="title-btn">{Category.title}</Button>
                ))}
            </div>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Allcategories;
