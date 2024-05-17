import { Col, ToggleButtonGroup } from "react-bootstrap";
import { btnSpawner } from "../utilities";

const HotdishesList = (props) => {
  return (
    <>
      <Col>
        <h5 className='text-center'>Panini</h5>
        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "BEER")}
        </ToggleButtonGroup>
      </Col>

      <Col>
        <h5 className='text-center'>Hamburger</h5>

        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "HAMBURGER")}
        </ToggleButtonGroup>
      </Col>

      <Col>
        <h5 className='text-center'>Piadine</h5>
        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "DONER")}
        </ToggleButtonGroup>
      </Col>

      <Col>
        <h5 className='text-center'>Fritti</h5>
        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "FRIED")}
        </ToggleButtonGroup>
      </Col>
    </>
  );
};

export default HotdishesList;
