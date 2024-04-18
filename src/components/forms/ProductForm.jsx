import { useState } from "react";
import { ListGroup, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function ProductForm() {
  const [validated, setValidated] = useState(false);
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
  const [category, setCategory] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [subCategory, setSubCategory] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [ingredientList, setIngredientList] = useState([]);

  const addIngredient = (value) => {
    ingredientList.includes(value)
      ? setIngredientList(ingredientList.filter((ingredient) => ingredient !== value))
      : setIngredientList([...ingredientList, value]);
  };

  return (
    <>
      <h2 className='mt-5'>Creia nuovo Prodotto</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className='d-flex flex-column justify-content-center align-items-center mb-5'
      >
        <div className='d-flex justify-content-between gap-2'>
          <Form.Select aria-label='Default select example' onChange={(e) => setCategory(e.target.value)}>
            <option>Seleziona Categoria prodotto</option>
            <option value='DRINK'>Bevanda</option>
            <option value='HOT_DISHES'>Cibo Caldo</option>
          </Form.Select>{" "}
          <Form.Select aria-label='Default select example' onChange={(e) => setSubCategory(e.target.value)}>
            <option>Seleziona Sottocategoria prodotto</option>
            {category &&
              category === "DRINK" &&
              drinkSubCategory.map((subcategory, index) => (
                <option value={subcategory.value} key={index}>
                  {subcategory.name}
                </option>
              ))}
            {category &&
              category === "HOT_DISHES" &&
              foodSubCategory.map((subcategory, index) => (
                <option value={subcategory.value} key={index}>
                  {subcategory.name}
                </option>
              ))}
          </Form.Select>
        </div>
        <Form.Group as={Col} md='8' controlId='validationCustom01' className='pt-5'>
          <Form.Label>Nome Prodotto</Form.Label>
          <Form.Control required type='text' />
        </Form.Group>
        {category && category === "DRINK" && (
          <Form.Group as={Col} controlId='validationCustom01' className='pt-5'>
            <Form.Label>Quantità</Form.Label>
            <Form.Control required type='text' />
          </Form.Group>
        )}

        <Row className='pt-5'>
          <Col>
            <h5 className='text-center'>Panini</h5>

            <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
              <ToggleButton id='1' value={8} className='rounded-2' onClick={() => addIngredient("Panino bianco")}>
                Panino bianco
              </ToggleButton>
              <ToggleButton id='2' value={9} className='rounded-2' onClick={() => addIngredient("Piadina")}>
                Piadina
              </ToggleButton>
              <ToggleButton id='3' value={10} className='rounded-2' onClick={() => addIngredient("Panino da HotDog")}>
                Panino da Hotdog
              </ToggleButton>{" "}
              <ToggleButton id='4' value={11} className='rounded-2' onClick={() => addIngredient("Panino Hamburger")}>
                Panino Hamburger
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col>
            <h5 className='text-center'>Verdure</h5>

            <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
              <ToggleButton id='5' value={1} className='rounded-2' onClick={() => addIngredient("Lattuga")}>
                Lattuga
              </ToggleButton>
              <ToggleButton id='6' value={2} className='rounded-2' onClick={() => addIngredient("Pomodori")}>
                Pomodori
              </ToggleButton>
              <ToggleButton id='7' value={3} className='rounded-2' onClick={() => addIngredient("Cipolle")}>
                Cipolle
              </ToggleButton>{" "}
              <ToggleButton id='8' value={4} className='rounded-2' onClick={() => addIngredient("Cetrioli")}>
                Cetrioli
              </ToggleButton>
              <ToggleButton id='9' value={5} className='rounded-2' onClick={() => addIngredient("Peperoni")}>
                Peperoni
              </ToggleButton>
              <ToggleButton id='10' value={6} className='rounded-2' onClick={() => addIngredient("avocado")}>
                avocado
              </ToggleButton>
              <ToggleButton id='11' value={7} className='rounded-2' onClick={() => addIngredient("olive")}>
                olive
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col>
            <h5 className='text-center'>Carne</h5>
            <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
              <ToggleButton id='12' value={16} className='rounded-2' onClick={() => addIngredient("Pollo")}>
                Pollo
              </ToggleButton>
              <ToggleButton id='13' value={18} className='rounded-2' onClick={() => addIngredient("Kebab")}>
                Kebab
              </ToggleButton>
              <ToggleButton id='14' value={19} className='rounded-2' onClick={() => addIngredient("Wurstel")}>
                Wurstel
              </ToggleButton>
              <ToggleButton id='15' value={19} className='rounded-2' onClick={() => addIngredient("Prosciutto cotto")}>
                Prosciutto cotto
              </ToggleButton>{" "}
              <ToggleButton id='16' value={19} className='rounded-2' onClick={() => addIngredient("Salame")}>
                Salame
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col>
            <h5 className='text-center'>Formaggi</h5>
            <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
              <ToggleButton id='17' value={22} className='rounded-2' onClick={() => addIngredient("Cheddar")}>
                Cheddar
              </ToggleButton>
              <ToggleButton id='18' value={23} className='rounded-2' onClick={() => addIngredient("Mozzarella")}>
                Mozzarella
              </ToggleButton>
              <ToggleButton id='19' value={24} className='rounded-2' onClick={() => addIngredient("Provola")}>
                Provola
              </ToggleButton>{" "}
              <ToggleButton id='20' value={25} className='rounded-2' onClick={() => addIngredient("Formaggio a fette")}>
                Formaggio a fette
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col>
            <h5 className='text-center'>Salse</h5>
            <ToggleButtonGroup type='checkbox' className='my-2 gap-1 d-flex flex-column'>
              <ToggleButton id='21' value={29} className='rounded-2' onClick={() => addIngredient("Maionese")}>
                Maionese
              </ToggleButton>
              <ToggleButton id='22' value={30} className='rounded-2' onClick={() => addIngredient("Senape")}>
                Senape
              </ToggleButton>
              <ToggleButton id='23' value={31} className='rounded-2' onClick={() => addIngredient("Ketchup")}>
                Ketchup
              </ToggleButton>{" "}
              <ToggleButton id='24' value={32} className='rounded-2' onClick={() => addIngredient("Salsa BBQ")}>
                Salsa BBQ
              </ToggleButton>
              <ToggleButton id='25' value={33} className='rounded-2' onClick={() => addIngredient("Salsa Piccante")}>
                Salsa Piccante
              </ToggleButton>
              <ToggleButton id='26' value={34} className='rounded-2' onClick={() => addIngredient("Salsa Yogurt")}>
                Salsa Yogurt
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col>
            <h5>Ingredienti</h5>
            {ingredientList && (
              <ListGroup>
                {ingredientList.map((element, index) => (
                  <ListGroup.Item key={index}>{element}</ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>

        <Button type='submit' className='mt-5'>
          Salva Prodotto
        </Button>
      </Form>
    </>
  );
}

export default ProductForm;
