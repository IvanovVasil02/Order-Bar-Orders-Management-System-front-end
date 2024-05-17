import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { capitalizeFirstLetter, clearFields, handleBlur, handleInputFocus } from "../utilities";
import { useDispatch } from "react-redux";
import { deleteIngredient, editIngredient } from "../redux/actions/ingredientsActions";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const EditIngredientModal = (props) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [ingredientId, setIngredientId] = useState(props.data?.id || "");
  const [ingredientName, setIngredientName] = useState(props.data?.name || "");
  const [ingredientCategory, setIngredientCategory] = useState(props.data?.ingredientCategory || "");
  const [isTextVisible, setIsTextVisible] = useState({ ingredient: { value: false, name: "Nome ingrediente" } });

  useEffect(() => {
    setIngredientName(props.data?.name);
    setIngredientCategory(props.data?.ingredientCategory);
    setIngredientId(props.data?.id);
  }, [props.data]);

  const handleSubmitIngredient = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    dispatch(editIngredient(ingredientId, capitalizeFirstLetter(ingredientName), ingredientCategory, props.token));
    setValidated(true);
    setTimeout(() => {
      clearFields([setIngredientName, setIngredientCategory], setValidated);
    }, 3000);
  };

  const handleDelete = () => {
    dispatch(deleteIngredient(ingredientId, props.token));
  };

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter' className='align-self-center'>
          Modifica ingrediente
        </Modal.Title>
        <IoMdClose className='fs-3 ms-auto' onClick={props.handleClose} />
      </Modal.Header>
      <Modal.Body className='d-flex justify-content-center'>
        <Form
          noValidate
          validated={validated}
          className='d-flex flex-column justify-content-center align-items-center w-75'
        >
          <div className='input-container'>
            {(isTextVisible.ingredient.value || ingredientName) && <p className='text-center'>Nome ingrediente</p>}

            <Form.Group controlId='validationCustom0232w'>
              <Form.Control
                required
                type='text'
                value={ingredientName || ""}
                placeholder={ingredientName}
                onClick={(e) => handleInputFocus("ingredient", e, isTextVisible, setIsTextVisible)}
                onBlur={(e) => handleBlur("ingredient", e, isTextVisible, setIsTextVisible)}
                onChange={(e) => setIngredientName(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className='input-container'>
            {ingredientCategory && <p className='text-center'>Categoria ingrediente</p>}
            <Form.Select
              aria-label='Default select example'
              value={ingredientCategory || ""}
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
          </Button>{" "}
          <Button onClick={handleDelete} className='submit-btn'>
            Elimina <FaRegArrowAltCircleRight className='ms-auto' />
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default EditIngredientModal;
