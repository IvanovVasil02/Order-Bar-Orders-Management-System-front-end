import { Button, Col, Form, Row } from "react-bootstrap";
import { handleBlur, handleInputFocus } from "../utilities";
import IngredientList from "../itemList/IngredientList";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllIngredients } from "../redux/actions/ingredientsActions";
import { saveProduct } from "../redux/actions/productActions";

const ProductForm = (props) => {
  const dispatch = useDispatch();
  const allIngredientList = useSelector((state) => state.ingredients.ingredientList);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

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
  }, [props.token, dispatch]);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    dispatch(
      saveProduct(productCategory, productSubCategory, productName, price, quantity, ingredientList, props.token)
    );
    setValidated(true);
  };

  const addIngredient = (value) => {
    ingredientList.includes(value)
      ? setIngredientList(ingredientList.filter((ingredient) => ingredient !== value))
      : setIngredientList([...ingredientList, value]);
  };

  return (
    <>
      <Form as={Col} noValidate validated={validated} className='d-flex flex-column py-5'>
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

        <Row className='pt-5 justify-content-center'>
          <IngredientList
            allIngredientList={allIngredientList}
            addIngredient={addIngredient}
            ingredientList={ingredientList}
          />
        </Row>

        <Row className='justify-content-center'>
          <Col sm={2}>
            <Button className='submit-btn w-100' onClick={handleSubmit}>
              Salva
              <FaRegArrowAltCircleRight className='ms-auto' />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default ProductForm;
