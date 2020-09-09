import React, { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "reactstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import Header from "./Header";
import SweetAlert from "react-bootstrap-sweetalert";
import { fetchAllTags, fetchSingleTag } from "../Redux/Actions/Tags/alltags";
import Tagmodal from "./Tagmodal";
import { deleteTag } from "../Redux/Actions/Tags/deletetag";

const Tags = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [action, setAction] = useState();

  const [alert, setAlert] = useState();

  const dispatch = useDispatch();

  const { loading, alltags } = useSelector((state) => ({
    loading: state.fetchAllTagsReducer.loading,
    alltags: state.fetchAllTagsReducer.alltags,
  }));

  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  const removehandle = (id) => {
    console.log("hii");
    // dispatch(deleteTag(id));

    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => {
          dispatch(deleteTag(id));
          getOkAlert();
        }}
        onCancel={() => hideAlert()}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>
    );

    setAlert(getAlert());
    const getOkAlert = () => (
      <SweetAlert success title="Woot!" onConfirm={hideAlert()}>
        I did it!
      </SweetAlert>
    );
  };

  const hideAlert = () => {
    console.log("Hiding alert...");

    setAlert();
  };

  return (
    <div>
      <Header></Header>
      <Container className="pt-5">
        <Row className="p-3 ">
          <Button
            color="primary"
            onClick={() => {
              toggle();
              setAction("create");
            }}
          >
            Create Tag
          </Button>
        </Row>
        <Table responsive>
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
                {alltags !== null &&
                  alltags
                    .sort(
                      (item, index) =>
                        new Date(index.created_at) - new Date(item.created_at)
                    )
                    .map((tags) => (
                      <tr key={tags.id}>
                        <td>{tags.id}</td>
                        <td>{tags.title}</td>
                        <td>{tags.slug}</td>
                        <td>{tags.description}</td>
                        <td>{moment(tags.created_at).format("MMM Do, YY")}</td>
                        <td>{moment(tags.updated_at).format("MMM Do, YY")}</td>
                        <td>
                          <FaPencilAlt
                            onClick={() => {
                              toggle();
                              setAction("edit");
                              dispatch(fetchSingleTag(tags.id));
                            }}
                            className="icon"
                          />

                          <FaTrashAlt onClick={() => removehandle(tags.id)} />
                          {alert}
                        </td>
                      </tr>
                    ))}
              </>
            )}
          </tbody>
        </Table>
        {modal && (
          <Tagmodal
            modal={modal}
            action={action}
            setModal={setModal}
            toggle={toggle}
          />
        )}
      </Container>
    </div>
  );
};

export default Tags;
