import { Button, Card, Col } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const ProductCard = (props) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
          <div className='d-flex  justify-content-between pointer'>
            <p>Aggiunti: 4</p>
            <div className='d-flex gap-3 fs-1 fw-light pointer'>
              <CiCirclePlus />
              <CiCircleMinus />
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default ProductCard;
