import { Col, ToggleButtonGroup } from "react-bootstrap";
import { btnSpawner } from "../utilities";

const DrinkList = (props) => {
  return (
    <>
      <Col>
        <h5 className='text-center'>Succhi</h5>
        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "JUICES")}
        </ToggleButtonGroup>
      </Col>
      <Col>
        <h5 className='text-center'>Gassose</h5>

        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "SODAS")}
        </ToggleButtonGroup>
      </Col>
      <Col>
        <h5 className='text-center'>Té</h5>
        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "TEA")}
        </ToggleButtonGroup>
      </Col>
      <Col>
        <h5 className='text-center'>Birra</h5>
        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "BEER")}
        </ToggleButtonGroup>
      </Col>{" "}
      <Col>
        <h5 className='text-center'>Cocktails</h5>
        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "COCKTAILS")}
        </ToggleButtonGroup>
      </Col>
      <Col>
        <h5 className='text-center'>Mocktails</h5>

        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "MOCKTAILS")}
        </ToggleButtonGroup>
      </Col>
      <Col>
        <h5 className='text-center'>Water</h5>
        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "WATER")}
        </ToggleButtonGroup>
      </Col>
      <Col>
        <h5 className='text-center'>Caffé</h5>
        <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
          {props.productList && btnSpawner(props.productList, "subCategory", "COFEE")}
        </ToggleButtonGroup>
      </Col>
    </>
  );
};

export default DrinkList;
