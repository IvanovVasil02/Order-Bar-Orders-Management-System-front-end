import { Col, ToggleButtonGroup } from "react-bootstrap";
import { btnSpawner } from "../utilities";

const CategoryList = (props) => {
  return (
    <>
      {props.categoryList.map((item, index) => (
        <Col className='col-6 col-lg-auto' key={index}>
          <h5 className='text-center'>{item.title}</h5>

          <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
            {props.content &&
              btnSpawner(props.content, item.categoryKey, item.categoryValue, props.btnFunction, props.ingredientList)}
          </ToggleButtonGroup>
        </Col>
      ))}
    </>
  );
};

export default CategoryList;
