import { Col, Row, ToggleButtonGroup } from "react-bootstrap";
import { btnSpawner } from "../utilities";
import EditIngredientModal from "../modals/EditIngredientModal";
import { useSelector } from "react-redux";
import { useState } from "react";
import IngredientForm from "../forms/IngredientForm";

const IngredientsPage = (props) => {
  const token = useSelector((state) => state.main.savedToken);
  const allIngredientList = useSelector((state) => state.ingredients.ingredientList);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState("");

  const handleClickIngredient = (ingredient) => {
    setSelectedIngredient(ingredient);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  return (
    <div className={`text-center ${props.isVisible ? "d-block" : "d-none"}`}>
      <Row>
        <h2>Creia nuovo ingrediente</h2>
        <div className='d-flex justify-content-center'>
          {" "}
          <IngredientForm />
        </div>
      </Row>

      <Row className='pt-5'>
        <h2 className='my-5'>Ingredienti</h2>

        <Col>
          <h5 className='text-center'>Panini</h5>

          <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
            {allIngredientList &&
              btnSpawner(allIngredientList, "ingredientCategory", "FLOURIES", handleClickIngredient)}
          </ToggleButtonGroup>
        </Col>
        <Col>
          <h5 className='text-center'>Verdure</h5>

          <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
            {allIngredientList &&
              btnSpawner(allIngredientList, "ingredientCategory", "VEGETABLES", handleClickIngredient)}
          </ToggleButtonGroup>
        </Col>
        <Col>
          <h5 className='text-center'>Carne</h5>
          <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
            {allIngredientList && btnSpawner(allIngredientList, "ingredientCategory", "MEAT", handleClickIngredient)}
          </ToggleButtonGroup>
        </Col>
        <Col>
          <h5 className='text-center'>Formaggi</h5>
          <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
            {allIngredientList && btnSpawner(allIngredientList, "ingredientCategory", "CHEESES", handleClickIngredient)}
          </ToggleButtonGroup>
        </Col>
        <Col>
          <h5 className='text-center'>Salse</h5>
          <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
            {allIngredientList && btnSpawner(allIngredientList, "ingredientCategory", "SAUCES", handleClickIngredient)}
          </ToggleButtonGroup>
        </Col>
      </Row>

      <EditIngredientModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        data={selectedIngredient}
        token={token}
      />
    </div>
  );
};
export default IngredientsPage;
