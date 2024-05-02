import { useEffect, useState } from "react";
import { ListGroup, Row, ToggleButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllIngredients } from "../redux/actions/ingredientsActions";
import { handleBlur, handleInputFocus, ingredientBtnSpawner } from "../utilities";
import { saveProduct } from "../redux/actions/productActions";

function ProductForm() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.savedToken);
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
    dispatch(fetchAllIngredients(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    dispatch(saveProduct(productCategory, productSubCategory, productName, price, quantity, ingredientList, token));
    setValidated(true);
  };

  const addIngredient = (value) => {
    ingredientList.includes(value)
      ? setIngredientList(ingredientList.filter((ingredient) => ingredient !== value))
      : setIngredientList([...ingredientList, value]);
  };

  return (
    <>
      <h2 className='mt-5'>Creia nuovo Prodotto</h2>
      <Form as={Col} noValidate validated={validated} className='m-5 w-lg-50 d-flex flex-column gap-4'>
        <Row>
          <Col lg={12} className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4'>
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

            <div className='input-container d-flex'>
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
          <Col>
            <h5 className='text-center'>Panini</h5>

            <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
              {allIngredientList && ingredientBtnSpawner(allIngredientList, "FLOURIES", addIngredient, ingredientList)}
            </ToggleButtonGroup>
          </Col>
          <Col>
            <h5 className='text-center'>Verdure</h5>

            <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
              {allIngredientList &&
                ingredientBtnSpawner(allIngredientList, "VEGETABLES", addIngredient, ingredientList)}
            </ToggleButtonGroup>
          </Col>
          <Col>
            <h5 className='text-center'>Carne</h5>
            <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
              {allIngredientList && ingredientBtnSpawner(allIngredientList, "MEAT", addIngredient, ingredientList)}
            </ToggleButtonGroup>
          </Col>
          <Col>
            <h5 className='text-center'>Formaggi</h5>
            <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
              {allIngredientList && ingredientBtnSpawner(allIngredientList, "CHEESES", addIngredient, ingredientList)}
            </ToggleButtonGroup>
          </Col>
          <Col>
            <h5 className='text-center'>Salse</h5>
            <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
              {allIngredientList && ingredientBtnSpawner(allIngredientList, "SAUCES", addIngredient, ingredientList)}
            </ToggleButtonGroup>
          </Col>
          <Col>
            <h5>Ingredienti</h5>
            {ingredientList && (
              <ListGroup>
                {ingredientList.map((element, index) => (
                  <ListGroup.Item key={index}>{element.name}</ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>

        <Button className='submit-btn' onClick={handleSubmit}>
          Salva Prodotto
        </Button>
      </Form>
    </>
  );
}

export default ProductForm;
