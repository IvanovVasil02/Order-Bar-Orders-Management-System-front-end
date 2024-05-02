import { Col, Container, Row } from "react-bootstrap";
import ChoiceCard from "./cards/ChoiceCard";
import IngedientForm from "./forms/IngredientForm";
import ProductForm from "./forms/ProductForm";
import TableForm from "./forms/TableForm";
import OrderForm from "./forms/OrderForm";
import Login from "./login/Login";

const Header = () => {
  return (
    <>
      <section>
        <Container fluid>
          <Row>
            <Col sm='3'>
              <h1 className='text-center'> Scegli cosa fare</h1>
              <ChoiceCard name='Creia Ingrediente' />
              <ChoiceCard name='Creia Prodotto' />
              <ChoiceCard name='Creia Tavolo' />
              <ChoiceCard name='Creia ordine' />
              <ChoiceCard name='Paga ordine' />
            </Col>
            <Col className='d-flex flex-column justify-content-center align-items-center'>
              <Login />
              <IngedientForm />
              <ProductForm />
              <TableForm />
              <OrderForm />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Header;
