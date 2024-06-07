import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { saveIngredient } from "../redux/actions/ingredientsActions";
import { useDispatch, useSelector } from "react-redux";
import { handleInputFocus, handleBlur, clearFields, capitalizeFirstLetter } from "../utilities";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

function IngredientForm() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.savedToken);

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

  return (
    <Form noValidate validated={validated} className='d-flex flex-column py-5'>
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

      <Button onClick={handleSubmitIngredient} className='submit-btn '>
        Salva <FaRegArrowAltCircleRight className='ms-auto' />
      </Button>
    </Form>
  );
}

export default IngredientForm;
