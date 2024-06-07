import { useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import DinnerBill from "../modals/DinnerBill";
import { extractDate, extractTime } from "../utilities";

const OrderList = (props) => {
  const [selectedOrder, setSelectedOrder] = useState("");
  const [showBill, setShowbill] = useState(false);
  const handleShowBill = (order) => {
    setSelectedOrder(order);
    setShowbill(true);
  };
  const handleCloseBill = () => {
    setShowbill(false);
  };

  return (
    <>
      <div className='d-flex justify-content-center'>
        <ListGroup className='gap-3 d-flex w-100'>
          <ListGroup.Item className='list-item'>
            <span>Tavolo</span>
            <span>Ora</span>
            <span>Totale</span>
          </ListGroup.Item>
          {props.orders.map((order, index) => (
            <ListGroup.Item className='list-item' key={index} onClick={() => handleShowBill(order)}>
              <span>{order.tableNumber}</span>
              <span>{extractTime(order.dateTime)}</span>
              <span>{order.totalPrice}€</span>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {showBill && (
          <Modal show={showBill} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Header closeButton onHide={handleCloseBill}>
              <Modal.Title id='contained-modal-title-vcenter'>{`Comanda del ${extractDate(
                selectedOrder.dateTime
              )} alle ore ${extractTime(selectedOrder.dateTime)}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DinnerBill data={selectedOrder} handleCloseBill={handleCloseBill} editable={false} />
            </Modal.Body>
          </Modal>
        )}
      </div>
    </>
  );
};
export default OrderList;
