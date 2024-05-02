import { Button, Col } from "react-bootstrap";
import CreateOrderModal from "./modals/CreateOrderModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProductInfoBill from "./modals/ProductInfoBill";

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

  const currentSelectedProduct = useSelector((state) => state.products.currentSelectedProduct);

  return (
    <>
      <Col className='p-2'>
        <Button
          className={props.table.tableState === "FREE" ? "choise-btn" : "choise-btn-selected "}
          data-value={props.table.tableNumber}
          onClick={() => handleShowCreateOrderModal()}
        >
          Tavolo {props.table.tableNumber}
        </Button>
      </Col>
      <CreateOrderModal
        table={props.table}
        showCreateOrderModal={showCreateOrderModal}
        handleCloseCreateOrderModal={handleCloseCreateOrderModal}
        setHandleIsProductSelected={setHandleIsProductSelected}
        isProductSelected={isProductSelected}
      />

      {currentSelectedProduct && <ProductInfoBill />}
    </>
  );
};

export default Table;
