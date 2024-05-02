import { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import ProductBillRow from "../cards/ProductBillRow";

const ProductInfoBill = () => {
  const [productArray, setProductArray] = useState([]);

  const deframmentaPerQuantita = (data) => {
    const array = [];
    for (let i = 0; i < data.quantity; i++) {
      const productObject = { id: data.id, quantity: 1, name: data.name, price: data.price };

      array.push(productObject);
    }
    setProductArray(array);
  };

  return (
    <>
      {productArray && (
        <Modal className='product-info-modal'>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
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
                {productArray && productArray.map((product, index) => <ProductBillRow product={product} key={index} />)}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ProductInfoBill;
