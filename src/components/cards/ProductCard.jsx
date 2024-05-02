import { Card, Col } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const ProductCard = (props) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text className='d-flex gap-2'>
            {props.ingredients && props.ingredients.map((element, index) => <span key={index}>{element.name}</span>)}
          </Card.Text>
          <div className='d-flex  justify-content-between pointer'>
            <p>Aggiunti: {props.quantity}</p>
            <div className='d-flex gap-3 fs-1 fw-light pointer'>
              <CiCirclePlus onClick={props.addFunction} />
              <CiCircleMinus onClick={props.removeFunction} />
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default ProductCard;
