import { Button, Col } from "react-bootstrap";
import CreateOrderModal from "./modals/CreateOrderModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProductInfoBill from "./modals/ProductInfoBill";
import EditTableModal from "./modals/EditTableModal";

const Table = (props) => {
  const [isProductSelected, setHandleIsProductSelected] = useState(false);

  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);

  const handleCloseCreateOrderModal = () => {
    setShowCreateOrderModal(false);
    setHandleIsProductSelected(false);
  };

  const handleShowCreateOrderModal = () => {
    setShowCreateOrderModal(true);
  };

  const [showEditModal, setShowEditMOdal] = useState(false);

  const handleCloseEditModal = () => {
    setShowEditMOdal(false);
  };

  const handleShowEditModal = () => {
    setShowEditMOdal(true);
  };

  const currentSelectedProduct = useSelector((state) => state.products.currentSelectedProduct);

  return (
    <>
      <Col className='p-md-3'>
        <Button
          className={props.table.tableState === "FREE" ? "choise-btn" : "choise-btn-selected "}
          data-value={props.table.tableNumber}
          onClick={() => (props.editable ? handleShowCreateOrderModal() : handleShowEditModal())}
        >
          {props.table.tableNumber}
        </Button>
      </Col>
      {props.editable && (
        <CreateOrderModal
          table={props.table}
          showCreateOrderModal={showCreateOrderModal}
          handleCloseCreateOrderModal={handleCloseCreateOrderModal}
          setHandleIsProductSelected={setHandleIsProductSelected}
          isProductSelected={isProductSelected}
        />
      )}

      <EditTableModal table={props.table} show={showEditModal} handleClose={handleCloseEditModal} />

      {currentSelectedProduct && <ProductInfoBill />}
    </>
  );
};

export default Table;
