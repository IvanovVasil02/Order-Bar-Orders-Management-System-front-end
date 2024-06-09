import { useContext, useEffect, useState } from "react";
import { ButtonGroup, Row, ToggleButton } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import CategoryList from "../itemList/CategoryList";

import ProductForm from "../forms/ProductForm";
import { fetchAllProducts } from "../redux/actions/productActions";
import { CategoriesContext } from "../../contexts/CategoriesContext";

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.main.savedToken);
  const allProducts = useSelector((state) => state.products.productList);
  const [thereIsUpdate, setThereIsUpdate] = useState(false);

  useEffect(() => {
    !thereIsUpdate && dispatch(fetchAllProducts(token));
    setThereIsUpdate(false);
  }, [token, thereIsUpdate, dispatch]);

  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Piatti caldi", value: "1" },
    { name: "Da bere", value: "2" },
  ];

  const { hotDishesCategories } = useContext(CategoriesContext);

  const { drinkCategories } = useContext(CategoriesContext);

  return (
    <Row className={`text-center ${props.isVisible ? "d-block" : "d-none"}`}>
      <h2 className='pt-5'>Creia un nuovo Prodotto</h2>

      <div className='d-flex align-items-center'>
        <ProductForm token={token} setThereIsUpdate={setThereIsUpdate} />
      </div>

      <h2 className='pt-5'>Prodotti</h2>

      {allProducts && (
        <Row className='justify-content-evenly'>
          <Col sm={12} className='p-5'>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type='radio'
                  variant={idx % 2 ? "outline-secondary" : "outline-secondary"}
                  name='radio'
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                  className='border-0 shadow-lg px-5'
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>

          {radioValue == 1 && <CategoryList content={allProducts} categoryList={hotDishesCategories} />}
          {radioValue == 2 && <CategoryList content={allProducts} categoryList={drinkCategories} />}
        </Row>
      )}
    </Row>
  );
};

export default ProductsPage;
