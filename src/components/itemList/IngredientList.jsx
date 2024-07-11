import { Col, ListGroup } from "react-bootstrap";
import CategoryList from "./CategoryList";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";

const IngredientList = (props) => {
  const { ingredientCategories } = useContext(CategoriesContext);
  return (
    <>
      <CategoryList
        content={props.allIngredientList}
        categoryList={ingredientCategories}
        btnFunction={props.addIngredient}
        ingredientList={props.ingredientList}
      />

      <Col className='col-6 col-lg-auto'>
        {props.ingredientList && (
          <ListGroup>
            {props.ingredientList.map((element, index) => (
              <ListGroup.Item key={index} className='m-1 rounded-4 shadow-sm'>
                {element.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </>
  );
};

export default IngredientList;
