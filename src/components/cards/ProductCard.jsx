import { Card, Col } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const ProductCard = (props) => {
  return (
    <Col>
      <Card className='product-card'>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <p className='fw-medium d-block'>Ingredienti:</p>
          <div className='ingredients-container'>
            {" "}
            {props.ingredients && props.ingredients.map((element, index) => <p key={index}>{element.name}</p>)}
          </div>

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
