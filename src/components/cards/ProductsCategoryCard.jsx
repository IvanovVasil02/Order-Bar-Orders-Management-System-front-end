import { Card, Col } from "react-bootstrap";

//
const ProductsCategorycard = (props) => {
  return (
    <Col>
      <Card className='products-category-card pointer' onClick={() => props.selectProductFunction(props.category)}>
        <Card.Img
          variant='top'
          src={props.ctgImg}
          className={`${props.selectedSubCategory == props.category && "selected-category"}`}
        />
        <Card.Body>
          <Card.Title className='text-center'>{props.titleCategory}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};
export default ProductsCategorycard;
