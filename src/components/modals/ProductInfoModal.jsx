import { Button, Modal } from "react-bootstrap";

const ProductInfoModal = (props) => {
  return (
    <>
      <Modal show={props.showProductInfo} onHide={props.handleCloseProductInfo}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.handleCloseProductInfo}>
            Close
          </Button>
          <Button variant='primary' onClick={props.handleCloseProductInfo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductInfoModal;
