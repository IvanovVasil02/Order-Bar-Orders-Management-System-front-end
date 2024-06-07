import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { capitalizeFirstLetter, clearFields, handleBlur, handleInputFocus } from "../utilities";
import { useDispatch } from "react-redux";
import { deleteIngredient, editIngredient, fetchAllIngredients } from "../redux/actions/ingredientsActions";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { editProduct } from "../redux/actions/productActions";

const EditIngredientModal = (props) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [productId, setProductId] = useState(props.data?.id || "");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    dispatch(fetchAllIngredients(props.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    dispatch(
      editProduct(
        productId,
        productCategory,
        productSubCategory,
        productName,
        price,
        quantity,
        ingredientList,
        props.token
      )
    );
    setValidated(true);
  };

  const handleDelete = () => {
    dispatch(deleteIngredient(productId, props.token));
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
        <Form as={Col} noValidate validated={validated} className='d-flex flex-column align-items-center py-5'>
          <Row className='row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-5 g-3 justify-content-center px-2 p-md-0'>
            <Col>
              <div className='input-container'>
                {(isTextVisible.product.value || productName) && <p>Nome prodotto</p>}

                <Form.Group controlId='validationCustom023'>
                  <Form.Control
                    required
                    type='text'
                    value={productName}
                    placeholder='Nome prodotto'
                    onClick={(e) => handleInputFocus("product", e, isTextVisible, setIsTextVisible)}
                    onBlur={(e) => handleBlur("product", e, isTextVisible, setIsTextVisible)}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>
              </div>
            </Col>

            <Col>
              <div className='input-container'>
                {productCategory && <p>Categoria prodotto</p>}
                <Form.Select
                  aria-label='Default select example'
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  required
                >
                  <option value=''>Categoria prodotto</option>
                  <option value='DRINK'>Bevanda</option>
                  <option value='HOT_DISHES'>Cibo Caldo</option>
                </Form.Select>
              </div>
            </Col>

            <Col>
              <div className='input-container'>
                {productSubCategory && <p>Sottocategoria Prodotto</p>}
                <Form.Select
                  aria-label='Default select example'
                  value={productSubCategory}
                  onChange={(e) => setProductSubCategory(e.target.value)}
                  required
                >
                  <option value=''>Sottocategoria prodotto</option>
                  {productCategory &&
                    productCategory === "DRINK" &&
                    drinkSubCategory.map((productSubCategory, index) => (
                      <option value={productSubCategory.value} key={index}>
                        {productSubCategory.name}
                      </option>
                    ))}
                  {productCategory &&
                    productCategory === "HOT_DISHES" &&
                    foodSubCategory.map((productSubCategory, index) => (
                      <option value={productSubCategory.value} key={index}>
                        {productSubCategory.name}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </Col>

            <Col>
              <div className='input-container'>
                <Form.Group as={Col} controlId='validationCustom01' className='d-flex align-items-center'>
                  <Form.Label className='w-100 m-0'>Quantità</Form.Label>
                  <Form.Control
                    required
                    type='number'
                    value={quantity}
                    disabled={productCategory === "DRINK" ? false : true}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>
              </div>
            </Col>

            <Col>
              <div className='input-container'>
                {(isTextVisible.price.value || price) && <p>Prezzo</p>}

                <Form.Group controlId='validationCustom0243'>
                  <Form.Control
                    required
                    type='text'
                    value={price}
                    placeholder='Prezzo'
                    onClick={(e) => handleInputFocus("price", e, isTextVisible, setIsTextVisible)}
                    onBlur={(e) => handleBlur("price", e, isTextVisible, setIsTextVisible)}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>

          <Row className='pt-5'>
            <IngredientList
              allIngredientList={allIngredientList}
              addIngredient={addIngredient}
              ingredientList={ingredientList}
            />
          </Row>

          <Button className='submit-btn' onClick={handleSubmit}>
            Salva
            <FaRegArrowAltCircleRight className='ms-auto' />
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default EditIngredientModal;
