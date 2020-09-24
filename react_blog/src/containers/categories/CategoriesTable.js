import React, { useState, useEffect } from "react";
import { Table, Row } from "reactstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  fetchAllCategories,
  fetchSingleCategory,
  deleteCategory,
} from "../../redux/actions/CategoriesActions";
import Categoriesmodal from "./CategoriesModal";

const CategoriesTable = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  const [alert, setAlert] = useState();

  const dispatch = useDispatch();

  const { loading, allcategories } = useSelector((state) => ({
    loading: state.fetchAllCategoriesReducer.loading,
    allcategories: state.fetchAllCategoriesReducer.allcategories,
  }));

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const removeHandle = (id) => {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => {
          dispatch(deleteCategory(id));
          hideAlert();
        }}
        onCancel={() => hideAlert()}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>
    );
    setAlert(getAlert());
  };

  const hideAlert = () => {
    setAlert();
  };

  return (
    <div>
      <Row>
        <Table responsive bordered>
          <thead className="bg-light">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Description</th>
              <th>created At</th>
              <th>Upadated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {allcategories !== null &&
                  allcategories
                    .sort(
                      (item, index) =>
                        new Date(index.created_at) - new Date(item.created_at)
                    )
                    .map((Category) => (
                      <tr key={Category.id}>
                        <td>{Category.id}</td>
                        <td>{Category.title}</td>
                        <td>{Category.slug}</td>
                        <td>{Category.description}</td>
                        <td>
                          {moment(Category.created_at).format("MMM Do, YY")}
                        </td>
                        <td>
                          {moment(Category.updated_at).format("MMM Do, YY")}
                        </td>
                        <td>
                          <FaPencilAlt
                            onClick={() => {
                              toggle();
                              setAction("edit");
                              dispatch(fetchSingleCategory(Category.id));
                            }}
                            className="icon"
                          />

                          <FaTrashAlt
                            onClick={() => removeHandle(Category.id)}
                            className="delete-icon "
                          />
                          {alert}
                        </td>
                      </tr>
                    ))}
              </>
            )}
          </tbody>
        </Table>
      </Row>
      {modal && (
        <Categoriesmodal
          modal={modal}
          action={action}
          setModal={setModal}
          toggle={toggle}
        />
      )}
    </div>
  );
};

export default CategoriesTable;
