import { Card, Col } from "react-bootstrap";

//
const ProductsCategorycard = (props) => {
  return (
    <Col>
      <Card className='border-0 pointer' onClick={props.selectProductFunction}>
        <Card.Img variant='top' src={props.ctgImg} />
        <Card.Body>
          <Card.Title className='text-center'>{props.titleCategory}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default ProductsCategorycard;
