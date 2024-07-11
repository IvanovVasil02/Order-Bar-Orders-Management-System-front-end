import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { handleBlur, handleInputFocus } from "../utilities";
import { useDispatch, useSelector } from "react-redux";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { fetchAllIngredients } from "../redux/actions/ingredientsActions";
import { editProduct } from "../redux/actions/productActions";
import IngredientList from "../itemList/IngredientList";

const EditProductModal = (props) => {
  const dispatch = useDispatch();
  const allIngredientList = useSelector((state) => state.ingredients.ingredientList);
  const [validated, setValidated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [productId, setProductId] = useState(props.data?.id || "");
  const [productName, setProductName] = useState(props.data?.name || "");
  const [productCategory, setProductCategory] = useState(props.data?.productCategory || "");
  const [productSubCategory, setProductSubCategory] = useState(props.data?.subCategory || "");
  const [quantity, setQuantity] = useState(props.data?.quantity || "");
  const [price, setPrice] = useState(props.data?.price || "");
  const [ingredientList, setIngredientList] = useState(props.data?.ingredients || []);

  const foodSubCategory = [
    { name: "Panini", value: "SANDWICH" },
    { name: "Hamburger", value: "HAMBURGER" },
    { name: "Piadine", value: "DONER" },
    { name: "Fritti", value: "FRIED" },
  ];

  const drinkSubCategory = [
    { name: "Succhi di frutta", value: "JUICES" },
    { name: "Bevande gassate", value: "SODAS" },
    { name: "TE", value: "TEA" },
    { name: "Birra", value: "BEER" },
    { name: "Coctails", value: "COCKTAILS" },
    { name: "Mocktails", value: "MOCKTAILS" },
    { name: "Acqua", value: "WATER" },
    { name: "Cofee", value: "COFEE" },
  ];

  const [isTextVisible, setIsTextVisible] = useState({
    product: { value: false, name: "Nome Prodotto" },
    price: { value: false, name: "Prezzo" },
  });

  useEffect(() => {
    dispatch(fetchAllIngredients(props.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.data) {
      setProductId(props.data.id || "");
      setProductName(props.data.name || "");
      setProductCategory(props.data.productCategory || "");
      setProductSubCategory(props.data.subCategory || "");
      setQuantity(props.data.quantity || "");
      setPrice(props.data.price || "");
      setIngredientList(props.data.ingredients || []);
    }
  }, [props.data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
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
      props.handleClose();
    }
  };

  const addIngredient = (value) => {
    ingredientList.includes(value)
      ? setIngredientList(ingredientList.filter((ingredient) => ingredient !== value))
      : setIngredientList([...ingredientList, value]);
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
          Modifica prodotto
        </Modal.Title>
        <IoMdClose className='fs-3 ms-auto' onClick={props.handleClose} />
      </Modal.Header>
      <Modal.Body className='d-flex justify-content-center'>
        <Form
          as={Col}
          noValidate
          validated={validated}
          className='d-flex flex-column align-items-center py-5'
          onSubmit={handleSubmit}
        >
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

          <Button className='submit-btn' onClick={(e) => handleSubmit(e)}>
            Salva
            <FaRegArrowAltCircleRight className='ms-auto' />
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
