import { Col, Table } from "react-bootstrap";
import ProductBillRow from "../cards/ProductBillRow";

const DinnerBill = (props) => {
  console.log(props.data.productList);
  return (
    <>
      {props.data && props.data.productList && props.data.productList && (
        <Col>
          <Table className='text-center fs-4'>
            <thead>
              <tr>
                <th>Quantità</th>
                <th>Nome prodotto</th>
                <th>Prezzo</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.data.productList.map((product, index) => (
                <ProductBillRow
                  key={index}
                  product={product}
                  removeFunction={() => props.handleRemoveFromOrder(product.id)}
                  addFunction={() => props.handleAddToOrder(product)}
                />
              ))}
            </tbody>
          </Table>

          <div className='px-2'>
            <h5>Totale da pagare: {props.data.totalPrice}€</h5>
            <h5>Restante da pagare: {props.data.remainingToPay}€</h5>
          </div>
        </Col>
      )}
    </>
  );
};

export default DinnerBill;
