import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProductInfoModal from "./ProductInfoModal";
import { useState } from "react";

function TableInfoModal(props) {
  const [showProductInfo, setShowProductInfo] = useState(false);

  const handleCloseProductInfo = () => setShowProductInfo(false);
  const handleShowPrductInfo = () => setShowProductInfo(true);

  return (
    <>
      {props.data && (
        <Modal show={props.show} onHide={props.handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>{props.data}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table className='text-center fs-5'>
              <thead>
                <tr>
                  <th>Quantità</th>
                  <th>Nome prodotto</th>
                  <th>Prezzo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className='pointer td-bg' onClick={() => handleShowPrductInfo()}>
                  <td>3(2)</td>
                  <td>Birra</td>
                  <td>2.30$</td>
                </tr>
                <tr className='pointer td-bg' onClick={() => handleShowPrductInfo()}>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>5.00$</td>
                </tr>
                <tr className='pointer td-bg' onClick={() => handleShowPrductInfo()}>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>3.50$</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer className='justify-content-between'>
            <div>
              <h5>Totale: 10.80$</h5>
              <h5>Da pagare: 7.80$</h5>
            </div>
            <div className='d-flex gap-2'>
              <Button variant='secondary' onClick={props.handleClose}>
                Close
              </Button>
              <Button variant='primary' onClick={props.handleClose}>
                Save Changes
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      <ProductInfoModal showProductInfo={showProductInfo} handleCloseProductInfo={handleCloseProductInfo} />
    </>
  );
}

export default TableInfoModal;
