import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { saveIngredient } from "../redux/actions/ingredientsActions";
import { useDispatch, useSelector } from "react-redux";
import { handleInputFocus, handleBlur, clearFields, btnSpawner, capitalizeFirstLetter } from "../utilities";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Col, Row, ToggleButtonGroup } from "react-bootstrap";
import EditIngredientModal from "../modals/EditIngredientModal";

function IngredientForm(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.savedToken);
  const allIngredientList = useSelector((state) => state.ingredients.ingredientList);

  const [validated, setValidated] = useState(false);

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientCategory, setIngredientCategory] = useState("");

  const [isTextVisible, setIsTextVisible] = useState({ ingredient: { value: false, name: "Nome ingrediente" } });

  const handleSubmitIngredient = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    dispatch(saveIngredient(capitalizeFirstLetter(ingredientName), ingredientCategory, token));
    setValidated(true);
    setTimeout(() => {
      clearFields([setIngredientName, setIngredientCategory], setValidated);
    }, 3000);
  };

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
      <Row className='justify-content-center'>
        <h2 className='my-5'>Creia nuovo ingrediente</h2>
        <Form
          noValidate
          validated={validated}
          className='d-flex flex-column justify-content-center align-items-center w-75'
        >
          <div className='input-container'>
            {(isTextVisible.ingredient.value || ingredientName) && <p>Nome ingrediente</p>}

            <Form.Group controlId='validationCustom023223'>
              <Form.Control
                required
                type='text'
                value={ingredientName}
                placeholder='Nome Ingrediente'
                onClick={(e) => handleInputFocus("ingredient", e, isTextVisible, setIsTextVisible)}
                onBlur={(e) => handleBlur("ingredient", e, isTextVisible, setIsTextVisible)}
                onChange={(e) => setIngredientName(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className='input-container'>
            {ingredientCategory && <p>Categoria ingrediente</p>}
            <Form.Select
              aria-label='Default select example'
              value={ingredientCategory}
              onChange={(e) => setIngredientCategory(e.target.value)}
              required
            >
              <option value=''>Categoria ingrediente</option>
              <option value='FLOURIES'>Farinosi</option>
              <option value='VEGETABLES'>Verdure</option>
              <option value='MEAT'>Carne</option>
              <option value='CHEESES'>Formaggi</option>
              <option value='SAUCES'>Salse</option>
            </Form.Select>
          </div>
          <Button onClick={handleSubmitIngredient} className='submit-btn'>
            Salva <FaRegArrowAltCircleRight className='ms-auto' />
          </Button>
        </Form>
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
}

export default IngredientForm;
