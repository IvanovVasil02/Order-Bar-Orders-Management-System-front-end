import { Button, CloseButton, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { HiOutlineBars3 } from "react-icons/hi2";
import Sidebar from "../Sidebar";
import OrderForm from "./forms/OrderForm";
import { useState } from "react";
import IngredientForm from "./forms/IngredientForm";
import ProductForm from "./forms/ProductForm";
import TableForm from "./forms/TableForm";
// import Login from "./login/Login";

const Main = () => {
  const [show, setShow] = useState(false);
  const [activeForm, setActiveForm] = useState("orderForm");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectForm = (form) => {
    setActiveForm(form);
  };

  return (
    <>
      <Container fluid>
        <Row className='flex-row'>
          <Sidebar activeForm={activeForm} handleSelectForm={handleSelectForm} />
          <Col className='d-flex flex-column justify-content-center align-items-center p-md-5'>
            {/* <Login /> */}
            <IngredientForm isVisible={activeForm === "ingredientForm"} />
            <ProductForm isVisible={activeForm === "productForm"} />
            <TableForm isVisible={activeForm === "tableForm"} />
            <OrderForm isVisible={activeForm === "orderForm"} />
          </Col>
          <HiOutlineBars3 className='toggle-btn shadow-lg d-lg-none' onClick={handleShow} />
          <Offcanvas show={show} onHide={handleClose} className='min-vh-100'>
            <Offcanvas.Body className='p-0'>
              <div className='sticky-top d-flex flex-column align-items-center min-vh-100' id='nav-btn-cont'>
                <h2>OrderEase</h2>
                <div className='d-flex flex-column mt-4'>
                  <Button className='pointer' onClick={() => handleSelectForm("ingredientForm")}>
                    Ingredienti
                  </Button>
                  <Button className='pointer' onClick={() => handleSelectForm("productForm")}>
                    Prodotti
                  </Button>
                  <Button className='pointer' onClick={() => handleSelectForm("tableForm")}>
                    Tavoli
                  </Button>
                  <Button className='pointer' onClick={() => handleSelectForm("orderForm")}>
                    Ordini
                  </Button>
                  <Button className='pointer'>Lougout</Button>
                </div>
                <div className='d-flex align-items-center position-absolute bottom-0'>
                  <CloseButton onClick={handleClose} />
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Row>
      </Container>
    </>
  );
};
export default Main;
